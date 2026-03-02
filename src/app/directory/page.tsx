import { prisma } from "@/lib/db";
import Link from "next/link";
import { Star, MapPin, Search, Filter } from "lucide-react";
import SearchBar from "@/components/home/SearchBar";
import { Metadata } from "next";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ city?: string; province?: string; q?: string }> }): Promise<Metadata> {
    const { city, province, q } = await searchParams;
    let title = "Direktori Toko Vapor - Cari Vape Store Terdekat";
    let desc = "Temukan ribuan toko vapor, liquid, dan mod terbaik di seluruh Indonesia dengan Breeze Vape Directory.";

    if (city) {
        title = `Toko Vapor Terbaik di ${city} - Breeze Directory`;
        desc = `Cari toko vapor, mod, dan liquid terlengkap di ${city}. Daftar lengkap alamat dan nomor telepon vape store di kota Anda.`;
    } else if (province) {
        title = `Vape Store di ${province} - Breeze Directory`;
    }

    if (q) title = `Pencarian "${q}" - Direktori Vape`;

    return {
        title,
        description: desc,
    };
}

export default async function DirectoryPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; city?: string; province?: string }>;
}) {
    const { q, city, province } = await searchParams;

    const stores = await prisma.store.findMany({
        where: {
            OR: q ? [
                { name: { contains: q } },
                { address: { contains: q } },
                { description: { contains: q } },
            ] : undefined,
            city: city || undefined,
            province: province || undefined,
        },
        orderBy: { rating: "desc" },
    });

    const cities = await prisma.city.findMany({ orderBy: { name: "asc" } });
    const provinces = await prisma.province.findMany({ orderBy: { name: "asc" } });

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": city || province || q ? "SearchResultsPage" : "CollectionPage",
        "name": city ? `Toko Vapor di ${city}` : "Direktori Toko Vapor",
        "description": "Menampilkan daftar dan informasi toko vapor, liquid lokal, mod, serta aksesoris vape.",
        "url": "https://breezevapestore.com/directory",
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] pt-24 md:pt-32 pb-24 px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <span className="text-neon-cyan font-bold text-[10px] tracking-[0.5em] uppercase mb-4 inline-block">Direktori Breeze</span>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-orbitron font-extrabold text-white mb-8 tracking-tighter leading-tight break-words">
                        JELAJAHI <span className="text-neon-pink italic">JARINGAN</span>
                    </h1>
                    <div className="max-w-3xl mx-auto">
                        <SearchBar />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 mt-16">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 space-y-10">
                        <div>
                            <h3 className="text-white font-orbitron font-bold text-xs uppercase tracking-widest mb-6 flex items-center space-x-2">
                                <Filter className="w-4 h-4 text-neon-cyan" />
                                <span>Filter Kota</span>
                            </h3>
                            <div className="space-y-3">
                                <Link
                                    href="/directory"
                                    className={`block text-sm transition-colors ${!city ? 'text-neon-cyan font-bold' : 'text-gray-500 hover:text-white'}`}
                                >
                                    Semua Kota
                                </Link>
                                {cities.map((c) => (
                                    <Link
                                        key={c.id}
                                        href={`/directory?city=${c.name}${q ? `&q=${q}` : ''}`}
                                        className={`block text-sm transition-colors ${city === c.name ? 'text-neon-cyan font-bold' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        {c.name} ({c.storeCount})
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-white font-orbitron font-bold text-xs uppercase tracking-widest mb-6">Provinsi</h3>
                            <div className="space-y-3">
                                {provinces.map((p) => (
                                    <Link
                                        key={p.id}
                                        href={`/directory?province=${p.name}${q ? `&q=${q}` : ''}`}
                                        className={`block text-sm transition-colors ${province === p.name ? 'text-neon-pink font-bold' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        {p.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Listings Grid */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                            <div className="text-gray-400 text-sm font-space">
                                Menampilkan <span className="text-white font-bold">{stores.length}</span> hasil
                                {q && <span> untuk "<span className="text-neon-cyan">{q}</span>"</span>}
                            </div>
                        </div>

                        {stores.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {stores.map((store) => (
                                    <Link
                                        key={store.id}
                                        href={`/store/${store.slug}`}
                                        className="group glass glass-cyan p-6 flex items-start space-x-6 hover:shadow-[0_0_30px_rgba(0,245,255,0.1)] transition-all duration-500 rounded-3xl"
                                    >
                                        <div className="w-16 h-16 shrink-0 rounded-[10px] bg-[#1A1A1A] border border-white/5 flex items-center justify-center group-hover:bg-neon-cyan/10 transition-colors overflow-hidden">
                                            {store.logoUrl || store.imageUrl ? (
                                                <img src={store.logoUrl || store.imageUrl || ''} alt={store.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                            ) : (
                                                <span className="text-white font-orbitron font-bold text-2xl group-hover:text-neon-cyan">{store.name.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-orbitron font-extrabold text-white group-hover:text-neon-cyan transition-colors">{store.name}</h3>
                                                <div className="flex items-center space-x-1">
                                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                    <span className="text-white text-[10px] font-bold">{store.rating}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-4">
                                                <MapPin className="w-3 h-3 text-neon-pink" />
                                                <span>{store.city}</span>
                                            </div>
                                            <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                                                {store.description}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="py-24 text-center glass rounded-[3rem] border border-dashed border-white/10">
                                <Search className="w-12 h-12 text-gray-600 mx-auto mb-6" />
                                <h3 className="text-white font-orbitron font-bold text-xl mb-4">Toko Tidak Ditemukan</h3>
                                <p className="text-gray-500 max-w-sm mx-auto">
                                    Kami tidak menemukan toko yang sesuai dengan pencarian Anda. Coba sesuaikan filter atau kata kunci pencarian.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
