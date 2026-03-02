import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Star, MapPin, ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const province = await prisma.province.findUnique({ where: { slug } });

    if (!province) return { title: "Provinsi Tidak Ditemukan" };

    return {
        title: `Vape Store di ${province.name} - Direktori Vapor Indonesia | Breeze Vape`,
        description: `Daftar lengkap toko vapor di wilayah ${province.name}. Cek alamat, kota, dan rating toko vape terbaik di ${province.name} melalui Breeze Vape Directory.`,
    };
}

export default async function ProvincePage({ params }: Props) {
    const { slug } = await params;
    const province = await prisma.province.findUnique({ where: { slug } });

    if (!province) notFound();

    const stores = await prisma.store.findMany({
        where: { province: province.name },
        orderBy: { rating: "desc" },
    });

    const citiesInProvince = await prisma.city.findMany({
        where: { province: province.name },
        orderBy: { name: "asc" },
    });

    return (
        <div className="min-h-screen bg-[#0D0D0D] pt-24 md:pt-32 pb-32 px-6">
            <div className="max-w-7xl mx-auto px-6">
                <Link href="/directory" className="inline-flex items-center space-x-2 text-neon-pink text-[10px] font-bold tracking-[0.3em] uppercase mb-12 hover:translate-x-[-4px] transition-transform">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Direktori</span>
                </Link>

                <div className="mb-20">
                    <div className="flex items-center space-x-3 mb-6">
                        <Building2 className="w-5 h-5 text-neon-pink" />
                        <span className="text-neon-pink font-bold tracking-[0.4em] text-[10px] uppercase">Ringkasan Provinsi</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-8xl font-orbitron font-extrabold text-white tracking-tighter mb-4 md:mb-8 leading-tight break-words">
                        WILAYAH <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple italic">{province.name.toUpperCase()}</span>
                    </h1>

                    <div className="flex flex-wrap gap-3 mt-8">
                        {citiesInProvince.map((city) => (
                            <Link
                                key={city.id}
                                href={`/city/${city.slug}`}
                                className="px-4 py-2 glass glass-pink rounded-xl text-xs font-bold text-gray-400 hover:text-white hover:border-neon-pink transition-all"
                            >
                                {city.name} ({city.storeCount})
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stores.map((store) => (
                        <Link
                            key={store.id}
                            href={`/store/${store.slug}`}
                            className="group glass p-8 rounded-[2.5rem] border border-white/5 hover:shadow-[0_0_40px_rgba(157,0,255,0.15)] transition-all duration-500 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-14 h-14 rounded-[10px] bg-[#1A1A1A] border border-white/5 flex items-center justify-center text-neon-pink font-orbitron font-bold text-2xl group-hover:scale-110 transition-transform overflow-hidden shrink-0">
                                        {store.logoUrl || store.imageUrl ? (
                                            <img src={store.logoUrl || store.imageUrl || ''} alt={store.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                        ) : (
                                            store.name.charAt(0)
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                        <span className="text-white text-xs font-bold">{store.rating}</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-orbitron font-extrabold text-white mb-3 group-hover:text-neon-pink transition-colors">{store.name}</h3>
                                <p className="text-gray-400 text-sm font-space line-clamp-2 mb-8 leading-relaxed">
                                    {store.description}
                                </p>
                            </div>

                            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                                    <MapPin className="w-3 h-3 text-neon-cyan" />
                                    <span>{store.city}</span>
                                </div>
                                <div className="text-neon-cyan text-[10px] font-bold tracking-widest uppercase hover:underline">
                                    Lihat Detail
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {stores.length === 0 && (
                    <div className="py-32 text-center glass rounded-[3rem] border border-dashed border-white/10">
                        <h3 className="text-white font-orbitron font-bold text-xl mb-4">Belum Ada Listing</h3>
                        <p className="text-gray-500 max-w-sm mx-auto">Kami masih memperluas jaringan kami untuk wilayah {province.name}. Punya info toko di sana?</p>
                        <Link href="/submit-store" className="inline-block mt-8 bg-neon-cyan text-black px-12 py-4 rounded-xl font-black tracking-widest uppercase text-xs">
                            Kirim Data Toko
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
