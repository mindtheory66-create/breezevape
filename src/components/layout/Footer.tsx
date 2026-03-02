import Link from "next/link";
import { Instagram, MapPin, Phone, Mail, Search, Info, PlusCircle } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0D0D0D] border-t border-white/5 py-16 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 relative z-10">
                <div className="lg:col-span-4">
                    <Link href="/" className="flex items-center space-x-2 mb-6 group">
                        <img
                            src="/Breeze vape.png"
                            alt="Breeze Vape Logo"
                            className="h-16 md:h-20 lg:h-24 w-auto object-contain group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(0,245,255,0.5)] transition-all"
                        />
                    </Link>
                    <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
                        Direktori Toko Vapor terkemuka di Indonesia untuk kaum modern dan muda. Temukan 1000+ toko vapor di seluruh negeri dengan Breeze Vape Directory.
                    </p>
                    <div className="flex items-center space-x-4">
                        <Link href="https://instagram.com" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-neon-pink hover:border-neon-pink transition-all">
                            <Instagram className="w-5 h-5" />
                        </Link>
                        <Link href="mailto:contact@breezevapestore.com" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan transition-all">
                            <Mail className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                <div className="lg:col-span-2 flex flex-col space-y-5">
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2 font-orbitron">Jelajahi</h4>
                    <Link href="/directory" className="text-gray-400 hover:text-neon-cyan transition-colors text-sm flex items-center space-x-2">
                        <Search className="w-4 h-4" />
                        <span>Temukan Toko</span>
                    </Link>
                    <Link href="/submit-store" className="text-gray-400 hover:text-neon-pink transition-colors text-sm flex items-center space-x-2">
                        <PlusCircle className="w-4 h-4" />
                        <span>Daftarkan Toko</span>
                    </Link>
                    <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center space-x-2">
                        <Info className="w-4 h-4" />
                        <span>Tentang Kami</span>
                    </Link>
                    <Link href="/contact" className="text-gray-400 hover:text-neon-cyan transition-colors text-sm flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>Hubungi Kami</span>
                    </Link>
                </div>

                <div className="lg:col-span-2 flex flex-col space-y-5">
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2 font-orbitron">Legal</h4>
                    <Link href="/terms" className="text-gray-500 hover:text-white transition-colors text-[11px] uppercase tracking-wider">Syarat & Ketentuan</Link>
                    <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors text-[11px] uppercase tracking-wider">Kebijakan Privasi</Link>
                    <Link href="/disclaimer" className="text-gray-500 hover:text-white transition-colors text-[11px] uppercase tracking-wider">Disclaimer</Link>
                </div>

                <div className="lg:col-span-4 flex flex-col space-y-5">
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2 font-orbitron">Breeze Directory</h4>
                    <div className="text-gray-400 text-sm flex items-start space-x-2">
                        <MapPin className="w-4 h-4 mt-0.5 text-neon-cyan" />
                        <span>Indonesia (Nasional)</span>
                    </div>
                    <div className="text-gray-400 text-sm flex items-start space-x-2">
                        <Phone className="w-4 h-4 mt-0.5 text-neon-pink" />
                        <span>Jakarta, Surabaya, Bandung</span>
                    </div>
                    <div className="mt-6 p-3 glass glass-pink rounded-lg border border-neon-pink/20">
                        <p className="text-[10px] text-gray-400 leading-tight">
                            <span className="text-neon-pink font-bold">DISCLAIMER:</span> Ini hanya platform direktori. Kami tidak menjual produk yang diatur. Khusus 21+.
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto border-t border-white/5 mt-16 pt-8 text-center relative z-10">
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">
                    &copy; 2026 BREEZE VAPE STORE DIRECTORY — INDONESIA
                </p>
            </div>
            {/* Decorative gradient backgrounds */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 blur-[100px] -z-10 rounded-full" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-cyan/5 blur-[100px] -z-10 rounded-full" />
        </footer>
    );
}
