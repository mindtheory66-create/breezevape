import { Mail, MessageSquare, Phone, MapPin, Send, Instagram } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hubungi Kami - Breeze Vape Directory",
    description: "Punya pertanyaan atau ingin mendaftarkan toko vapor Anda? Hubungi tim Breeze Vape Directory via email atau Instagram resmi kami.",
};

export default function ContactPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Hubungi Breeze Vape Directory",
        "url": "https://breezevapestore.com/contact",
        "description": "Formulir kontak untuk pertanyaan, keluhan konten, atau kerjasama."
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] pt-24 md:pt-32 pb-32 md:pb-48 px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-24">
                    <span className="text-neon-cyan font-bold text-[10px] tracking-[0.5em] uppercase mb-6 inline-block">Connect With Us</span>
                    <h1 className="text-5xl md:text-6xl lg:text-8xl font-orbitron font-extrabold text-white mb-10 tracking-tighter leading-tight break-words">
                        HUBUNGI <span className="text-neon-pink italic">KAMI</span>
                    </h1>
                    <p className="text-gray-400 text-xl font-space max-w-2xl mx-auto leading-relaxed">
                        Punya pertanyaan, keluhan konten, atau ingin kerja sama bisnis? Tim kami siap membantu Anda.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <section className="glass p-8 rounded-3xl border border-white/5 group hover:border-neon-cyan/30 transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center">
                                    <Mail className="w-6 h-6 text-neon-cyan" />
                                </div>
                                <div>
                                    <h3 className="text-white font-orbitron font-bold text-sm uppercase tracking-widest">Email</h3>
                                    <p className="text-gray-500 text-xs">Fast response</p>
                                </div>
                            </div>
                            <p className="text-neon-cyan font-space text-lg break-all">hello@breezevapestore.com</p>
                        </section>

                        <section className="glass p-8 rounded-3xl border border-white/5 group hover:border-neon-pink/30 transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-neon-pink/10 flex items-center justify-center">
                                    <Instagram className="w-6 h-6 text-neon-pink" />
                                </div>
                                <div>
                                    <h3 className="text-white font-orbitron font-bold text-sm uppercase tracking-widest">Instagram</h3>
                                    <p className="text-gray-500 text-xs">Follow the feed</p>
                                </div>
                            </div>
                            <p className="text-neon-pink font-space text-lg">@breezevapestore</p>
                        </section>

                        <section className="glass p-8 rounded-3xl border border-white/5 group hover:border-neon-purple/30 transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-neon-purple/10 flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-neon-purple" />
                                </div>
                                <div>
                                    <h3 className="text-white font-orbitron font-bold text-sm uppercase tracking-widest">Markas Kami</h3>
                                    <p className="text-gray-500 text-xs">Operational base</p>
                                </div>
                            </div>
                            <p className="text-gray-400 font-space text-sm leading-relaxed">
                                Jakarta Selatan, DKI Jakarta<br />
                                Indonesia (Nasional)
                            </p>
                        </section>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="glass p-8 md:p-12 rounded-[3.5rem] border border-white/5">
                            <form className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-space focus:outline-none focus:border-neon-cyan transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Alamat Email</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-space focus:outline-none focus:border-neon-cyan transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Subjek Pesan</label>
                                    <select className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl px-6 py-4 text-white font-space focus:outline-none focus:border-neon-cyan transition-colors appearance-none cursor-pointer">
                                        <option>Pertanyaan Umum</option>
                                        <option>Laporan Konten (Legal)</option>
                                        <option>Kerja Sama Bisnis</option>
                                        <option>Masalah Teknis</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Pesan Anda</label>
                                    <textarea
                                        rows={6}
                                        placeholder="Tuliskan pesan Anda di sini..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-space focus:outline-none focus:border-neon-cyan transition-colors resize-none"
                                    ></textarea>
                                </div>

                                <button type="submit" className="w-full bg-neon-cyan text-black py-5 rounded-2xl font-black tracking-widest uppercase text-xs hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all flex items-center justify-center gap-3">
                                    <Send className="w-4 h-4" />
                                    <span>Kirim Pesan</span>
                                </button>

                                <p className="text-[10px] text-gray-600 text-center uppercase tracking-widest font-bold">
                                    * Tim kami akan merespons dalam 24-48 jam kerja.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
