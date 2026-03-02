import { ShieldCheck, Target, Users, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tentang Kami - Misi Breeze Vape Directory",
    description: "Pelajari visi dan misi Breeze Vape Directory. Kami adalah pusat pencarian toko vapor terlengkap, modern, dan terpercaya untuk seluruh vaper di Indonesia.",
};

export default function AboutPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "Tentang Breeze Vape Directory",
        "url": "https://breezevapestore.com/about",
        "description": "Pusat informasi dan discovery pencarian toko vapor di Indonesia."
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] pt-24 md:pt-32 pb-32 md:pb-48 px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-24">
                    <span className="text-neon-cyan font-bold text-[10px] tracking-[0.5em] uppercase mb-6 inline-block">Cerita Kami</span>
                    <h1 className="text-5xl md:text-6xl lg:text-8xl font-orbitron font-extrabold text-white mb-10 tracking-tighter text-glow-cyan leading-tight break-words">
                        BREEZE <span className="text-neon-pink italic">VISION</span>
                    </h1>
                    <p className="text-gray-400 text-xl font-space leading-relaxed">
                        Kita bukan cuma direktori. Kita adalah pusat discovery buat komunitas vaper Indonesia yang modern, tech-savvy, dan selalu cari yang terbaik.
                    </p>
                </div>

                <section className="space-y-32">
                    {/* Mission */}
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="flex-1">
                            <div className="w-16 h-16 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center mb-8">
                                <Target className="w-8 h-8 text-neon-cyan" />
                            </div>
                            <h2 className="text-3xl font-orbitron font-extrabold text-white mb-6">Misi Kita</h2>
                            <p className="text-gray-400 font-space leading-relaxed text-lg">
                                Visi kita simpel: Memudahkan vaper di seluruh Indonesia buat nemuin toko vapor terbaik, terpercaya, dan terdekat. Kita pengen bantu bisnis lokal buat bertumbuh sambil ngebangun ekosistem discovery yang solid di era digital.
                            </p>
                        </div>
                        <div className="flex-1 w-full h-[300px] glass glass-cyan rounded-[3rem] border border-white/5 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-neon-cyan/5 group-hover:bg-neon-cyan/10 transition-colors animate-pulse" />
                            <Zap className="w-16 h-16 text-neon-cyan group-hover:scale-110 transition-transform duration-500" />
                        </div>
                    </div>

                    {/* Points Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: <ShieldCheck className="w-6 h-6 text-neon-pink" />,
                                title: "TERVERIFIKASI",
                                desc: "Setiap listing dicek keasliannya sama tim kita."
                            },
                            {
                                icon: <Users className="w-6 h-6 text-neon-purple" />,
                                title: "KOMUNITAS",
                                desc: "Dibuat oleh vaper, khusus untuk vaper Indonesia."
                            },
                            {
                                icon: <Zap className="w-6 h-6 text-neon-cyan" />,
                                title: "UI MODERN",
                                desc: "Desain yang eye-catching dan youth-centric."
                            },
                        ].map((item, i) => (
                            <div key={i} className="glass p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
                                <div className="mb-6">{item.icon}</div>
                                <h3 className="text-white font-orbitron font-extrabold text-lg mb-4">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Content disclaimer bar */}
                    <div className="glass glass-pink p-12 rounded-[3.5rem] border border-neon-pink/10 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-pink/10 blur-[60px] -z-10" />
                        <h2 className="text-3xl font-orbitron font-extrabold text-white mb-6">REGULASI & KEAMANAN</h2>
                        <p className="text-gray-400 font-space max-w-2xl mx-auto leading-relaxed mb-8">
                            Breeze Vape Directory mematuhi semua regulasi di Indonesia, termasuk **PP No. 28 Tahun 2024**. Kami adalah platform informasi (direktori) dan **tidak menjual** produk tembakau atau rokok elektrik. Pengguna harus berusia **21+ tahun** untuk menggunakan layanan kami.
                        </p>
                        <div className="inline-block px-6 py-2 rounded-full border border-neon-pink/20 bg-neon-pink/5 text-neon-pink text-[10px] font-bold tracking-widest uppercase">
                            KHUSUS 21+
                        </div>
                    </div>

                    <div className="text-center pt-24">
                        <h3 className="text-white font-orbitron font-extrabold text-2xl mb-8 tracking-tight">MAU TOKO KAMU ADA DI SINI?</h3>
                        <Link href="/submit-store" className="bg-neon-cyan text-black px-12 py-5 rounded-xl font-black tracking-widest uppercase text-sm hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all inline-flex items-center space-x-3">
                            <span>DAFTARKAN SEKARANG</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
