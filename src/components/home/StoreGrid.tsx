import Link from "next/link";
import { prisma } from "@/lib/db";
import { Star, MapPin, Instagram, ExternalLink } from "lucide-react";

export default async function StoreGrid() {
    const stores = await prisma.store.findMany({
        take: 4,
        orderBy: { rating: "desc" },
    });

    return (
        <section className="py-24 px-6 relative overflow-hidden bg-[#0D0D0D]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-neon-pink font-bold text-[10px] tracking-widest uppercase mb-4 inline-block tracking-[0.4em]">Performa Tinggi</span>
                        <h2 className="text-4xl md:text-5xl font-orbitron font-extrabold text-white leading-tight">
                            TOKO <span className="text-neon-cyan italic">UNGGULAN</span> <br />
                            PILIHAN KOMUNITAS
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stores.map((store) => (
                        <div
                            key={store.id}
                            className="group relative h-full glass glass-pink p-6 flex flex-col justify-between overflow-hidden hover:shadow-[0_0_30px_rgba(255,0,212,0.1)] transition-all duration-500 rounded-3xl"
                        >
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-neon-purple to-neon-pink flex items-center justify-center p-0.5 shadow-lg group-hover:scale-110 transition-transform duration-500 overflow-hidden shrink-0">
                                        <div className="w-full h-full bg-[#1A1A1A] rounded-[10px] flex items-center justify-center overflow-hidden">
                                            {store.logoUrl || store.imageUrl ? (
                                                <img src={store.logoUrl || store.imageUrl || ''} alt={store.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                            ) : (
                                                <span className="text-white font-black text-xl">{store.name.charAt(0)}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/5">
                                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                        <span className="text-white text-[10px] font-bold tracking-widest">{store.rating}</span>
                                    </div>
                                </div>

                                <Link href={`/store/${store.slug}`} className="group-hover:text-neon-cyan transition-colors mb-2">
                                    <h3 className="text-xl font-orbitron font-extrabold text-white tracking-tight leading-tight">{store.name}</h3>
                                </Link>
                                <div className="flex items-center space-x-2 text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-4">
                                    <MapPin className="w-3 h-3 text-neon-pink" />
                                    <span>{store.city}, {store.province}</span>
                                </div>

                                <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-6 font-space">
                                    {store.description}
                                </p>

                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        {store.instagram && (
                                            <Link href={`https://instagram.com/${store.instagram.replace('@', '')}`} className="text-gray-500 hover:text-neon-pink transition-colors">
                                                <Instagram className="w-4 h-4" />
                                            </Link>
                                        )}
                                    </div>
                                    <Link
                                        href={`/store/${store.slug}`}
                                        className="flex items-center space-x-1.5 text-neon-cyan text-[10px] font-bold tracking-widest uppercase hover:underline"
                                    >
                                        <span>Lihat Profil</span>
                                        <ExternalLink className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>

                            {/* Decorative Corner Glow */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-neon-pink/10 blur-3xl group-hover:bg-neon-pink/20 transition-all rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
