import Hero from "@/components/home/Hero";
import CityGrid from "@/components/home/CityGrid";
import StoreGrid from "@/components/home/StoreGrid";
import Link from "next/link";
import { ArrowRight, Zap, Target, TrendingUp } from "lucide-react";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://breezevapestore.com/#website",
        "url": "https://breezevapestore.com/",
        "name": "Breeze Vape Directory",
        "description": "Cari toko vapor terbaik dengan Breeze Vape Directory. Direktori toko vape modern, nyentrik, dan youth-centric pertama di Indonesia.",
        "potentialAction": [{
          "@type": "SearchAction",
          "target": { "@type": "EntryPoint", "urlTemplate": "https://breezevapestore.com/directory?q={search_term_string}" },
          "query-input": "required name=search_term_string"
        }],
        "inLanguage": "id"
      },
      {
        "@type": "Organization",
        "@id": "https://breezevapestore.com/#organization",
        "name": "Breeze Vape Directory",
        "url": "https://breezevapestore.com/",
        "sameAs": [
          "https://instagram.com/breezevapestore"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "hello@breezevapestore.com"
          }
        ]
      }
    ]
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />

      {/* City Section */}
      <CityGrid />

      {/* Feature Section 1 */}
      <section className="py-24 px-6 glass glass-cyan border-y border-white/5 mx-6 md:mx-12 lg:mx-24 rounded-[3rem] my-12 relative overflow-hidden group">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neon-cyan/5 border border-neon-cyan/10 text-neon-cyan text-[10px] font-bold tracking-widest uppercase mb-8">
              <Zap className="w-3 h-3" />
              <span>Pencarian Masa Depan</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-orbitron font-extrabold text-white mb-8 leading-tight">
              DIREKTORI <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan italic">BREEZE</span> <br />
              VAPE
            </h2>
            <p className="text-gray-400 text-lg font-space leading-relaxed mb-10 max-w-2xl">
              Direktori vapor terlengkap dan termodern di Indonesia. Kami membantu Anda menemukan toko terbaik, liquid terbaru, dan komunitas paling aktif di kota Anda.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 flex items-center justify-center p-0.5 border border-neon-cyan/20">
                  <Target className="w-5 h-5 text-neon-cyan" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-2 font-orbitron">Toko Terverifikasi</h4>
                  <p className="text-gray-500 text-xs">Semua toko yang terdaftar telah dikurasi dan diverifikasi oleh pakar komunitas kami.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-neon-pink/10 flex items-center justify-center p-0.5 border border-neon-pink/20">
                  <TrendingUp className="w-5 h-5 text-neon-pink" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-2 font-orbitron">Nadi Komunitas</h4>
                  <p className="text-gray-500 text-xs">Tetap update dengan tren terbaru dan tempat nongkrong asik di dunia vaping.</p>
                </div>
              </div>
            </div>
            <Link href="/about" className="group/btn relative px-8 py-4 bg-white text-black font-extrabold tracking-widest uppercase text-xs inline-flex items-center space-x-3 rounded hover:bg-neon-cyan transition-all">
              <span>Pelajari Misi Kami</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="flex-1 hidden md:block group-hover:scale-105 transition-transform duration-1000">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-tr from-neon-purple/20 via-neon-cyan/20 to-neon-pink/20 rounded-full blur-[60px] animate-pulse-glow" />
              <div className="relative w-full h-full glass border border-white/10 rounded-full flex items-center justify-center">
                <div className="w-4/5 h-4/5 glass border border-neon-cyan/20 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                  <div className="w-1/4 h-2 bg-neon-cyan rounded-full absolute top-10" />
                  <div className="w-1/4 h-2 bg-neon-pink rounded-full absolute bottom-10" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-orbitron font-black text-white italic tracking-tighter scale-150">BREEZE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Section */}
      <StoreGrid />

      {/* Final CTA */}
      <section className="py-32 px-6 text-center relative overflow-hidden bg-[#0D0D0D]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square bg-neon-purple/5 blur-[120px] -z-10" />
        <span className="text-neon-cyan font-bold text-[10px] tracking-[0.5em] uppercase mb-8 inline-block">Gabung Evolusi Ini</span>
        <h2 className="text-4xl md:text-7xl font-orbitron font-extrabold text-white mb-12 tracking-tighter leading-tight">
          TOKO KAMU HARUSNYA <br /> <span className="text-neon-pink">ADA DI SINI</span>
        </h2>
        <Link href="/submit-store" className="bg-neon-cyan text-black px-12 py-5 rounded-lg font-black tracking-[0.2em] uppercase text-sm hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all inline-block hover:scale-105">
          Daftarkan Toko Sekarang
        </Link>
      </section>
    </div>
  );
}
