import Link from "next/link";
import { prisma } from "@/lib/db";
import { ArrowRight, MapPin } from "lucide-react";

export default async function CityGrid() {
    const cities = await prisma.city.findMany({
        take: 6,
        orderBy: { storeCount: "desc" },
    });

    return (
        <section className="py-24 px-6 relative overflow-hidden bg-[#0D0D0D]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-neon-cyan font-bold text-[10px] tracking-widest uppercase mb-4 inline-block">Destinasi Populer</span>
                        <h2 className="text-4xl md:text-5xl font-orbitron font-extrabold text-white leading-tight">
                            KOTA VAPOR <span className="text-neon-pink">TERPOPULER</span> <br />
                            DI INDONESIA
                        </h2>
                    </div>
                    <Link href="/directory" className="group flex items-center space-x-2 text-white font-bold text-sm tracking-widest uppercase hover:text-neon-cyan transition-colors">
                        <span>Lihat Semua Kota</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cities.map((city) => (
                        <Link
                            key={city.id}
                            href={`/city/${city.slug}`}
                            className="group relative h-64 glass-cyan p-8 flex flex-col justify-end overflow-hidden hover:shadow-[0_0_30px_rgba(0,245,255,0.15)] transition-all duration-500 rounded-3xl group"
                        >
                            {/* Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#0D0D0D] to-transparent opacity-80 group-hover:opacity-40 transition-opacity z-10" />

                            <div className="relative z-20 transition-transform duration-500 group-hover:-translate-y-2">
                                <div className="flex items-center space-x-2 mb-2">
                                    <MapPin className="w-4 h-4 text-neon-cyan" />
                                    <span className="text-neon-cyan font-bold tracking-widest text-[10px] uppercase">{city.province}</span>
                                </div>
                                <h3 className="text-3xl font-orbitron font-extrabold text-white mb-2">{city.name}</h3>
                                <div className="text-gray-400 text-sm font-space group-hover:text-neon-pink transition-colors">
                                    {city.storeCount} <span className="text-white/60">Toko terdaftar</span>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-8 right-8 w-12 h-12 bg-white/5 blur-xl group-hover:bg-neon-cyan/20 transition-all rounded-full" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
