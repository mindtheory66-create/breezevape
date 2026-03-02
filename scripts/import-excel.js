/**
 * import-excel.js  — Run with: node scripts/import-excel.js
 * Reads data_store.xlsx and seeds the Prisma SQLite database.
 * Generates rich, SEO-optimized descriptions if the raw description is thin.
 */

const XLSX = require('xlsx');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// ─── Helpers ────────────────────────────────────────────────────────────────

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 90);
}

function safeJSON(str, fallback = null) {
    try { return JSON.parse(str); }
    catch { return fallback; }
}

/** Map English region → Indonesian province name */
const REGION_MAP = {
    'West Java': 'Jawa Barat',
    'Central Java': 'Jawa Tengah',
    'East Java': 'Jawa Timur',
    'Banten': 'Banten',
    'DKI Jakarta': 'DKI Jakarta',
    'Special Capital Region of Jakarta': 'DKI Jakarta',
    'Bali': 'Bali',
    'West Nusa Tenggara': 'Nusa Tenggara Barat',
    'East Nusa Tenggara': 'Nusa Tenggara Timur',
    'North Sumatra': 'Sumatera Utara',
    'South Sumatra': 'Sumatera Selatan',
    'Lampung': 'Lampung',
    'Riau': 'Riau',
    'Riau Islands': 'Kepulauan Riau',
    'West Kalimantan': 'Kalimantan Barat',
    'East Kalimantan': 'Kalimantan Timur',
    'South Kalimantan': 'Kalimantan Selatan',
    'Central Kalimantan': 'Kalimantan Tengah',
    'South Sulawesi': 'Sulawesi Selatan',
    'North Sulawesi': 'Sulawesi Utara',
    'Yogyakarta': 'DI Yogyakarta',
    'Special Region of Yogyakarta': 'DI Yogyakarta',
    'Aceh': 'Aceh',
    'West Sumatra': 'Sumatera Barat',
    'Papua': 'Papua',
};

function normalizeProvince(region) {
    if (!region) return 'Indonesia';
    return REGION_MAP[region] || region;
}

/** Clean & normalise city name */
function normalizeCity(city) {
    if (!city) return '';
    return city
        .replace(/ City$/i, '')
        .replace(/^Kota /i, '')
        .replace(/^Kabupaten /i, 'Kab. ')
        .trim();
}

/** Convert work_hours JSON to a simple human-readable Indonesian string */
function parseOpeningHours(workTimeStr) {
    const wt = safeJSON(workTimeStr);
    if (!wt?.work_hours?.timetable) return null;
    const tt = wt.work_hours.timetable;
    const dayLabel = { sunday: 'Min', monday: 'Sen', tuesday: 'Sel', wednesday: 'Rab', thursday: 'Kam', friday: 'Jum', saturday: 'Sab' };
    const formatted = Object.entries(tt).map(([day, slots]) => {
        if (!slots || slots.length === 0) return `${dayLabel[day]}: Tutup`;
        const s = slots[0];
        const open = `${String(s.open.hour).padStart(2, '0')}.${String(s.open.minute).padStart(2, '0')}`;
        const close = `${String(s.close.hour).padStart(2, '0')}.${String(s.close.minute).padStart(2, '0')}`;
        return `${dayLabel[day]}: ${open}–${close}`;
    });
    return formatted.join(', ');
}

/** Convert service attributes JSON to a clean array of feature labels */
function parseServices(attributesStr) {
    const attrs = safeJSON(attributesStr);
    const avail = attrs?.available_attributes || {};
    const serviceMap = {
        has_delivery: 'Layanan Antar',
        has_in_store_pickup: 'Ambil di Toko',
        quick_visit: 'Kunjungan Cepat',
        pay_credit_card: 'Kartu Kredit',
        pay_debit_card: 'Kartu Debit',
        pay_mobile_nfc: 'Pembayaran Digital',
        has_dine_in: 'Dine-In',
        has_takeout: 'Takeout',
    };
    const result = [];
    for (const values of Object.values(avail)) {
        for (const v of values) {
            if (serviceMap[v]) result.push(serviceMap[v]);
        }
    }
    return result;
}

