import { Lock, Eye, Database, Globe, Bell } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kebijakan Privasi - Breeze Vape Directory",
    description: "Kebijakan privasi perlindungan data pengguna Breeze Vape Directory sesuai dengan standar UU PDP di Indonesia.",
};

export default function PrivacyPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Kebijakan Privasi Breeze Vape Directory",
        "url": "https://breezevapestore.com/privacy",
        "description": "Kebijakan pengumpulan dan perlindungan data pribadi."
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] pt-24 md:pt-32 pb-32 md:pb-48 px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-4xl mx-auto">
                <div className="mb-20">
                    <span className="text-neon-pink font-bold text-[10px] tracking-[0.5em] uppercase mb-6 inline-block">Privacy & Security</span>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-orbitron font-extrabold text-white mb-8 tracking-tighter leading-tight break-words">
                        KEBIJAKAN <span className="text-neon-cyan italic">PRIVASI</span>
                    </h1>
                    <p className="text-gray-400 font-space leading-relaxed max-w-2xl">
                        Privasi Anda adalah prioritas kami. Sesuai dengan **UU No. 27 Tahun 2022 (UU PDP)**, kami berkomitmen untuk melindungi data pribadi Anda.
                    </p>
                </div>

                <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="glass p-8 rounded-[2rem] border border-white/5">
                            <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center mb-6">
                                <Database className="w-5 h-5 text-neon-cyan" />
                            </div>
                            <h3 className="text-white font-orbitron font-bold mb-4 uppercase text-sm tracking-widest">Informasi Yang Dikumpulkan</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Kami mengumpulkan data secara terbatas untuk keperluan fungsionalitas direktori, seperti:
                                <ul className="mt-4 space-y-2 list-disc pl-5">
                                    <li>Data toko dari pengajuan sukarela.</li>
                                    <li>Informasi browser melalui cookies untuk pengalaman browsing.</li>
                                    <li>Data analytics anonim untuk meningkatkan performa situs.</li>
                                </ul>
                            </p>
                        </section>

                        <section className="glass p-8 rounded-[2rem] border border-white/5">
                            <div className="w-10 h-10 rounded-lg bg-neon-pink/10 flex items-center justify-center mb-6">
                                <Lock className="w-5 h-5 text-neon-pink" />
                            </div>
                            <h3 className="text-white font-orbitron font-bold mb-4 uppercase text-sm tracking-widest">Keamanan Data</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Sesuai regulasi di Indonesia, kami menerapkan standar keamanan teknis untuk menjaga integritas data Anda dari akses yang tidak sah.
                            </p>
                        </section>

                        <section className="glass p-8 rounded-[2rem] border border-white/5">
                            <div className="w-10 h-10 rounded-lg bg-neon-purple/10 flex items-center justify-center mb-6">
                                <Eye className="w-5 h-5 text-neon-purple" />
                            </div>
                            <h3 className="text-white font-orbitron font-bold mb-4 uppercase text-sm tracking-widest">Transparansi Data</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Kami tidak menjual atau membagikan data pribadi Anda ke pihak ketiga untuk keperluan komersial tanpa persetujuan eksplisit Anda.
                            </p>
                        </section>

                        <section className="glass p-8 rounded-[2rem] border border-white/5">
                            <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center mb-6">
                                <Globe className="w-5 h-5 text-neon-cyan" />
                            </div>
                            <h3 className="text-white font-orbitron font-bold mb-4 uppercase text-sm tracking-widest">Hak Anda (UU PDP)</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Anda memiliki hak untuk mengakses, memperbaiki, dan menghapus data Anda yang tersimpan di sistem kami kapan saja.
                            </p>
                        </section>
                    </div>

                    <div className="glass glass-pink p-12 rounded-[3.5rem] border border-neon-pink/10 relative overflow-hidden text-center">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-pink/10 blur-[60px] -z-10" />
                        <Bell className="w-12 h-12 text-neon-pink mx-auto mb-6" />
                        <h2 className="text-2xl font-orbitron font-extrabold text-white mb-6 uppercase">Pemberitahuan Pelanggaran</h2>
                        <p className="text-gray-400 font-space max-w-2xl mx-auto leading-relaxed">
                            Breeze Vape Directory mematuhi kewajiban pelaporan dalam 72 jam jika terjadi kebocoran data sesuai standar perlindungan data nasional Indonesia.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
