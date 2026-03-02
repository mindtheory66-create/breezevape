"use client";

import Link from "next/link";
import { Search, Info, PlusCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2 group">
        <img
          src="/Breeze vape.png"
          alt="Breeze Vape Logo"
          className="h-10 md:h-14 lg:h-16 w-auto object-contain group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(0,245,255,0.5)] transition-all"
        />
      </Link>

      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/directory" className="text-sm font-medium text-gray-400 hover:text-neon-cyan transition-colors flex items-center space-x-1.5">
          <Search className="w-4 h-4" />
          <span>Direktori</span>
        </Link>
        <Link href="/submit-store" className="text-sm font-medium text-gray-400 hover:text-neon-pink transition-colors flex items-center space-x-1.5">
          <PlusCircle className="w-4 h-4" />
          <span>Daftar Toko</span>
        </Link>
        <Link href="/about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center space-x-1.5">
          <Info className="w-4 h-4" />
          <span>Tentang Kami</span>
        </Link>
      </nav>

      <div className="flex items-center space-x-4">
        <button className="md:hidden text-gray-400 hover:text-white transition-colors">
          <Search className="w-6 h-6" />
        </button>
        <Link href="/submit-store" className="bg-neon-cyan text-[#0D0D0D] px-3 py-1.5 md:px-4 md:py-2 rounded font-bold text-[10px] md:text-sm tracking-wider hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all">
          DAFTAR SEKARANG
        </Link>
      </div>
    </header>
  );
}
