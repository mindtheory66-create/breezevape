import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Star, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    try {
        const city = await prisma.city.findUnique({ where: { slug } });

        if (!city) return { title: "Kota Tidak Ditemukan" };

        return {
            title: `Vape Store ${city.name} - Daftar Toko Vapor Terdekat | Breeze Vape Directory`,
            description: `Cari toko vape terbaik di ${city.name}. Temukan alamat, rating, dan kontak toko vapor terlengkap di ${city.name} hanya di Breeze Vape Store Directory.`,
        };
    } catch {
        return { title: "Breeze Vape Directory" };
    }
}

export default async function CityPage({ params }: Props) {
    const { slug } = await params;

    let city;
    let stores: Awaited<ReturnType<typeof prisma.store.findMany>> = [];

    try {
        city = await prisma.city.findUnique({ where: { slug } });
        if (!city) notFound();

        stores = await prisma.store.findMany({
            where: { city: city.name },
            orderBy: { rating: "desc" },
        });
    } catch (error) {
        console.error("CityPage: Gagal mengambil data", error);
        return (
            <div className="min-h-screen bg-[#0D0D0D] pt-24 md:pt-32 pb-32 px-6">
                <div className="max-w-7xl mx-auto px-6 text-center py-32">
                    <h1 className="text-4xl font-orbitron font-extrabold text-white mb-8">Koneksi Terputus</h1>
                    <p className="text-gray-500 font-space mb-10">Kami sedang mengalami kendala koneksi ke server. Silakan coba lagi nanti.</p>
                    <Link href="/" className="bg-neon-cyan text-black px-8 py-3 rounded-lg font-black tracking-widest uppercase text-xs">
                        Kembali ke Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0D0D0D] pt-24 md:pt-32 pb-32 px-6">
            <div className="max-w-7xl mx-auto px-6">
                <Link href="/directory" className="inline-flex items-center space-x-2 text-neon-cyan text-[10px] font-bold tracking-[0.3em] uppercase mb-12 hover:translate-x-[-4px] transition-transform">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Direktori</span>
                </Link>

                <div className="mb-20">
                    <div className="flex items-center space-x-3 mb-6">
                        <MapPin className="w-5 h-5 text-neon-cyan" />
                        <span className="text-neon-cyan font-bold tracking-[0.4em] text-[10px] uppercase">{city.province}</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-8xl font-orbitron font-extrabold text-white tracking-tighter mb-4 md:mb-8 leading-tight break-words">
                        TOKO VAPOR DI <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple italic">{city.name.toUpperCase()}</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-space max-w-2xl leading-relaxed">
                        Temukan {stores.length} toko vapor pilihan di {city.name}. Dari mod premium hingga liquid lokal, jelajahi komunitas vapor di kota Anda.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stores.map((store) => (
                        <Link
                            key={store.id}
                            href={`/store/${store.slug}`}
                            className="group glass glass-cyan p-8 rounded-[2.5rem] border border-white/5 hover:shadow-[0_0_40px_rgba(0,245,255,0.15)] transition-all duration-500 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-14 h-14 rounded-[10px] bg-[#1A1A1A] border border-white/5 flex items-center justify-center text-neon-cyan font-orbitron font-bold text-2xl group-hover:scale-110 transition-transform overflow-hidden shrink-0">
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

                                <h3 className="text-2xl font-orbitron font-extrabold text-white mb-3 group-hover:text-neon-cyan transition-colors">{store.name}</h3>
                                <p className="text-gray-500 text-sm font-space line-clamp-2 mb-8 leading-relaxed">
                                    {store.description}
                                </p>
                            </div>

                            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                    {store.city}
                                </div>
                                <div className="text-neon-pink text-[10px] font-bold tracking-widest uppercase hover:underline">
                                    Lihat Profil
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {stores.length === 0 && (
                    <div className="py-32 text-center glass rounded-[3rem] border border-dashed border-white/10">
                        <h3 className="text-white font-orbitron font-bold text-xl mb-4">No Stores Yet</h3>
                        <p className="text-gray-500">We are still collecting data for {city.name}. Be the first to list a store!</p>
                        <Link href="/submit-store" className="inline-block mt-8 bg-neon-pink text-black px-8 py-3 rounded-lg font-black tracking-widest uppercase text-xs">
                            Submit A Store
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
