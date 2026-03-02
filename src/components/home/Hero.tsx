"use client";

import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

export default function Hero() {
    return (
        <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 px-6 overflow-hidden min-h-[80vh] flex flex-col items-center justify-center">
            {/* Background Animated Atmosphere */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neon-cyan/10 blur-[150px] -z-10 animate-pulse-glow" />
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-neon-purple/5 blur-[120px] -z-10 animate-pulse-glow [animation-delay:2s]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-4xl mx-auto"
            >
                <span className="inline-block px-4 py-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
                    Direktori Untuk Vaper Modern
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-orbitron font-extrabold tracking-tighter text-white mb-6 leading-tight">
                    TEMUKAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple">VIBE</span> <br />
                    TOKO VAPOR TERDEKAT
                </h1>
                <p className="text-gray-400 text-lg md:text-xl font-space max-w-2xl mx-auto mb-12">
                    🔥 Jelajahi <span className="text-neon-cyan font-bold italic">1000+</span> Toko Vapor di Indonesia. <br />
                    Dibuat untuk anak muda, didesain untuk pencarian yang gaya.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="w-full"
            >
                <SearchBar />
            </motion.div>

            {/* Stats / Badges */}
            <div className="mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-16">
                {[
                    { label: "TOKO", value: "1200+" },
                    { label: "KOTA", value: "45+" },
                    { label: "PROVINSI", value: "12" },
                ].map((stat, i) => (
                    <div key={i} className="text-center">
                        <div className="text-3xl md:text-4xl font-orbitron font-extrabold text-white mb-1">{stat.value}</div>
                        <div className="text-[10px] tracking-[0.4em] font-bold text-neon-cyan opacity-80 uppercase">{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
