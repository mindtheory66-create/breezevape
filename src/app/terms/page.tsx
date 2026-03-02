import { Shield, Scale, UserCheck, AlertCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Syarat & Ketentuan - Breeze Vape Directory",
    description: "Syarat dan ketentuan layanan Breeze Vape Directory. Wajib berusia 21+ tahun ke atas untuk menggunakan platform pencarian ini.",
};

export default function TermsPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Syarat & Ketentuan Breeze Vape Directory",
        "url": "https://breezevapestore.com/terms",
        "description": "Syarat dan ketentuan penggunaan situs Breeze Vape Directory."
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] pt-24 md:pt-32 pb-32 md:pb-48 px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-4xl mx-auto">
                <div className="mb-16">
                    <span className="text-neon-cyan font-bold text-[10px] tracking-[0.5em] uppercase mb-6 inline-block">Legal Documents</span>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-orbitron font-extrabold text-white mb-8 tracking-tighter leading-tight break-words">
                        SYARAT & <span className="text-neon-pink italic">KETENTUAN</span>
                    </h1>
                    <p className="text-gray-400 font-space leading-relaxed">
                        Terakhir diperbarui: 1 Maret 2026. Harap baca Syarat dan Ketentuan ini dengan seksama sebelum menggunakan layanan Breeze Vape Directory.
                    </p>
                </div>

                <div className="space-y-16">
                    <section className="glass p-10 rounded-[2.5rem] border border-white/5">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center">
                                <UserCheck className="w-6 h-6 text-neon-cyan" />
                            </div>
                            <h2 className="text-2xl font-orbitron font-bold text-white">1. Batasan Usia (21+)</h2>
                        </div>
                        <p className="text-gray-400 font-space leading-relaxed mb-6">
                            Sesuai dengan **Peraturan Pemerintah (PP) No. 28 Tahun 2024**, akses ke website ini hanya diperbolehkan bagi individu yang telah berusia minimal **21 (dua puluh satu) tahun**.
                        </p>
                        <ul className="space-y-4 text-gray-500 text-sm list-disc pl-5">
                            <li>Anda menyatakan bahwa Anda berusia minimal 21 tahun saat mengakses website ini.</li>
                            <li>Kami berhak melakukan verifikasi usia kapan saja.</li>
                            <li>Akses oleh anak di bawah umur sangat dilarang dan merupakan pelanggaran terhadap ketentuan ini.</li>
                        </ul>
                    </section>

                    <section className="glass p-10 rounded-[2.5rem] border border-white/5">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center">
                                <Shield className="w-6 h-6 text-neon-purple" />
                            </div>
                            <h2 className="text-2xl font-orbitron font-bold text-white">2. Sifat Layanan</h2>
                        </div>
                        <p className="text-gray-400 font-space leading-relaxed mb-6">
                            Breeze Vape Directory adalah **platform direktori informasi** saja.
                        </p>
                        <ul className="space-y-4 text-gray-500 text-sm list-disc pl-5">
                            <li>Kami tidak menjual, mendistribusikan, atau mempromosikan penjualan produk vapor secara langsung.</li>
                            <li>Informasi yang tersedia (alamat, rating, kontak) disediakan untuk membantu discovery komunitas.</li>
                            <li>Kami tidak bertanggung jawab atas transaksi yang terjadi antara pengguna dan toko yang terdaftar di direktori kami.</li>
                        </ul>
                    </section>

                    <section className="glass p-10 rounded-[2.5rem] border border-white/5">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-neon-pink/10 border border-neon-pink/20 flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-neon-pink" />
                            </div>
                            <h2 className="text-2xl font-orbitron font-bold text-white">3. Konten & Hak Cipta</h2>
                        </div>
                        <p className="text-gray-400 font-space leading-relaxed mb-6">
                            Semua logo, desain, dan data dalam website ini adalah milik Breeze Vape Directory atau pemilik toko masing-masing.
                        </p>
                        <ul className="space-y-4 text-gray-500 text-sm list-disc pl-5">
                            <li>Dilarang melakukan crawling data tanpa izin tertulis.</li>
                            <li>Penggunaan informasi hanya diperbolehkan untuk penggunaan pribadi/non-komersial.</li>
                        </ul>
                    </section>

                    <section className="glass p-10 rounded-[2.5rem] border border-white/5">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-gray-500/10 border border-gray-500/20 flex items-center justify-center">
                                <Scale className="w-6 h-6 text-gray-500" />
                            </div>
                            <h2 className="text-2xl font-orbitron font-bold text-white">4. Perubahan Ketentuan</h2>
                        </div>
                        <p className="text-gray-400 font-space leading-relaxed">
                            Kami berhak mengubah syarat ini sewaktu-waktu untuk mematuhi regulasi pemerintah yang dinamis di Indonesia. Penggunaan berkelanjutan setelah perubahan dianggap sebagai persetujuan terhadap ketentuan baru.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
