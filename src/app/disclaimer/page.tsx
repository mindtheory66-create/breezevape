import { AlertTriangle, Coffee, Info, ShieldAlert } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Disclaimer - Breeze Vape Directory",
    description: "Pernyataan pelepasan tanggung jawab dan peringatan kesehatan terkait penggunaan direktori Breeze Vape Directory.",
};

export default function DisclaimerPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Disclaimer Breeze Vape Directory",
        "url": "https://breezevapestore.com/disclaimer",
        "description": "Pernyataan pelepasan tanggung jawab hukum dan peringatan kesehatan produk vapor."
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] pt-24 md:pt-32 pb-32 md:pb-48 px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-4xl mx-auto">
                <div className="mb-20">
                    <span className="text-neon-cyan font-bold text-[10px] tracking-[0.5em] uppercase mb-6 inline-block">Legal Disclaimer</span>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-orbitron font-extrabold text-white mb-8 tracking-tighter leading-tight break-words">
                        DISCLAIMER <br /><span className="text-neon-pink italic">& WARNINGS</span>
                    </h1>
                    <p className="text-gray-400 font-space leading-relaxed">
                        Pernyataan pelepasan tanggung jawab dan peringatan penting mengenai penggunaan layanan Breeze Vape Directory.
                    </p>
                </div>

                <div className="space-y-16">
                    <section className="glass glass-pink p-12 rounded-[3.5rem] border border-neon-pink/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-pink/10 blur-[60px] -z-10" />
                        <div className="flex items-center gap-4 mb-8">
                            <AlertTriangle className="w-8 h-8 text-neon-pink" />
                            <h2 className="text-2xl font-orbitron font-black text-white uppercase italic tracking-tighter">PERINGATAN KESEHATAN</h2>
                        </div>
                        <p className="text-gray-400 font-space leading-relaxed mb-8 text-lg">
                            Produk vapor yang terdaftar dalam direktori ini mengandung nikotin. Nikotin adalah zat adiktif. Penggunaan produk vapor juga berisiko terhadap kesehatan pernapasan.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[10px] font-bold tracking-[0.2em] uppercase text-neon-pink/60">
                            <div className="px-4 py-2 border border-neon-pink/20 rounded-lg">TIDAK UNTUK IBU HAMIL</div>
                            <div className="px-4 py-2 border border-neon-pink/20 rounded-lg">KHUSUS 21 TAHUN KE ATAS</div>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Coffee className="w-5 h-5 text-neon-cyan" />
                                <h3 className="text-white font-orbitron font-bold uppercase tracking-widest text-sm">Bukan Toko Online</h3>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Breeze Vape Directory **TIDAK** memproses transaksi jual-beli. Kami hanyalah jembatan informasi. Segala risiko transaksi adalah tanggung jawab pembeli dan penjual secara mandiri.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Info className="w-5 h-5 text-neon-purple" />
                                <h3 className="text-white font-orbitron font-bold uppercase tracking-widest text-sm">Akurasi Data</h3>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Meskipun kami berusaha menjaga data tetap akurat, kami tidak menjamin 100% ketepatan informasi (jam buka, stok, atau lokasi) yang disediakan oleh pihak toko pada aplikasi kami.
                            </p>
                        </section>
                    </div>

                    <div className="p-10 rounded-[2.5rem] bg-neon-cyan/5 border border-neon-cyan/10">
                        <div className="flex items-start gap-4">
                            <ShieldAlert className="w-6 h-6 text-neon-cyan mt-1" />
                            <div>
                                <h3 className="text-white font-orbitron font-extrabold mb-4 uppercase text-xs tracking-[0.2em]">Kepatuhan Regulasi</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Konten dalam direktori ini ditujukan untuk edukasi dan pencarian (discovery) bagi vaper dewasa. Kami mematuhi UU Kesehatan dan PP No. 28 Tahun 2024 tentang pengamanan zat adiktif di Indonesia.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
