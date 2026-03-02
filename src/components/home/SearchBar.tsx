"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/directory?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink rounded-xl blur opacity-25 group-focus-within:opacity-75 transition-opacity duration-1000"></div>
            <div className="relative flex items-center glass border border-white/10 rounded-xl overflow-hidden px-4">
                <Search className="w-5 h-5 text-gray-400 group-focus-within:text-neon-cyan transition-colors" />
                <input
                    type="text"
                    placeholder="Cari Toko Vapor (cth: Jakarta, Alpha Vape...)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-white py-4 px-4 text-lg font-space outline-none placeholder:text-gray-500"
                />
                <button
                    type="submit"
                    className="hidden md:block bg-neon-cyan text-black px-8 py-2 rounded-lg font-bold hover:shadow-[0_0_15px_rgba(0,245,255,0.6)] transition-all ml-2"
                >
                    CARI
                </button>
            </div>
        </form>
    );
}