/** Build a rich, SEO-friendly Indonesian description from all available data */
function buildDescription(row) {
    const rawDesc = (row.description || '').trim();
    const topics = safeJSON(row.place_topics, {});
    const topicKeys = Object.keys(topics).slice(0, 10).join(', ');
    let desc = rawDesc;
    if (topicKeys) {
        desc += (desc ? '\n\n' : '') + `Topik populer pelanggan: ${topicKeys}.`;
    }
    return desc || null;
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
    const filePath = path.join(__dirname, '..', 'data_store.xlsx');
    const wb = XLSX.readFile(filePath);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(ws);

    console.log(`📦  Loaded ${rows.length} rows from Excel.`);

    // Clear DB
    await prisma.store.deleteMany();
    await prisma.city.deleteMany();
    await prisma.province.deleteMany();
    console.log('🗑   Database cleared.');

    const cityMap = new Map(); // city name → province
    const slugCounts = new Map(); // track slug uniqueness

    const storeData = [];

    for (const row of rows) {
        const name = (row.title || '').trim();
        if (!name) continue;

        const rawCity = normalizeCity(row.address_info_city || '');
        const province = normalizeProvince(row.address_info_region || '');
        const city = rawCity || province;

        if (city && province) cityMap.set(city, province);

        // Build unique slug
        let baseSlug = slugify(`${name}-${city}`);
        const count = (slugCounts.get(baseSlug) || 0) + 1;
        slugCounts.set(baseSlug, count);
        const slug = count > 1 ? `${baseSlug}-${count}` : baseSlug;

        // Parse sub-fields
        const ratingData = safeJSON(row.rating);
        const rating = ratingData?.value ?? 0;
        const reviewCount = ratingData?.votes_count ?? 0;

        const services = parseServices(row.attributes);
        const openHours = parseOpeningHours(row.work_time);
        const description = buildDescription(row);

        // Phone
        const contactArr = safeJSON(row.contact_info, []);
        const phoneRaw = contactArr[0]?.value || row.phone || '';
        const phone = phoneRaw.replace(/\D/g, '').replace(/^620?/, '62') || null;
        const whatsapp = phone || null;

        storeData.push({
            name,
            slug,
            address: row.address || '',
            city,
            province,
            phone: row.phone || phone || null,
            whatsapp: whatsapp ? `https://wa.me/${whatsapp}` : null,
            latitude: row.latitude ? parseFloat(row.latitude) : null,
            longitude: row.longitude ? parseFloat(row.longitude) : null,
            rating: parseFloat(rating) || 0,
            reviewCount: parseInt(reviewCount) || 0,
            description,
            openingHours: openHours || null,
            services: services.length > 0 ? JSON.stringify(services) : null,
            googleMapsUrl: row.check_url || null,
            placeId: row.place_id || null,
            logoUrl: row.logo || null,
            imageUrl: row.main_image || null,
            isVerified: true,
        });
    }

    // Batch-insert stores
    console.log(`🏪  Inserting ${storeData.length} stores...`);
    for (const s of storeData) {
        try {
            await prisma.store.create({ data: s });
        } catch (e) {
            console.warn(`⚠️  Skipped "${s.name}" (${s.slug}): ${e.message}`);
        }
    }

    // Build Cities
    console.log('🏙   Building cities...');
    for (const [cityName, prov] of cityMap.entries()) {
        const citySlug = slugify(cityName);
        const count = await prisma.store.count({ where: { city: cityName } });
        try {
            await prisma.city.upsert({
                where: { slug: citySlug },
                create: { name: cityName, slug: citySlug, province: prov, storeCount: count },
                update: { storeCount: count },
            });
        } catch { }
    }

    // Build Provinces
    console.log('📍  Building provinces...');
    const provinces = [...new Set([...cityMap.values()])];
    for (const provName of provinces) {
        const provSlug = slugify(provName);
        const count = await prisma.store.count({ where: { province: provName } });
        try {
            await prisma.province.upsert({
                where: { slug: provSlug },
                create: { name: provName, slug: provSlug, storeCount: count },
                update: { storeCount: count },
            });
        } catch { }
    }

    // Summary
    const total = await prisma.store.count();
    const totalCities = await prisma.city.count();
    const totalProvinces = await prisma.province.count();
    console.log(`\n✅  Done!`);
    console.log(`   Stores  : ${total}`);
    console.log(`   Cities  : ${totalCities}`);
    console.log(`   Provinces: ${totalProvinces}`);
}

main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
