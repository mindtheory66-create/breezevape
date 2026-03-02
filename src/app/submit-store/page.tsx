"use client";

import { useState } from "react";
import { PlusCircle, CheckCircle2, Store, MapPin, Phone, Instagram, Send, Info } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function SubmitStorePage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setLoading(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full glass glass-cyan p-12 rounded-[3.5rem] border border-neon-cyan/20 text-center"
                >
                    <div className="w-20 h-20 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="w-10 h-10 text-neon-cyan" />
                    </div>
                    <h1 className="text-3xl font-orbitron font-extrabold text-white mb-6">BERHASIL!</h1>
                    <p className="text-gray-400 font-space mb-10 leading-relaxed">
                        Terima kasih! Pengajuan toko Anda telah kami terima. Tim kami akan memverifikasi detailnya dan segera menampilkannya di direktori.
                    </p>
                    <Link href="/" className="bg-neon-cyan text-black px-10 py-4 rounded-xl font-black tracking-widest uppercase text-xs inline-block shadow-[0_0_20px_rgba(0,245,255,0.3)]">
                        Kembali ke Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0D0D0D] pt-24 md:pt-32 pb-32 md:pb-48 px-6 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-pink/5 blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-cyan/5 blur-[120px] -z-10 animate-pulse" />

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-20">
                    <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-[10px] font-bold tracking-widest uppercase mb-6">
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Perluas Jaringan</span>
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-orbitron font-extrabold text-white mb-8 tracking-tighter leading-tight break-words">
                        DAFTARKAN <span className="text-neon-pink italic">TOKO ANDA</span>
                    </h1>
                    <p className="text-gray-400 text-lg font-space max-w-2xl mx-auto leading-relaxed">
                        Daftarkan bisnis vapor kamu di platform direktori modern paling nge-hits di Indonesia. Dapatkan visibilitas lebih dan jangkau lebih banyak pelanggan.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Instructions */}
                    <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
                        <div className="glass p-8 rounded-3xl border border-white/5">
                            <h3 className="text-white font-orbitron font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
                                <Info className="w-4 h-4 text-neon-cyan" />
                                <span>Kenapa Daftar?</span>
                            </h3>
                            <ul className="space-y-6">
                                {[
                                    "Visibilitas gratis ke 10rb+ vaper bulanan",
                                    "Status terverifikasi untuk kepercayaan",
                                    "Meningkatkan SEO lokal bisnis Anda",
                                    "Koneksi langsung via WhatsApp",
                                ].map((text, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-neon-cyan/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                                        </div>
                                        <span className="text-gray-400 text-sm font-space">{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-8 rounded-3xl border border-neon-pink/10 bg-neon-pink/5">
                            <p className="text-[10px] text-neon-pink font-bold leading-relaxed tracking-widest uppercase italic">
                                * Semua pengajuan akan ditinjau dalam 24-48 jam. Pastikan toko Anda berlokasi fisik di Indonesia.
                            </p>
                        </div>
                    </div>

                    {/* Submission Form */}
                    <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6 order-1 lg:order-2">
                        <div className="glass p-8 md:p-10 rounded-[3rem] border border-white/10 shadow-2xl space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Nama Toko</label>
                                <div className="relative group">
                                    <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-neon-cyan transition-colors" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Vapor Wave Jakarta"
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/20 transition-all font-space"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Kota</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Jakarta"
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-neon-cyan transition-all font-space"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Provinsi</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. DKI Jakarta"
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-neon-cyan transition-all font-space"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Alamat Lengkap</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-600" />
                                    <textarea
                                        required
                                        placeholder="Jl. Raya Utama No. 123..."
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon-cyan transition-all font-space min-h-[100px]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Nomor WhatsApp</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-neon-cyan transition-colors" />
                                        <input
                                            required
                                            type="text"
                                            placeholder="628123456789"
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon-cyan transition-all font-space"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Instagram (@)</label>
                                    <div className="relative group">
                                        <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-neon-pink transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="@yourstore"
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon-pink transition-all font-space"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex items-start gap-3">
                                <input
                                    required
                                    type="checkbox"
                                    id="privacy-consent"
                                    className="mt-1 w-4 h-4 rounded border-white/10 bg-black/40 text-neon-cyan focus:ring-neon-cyan focus:ring-offset-0"
                                />
                                <label htmlFor="privacy-consent" className="text-[10px] text-gray-500 font-space leading-relaxed uppercase tracking-tighter">
                                    Saya menyetujui <Link href="/terms" className="text-neon-cyan hover:underline">Syarat & Ketentuan</Link> dan <Link href="/privacy" className="text-neon-pink hover:underline">Kebijakan Privasi</Link>, serta mengonfirmasi bahwa toko ini berlokasi di Indonesia.
                                </label>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-neon-cyan text-black py-5 rounded-2xl font-black tracking-[0.2em] uppercase text-sm hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all hover:scale-[1.01] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-wait"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Kirim Pengajuan Toko
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
