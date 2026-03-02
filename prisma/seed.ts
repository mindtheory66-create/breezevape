import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const STORES = [
    {
        name: "Alpha Vape Jakarta",
        slug: "alpha-vape-jakarta",
        address: "Jl. Sudirman No. 1, Jakarta Pusat",
        city: "Jakarta",
        province: "DKI Jakarta",
        phone: "081234567890",
        whatsapp: "6281234567890",
        rating: 4.8,
        reviewCount: 120,
        instagram: "@alphavape.jkt",
        description: "Best and most modern vape house in Jakarta. We provide premium mods, juices, and coil building service.",
        latitude: -6.2,
        longitude: 106.81,
    },
    {
        name: "Cloud Nine Surabaya",
        slug: "cloud-nine-surabaya",
        address: "Jl. Tunjungan No. 5, Surabaya",
        city: "Surabaya",
        province: "Jawa Timur",
        phone: "081234567891",
        whatsapp: "6281234567891",
        rating: 4.7,
        reviewCount: 85,
        instagram: "@cloudnine.sby",
        description: "Cloud Nine is your home for all things vapor. Located in the heart of Surabaya.",
        latitude: -7.25,
        longitude: 112.74,
    },
    {
        name: "Neon Mist Bandung",
        slug: "neon-mist-bandung",
        address: "Jl. Braga No. 10, Bandung",
        city: "Bandung",
        province: "Jawa Barat",
        phone: "081234567892",
        whatsapp: "6281234567892",
        rating: 4.9,
        reviewCount: 210,
        instagram: "@neonmist.bdg",
        description: "Vapor community base in Bandung. We have live music and great coffee while you vape.",
        latitude: -6.91,
        longitude: 107.61,
    },
    {
        name: "Vape Empire Medan",
        slug: "vape-empire-medan",
        address: "Jl. Gajah Mada No. 15, Medan",
        city: "Medan",
        province: "Sumatera Utara",
        phone: "081234567893",
        whatsapp: "6281234567893",
        rating: 4.6,
        reviewCount: 60,
        instagram: "@vapeempire.mdn",
        description: "The biggest vape distribution in Medan. Wholesale and retail available.",
        latitude: 3.59,
        longitude: 98.67,
    },
    {
        name: "Liquid Heaven Bali",
        slug: "liquid-heaven-bali",
        address: "Jl. Sunset Road, Seminyak, Bali",
        city: "Denpasar",
        province: "Bali",
        phone: "081234567894",
        whatsapp: "6281234567894",
        rating: 4.8,
        reviewCount: 150,
        instagram: "@liquidheaven.bali",
        description: "Experience vaping in paradise. Wide selection of international juices.",
        latitude: -8.65,
        longitude: 115.21,
    },
];

const CITIES = [
    { name: "Jakarta", slug: "jakarta", province: "DKI Jakarta" },
    { name: "Surabaya", slug: "surabaya", province: "Jawa Timur" },
    { name: "Bandung", slug: "bandung", province: "Jawa Barat" },
    { name: "Medan", slug: "medan", province: "Sumatera Utara" },
    { name: "Denpasar", slug: "denpasar", province: "Bali" },
];

const PROVINCES = [
    { name: "DKI Jakarta", slug: "dki-jakarta" },
    { name: "Jawa Timur", slug: "jawa-timur" },
    { name: "Jawa Barat", slug: "jawa-barat" },
    { name: "Sumatera Utara", slug: "sumatera-utara" },
    { name: "Bali", slug: "bali" },
];

async function main() {
    console.log("Start seeding...");

    // Clean DB
    await prisma.store.deleteMany();
    await prisma.city.deleteMany();
    await prisma.province.deleteMany();

    // Seed Provinces
    for (const p of PROVINCES) {
        await prisma.province.create({ data: p });
    }

    // Seed Cities
    for (const c of CITIES) {
        await prisma.city.create({ data: c });
    }

    // Seed Stores
    for (const s of STORES) {
        await prisma.store.create({ data: s });
    }

    // Update counts
    const provinces = await prisma.province.findMany();
    for (const p of provinces) {
        const count = await prisma.store.count({ where: { province: p.name } });
        await prisma.province.update({
            where: { id: p.id },
            data: { storeCount: count },
        });
    }

    const cities = await prisma.city.findMany();
    for (const c of cities) {
        const count = await prisma.store.count({ where: { city: c.name } });
        await prisma.city.update({
            where: { id: c.id },
            data: { storeCount: count },
        });
    }

    console.log("Seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
