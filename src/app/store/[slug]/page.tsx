import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Star, MapPin, Phone, MessageCircle, Instagram, Clock, ArrowRight, Share2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const store = await prisma.store.findUnique({ where: { slug } });

    if (!store) return { title: "Toko Tidak Ditemukan" };

    return {
        title: `${store.name} - ${store.city} | Breeze Vape Directory`,
        description: store.description || `Lihat katalog, lokasi lengkap, dan review ${store.name} di kawasan ${store.province}.`,
        alternates: {
            canonical: `/store/${store.slug}`
        }
    };
}

export default async function StoreDetailPage({ params }: Props) {
    const { slug } = await params;
    const store = await prisma.store.findUnique({ where: { slug } });

    if (!store) notFound();

    // Fetch nearby stores in the same city
    const nearbyStores = await prisma.store.findMany({
        where: {
            city: store.city,
            NOT: { id: store.id }
        },
        take: 3,
    });

    // JSON-LD LocalBusiness Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": store.name,
        "image": store.imageUrl || store.logoUrl || "https://breezevapestore.com/default-store.jpg",
        "url": `https://breezevapestore.com/store/${store.slug}`,
        "telephone": store.phone || undefined,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": store.address || undefined,
            "addressLocality": store.city,
            "addressRegion": store.province,
            "addressCountry": "ID"
        },
        "geo": store.latitude && store.longitude ? {
            "@type": "GeoCoordinates",
            "latitude": store.latitude,
            "longitude": store.longitude
        } : undefined,
        "aggregateRating": store.rating > 0 ? {
            "@type": "AggregateRating",
            "ratingValue": store.rating.toString(),
            "reviewCount": store.reviewCount.toString()
        } : undefined
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] pb-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Header */}
            <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
                {store.imageUrl ? (
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${store.imageUrl})` }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/20 via-neon-cyan/10 to-transparent animate-pulse-glow" />
                )}
                <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent" />

                <div className="max-w-7xl mx-auto h-full flex flex-col justify-end px-6 pb-12 relative z-10">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Akun Terverifikasi
                        </span>
                        <div className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
                            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                            <span className="text-white text-xs font-bold">{store.rating} ({store.reviewCount} Ulasan)</span>
                        </div>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-orbitron font-extrabold text-white tracking-tighter mb-4 leading-tight break-words">
                        {store.name}
                    </h1>

                    <div className="flex items-center space-x-2 text-gray-400 font-space text-lg">
                        <MapPin className="w-5 h-5 text-neon-pink" />
                        <span>{store.city}, {store.province}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-6 relative z-20">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    {/* About Section - SEO Optimized */}
                    <section className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5">
                        <article className="prose prose-invert max-w-none mb-12">
                            <h2 className="text-3xl font-orbitron font-extrabold text-white mb-6 leading-tight">
                                Profil: {store.name}
                            </h2>

                            {store.description ? (
                                <p className="text-gray-300 text-lg leading-relaxed font-space mb-6 border-l-4 border-neon-cyan bg-neon-cyan/5 p-6 rounded-r-2xl">
                                    {store.description}
                                </p>
                            ) : (
                                <p className="text-gray-400 text-lg leading-relaxed font-space mb-6">
                                    <strong>{store.name}</strong> adalah salah satu vape store yang berlokasi di <strong>{store.city}, {store.province}</strong>.
                                    Jelajahi berbagai pilihan mod, pod, liquid, dan aksesoris vape berkualitas di toko ini.
                                </p>
                            )}

                            <h3 className="text-xl font-orbitron font-bold text-white mt-10 mb-4 uppercase tracking-widest">Akses & Lokasi</h3>
                            <p className="text-gray-400 text-lg leading-relaxed font-space mb-6">
                                Dapat dinavigasi dengan mudah, toko ini beralamat spesifik di <strong>{store.address || store.city}</strong>. Pastikan untuk mengecek ketersediaan jam operasional jika Anda berencana berkunjung secara langsung.
                            </p>

                            {store.rating > 0 && (
                                <>
                                    <h3 className="text-xl font-orbitron font-bold text-white mt-10 mb-4 uppercase tracking-widest">Ulasan Komunitas</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed font-space mb-6">
                                        Berdasarkan feedback dari komunitas vapers, <strong>{store.name}</strong> saat ini memiliki nilai <strong className="text-yellow-500">{store.rating}</strong> dari <strong className="text-yellow-500">{store.reviewCount} ulasan</strong>.
                                    </p>
                                </>
                            )}
                            <p className="text-gray-500 text-sm italic mt-8 font-space">
                                *Platform ini hanya bersifat direktori informatif—kami tidak melayani transaksi, khusus usia 21+.
                            </p>
                        </article>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-white/5">
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/20 shrink-0">
                                        <Clock className="w-5 h-5 text-neon-cyan" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-1">Jam Operasional</h4>
                                        <p className="text-gray-500 text-xs leading-relaxed">
                                            {store.openingHours || "Hubungi toko untuk informasi jam buka."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-10 h-10 rounded-xl bg-neon-pink/10 flex items-center justify-center border border-neon-pink/20 shrink-0">
                                        <Instagram className="w-5 h-5 text-neon-pink" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-1">Media Sosial</h4>
                                        <Link href={`https://instagram.com/${store.instagram?.replace('@', '')}`} className="text-neon-pink text-xs hover:underline decoration-2 underline-offset-4 font-bold tracking-widest uppercase break-all">
                                            {store.instagram || "@NotSet"}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {store.services && store.services !== "[]" && (
                            <div className="mt-12 pt-12 border-t border-white/5">
                                <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-4">FASILITAS LAYANAN</h4>
                                <div className="flex flex-wrap gap-2">
                                    {JSON.parse(store.services).map((service: string, i: number) => (
                                        <span key={i} className="px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-[10px] font-bold tracking-widest uppercase">
                                            {service}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Map Section */}
                    <section className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 h-[400px] flex flex-col overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-orbitron font-extrabold text-white tracking-tight">LOKASI</h2>
                            {store.googleMapsUrl && (
                                <Link href={store.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-neon-cyan text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 hover:underline">
                                    Buka Google Maps
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                            )}
                        </div>
                        <div className="flex-1 bg-dark-gray/50 rounded-3xl border border-white/5 flex items-center justify-center relative overflow-hidden group">
                            {store.latitude && store.longitude ? (
                                <>
                                    <iframe
                                        className="absolute inset-0 w-full h-full opacity-80 filter invert-[90%] hue-rotate-180 contrast-125 saturate-200"
                                        src={`https://maps.google.com/maps?q=${store.latitude},${store.longitude}&z=15&output=embed`}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                    {/* Neon Overlay */}
                                    <div className="absolute inset-0 pointer-events-none bg-neon-cyan/10 mix-blend-color" />
                                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]" />
                                </>
                            ) : (
                                <>
                                    <div className="absolute inset-0 bg-neon-cyan/5 group-hover:bg-neon-cyan/10 transition-colors" />
                                    <MapPin className="w-12 h-12 text-neon-cyan/20" />
                                    <span className="absolute bottom-6 text-gray-500 text-[10px] uppercase font-bold tracking-[0.3em] px-4 text-center">
                                        {store.address || "Peta tidak tersedia"}
                                    </span>
                                </>
                            )}
                        </div>
                    </section>
                </div>

                {/* Action Sidebar */}
                <div className="space-y-8">
                    <aside className="glass p-8 rounded-[2.5rem] border border-white/10 sticky top-28">
                        <h3 className="text-white font-orbitron font-bold text-sm uppercase tracking-widest mb-8 pb-4 border-b border-white/5">Hubungi Langsung</h3>

                        <div className="space-y-4">
                            {store.whatsapp && (
                                <Link
                                    href={store.whatsapp.startsWith('http') ? store.whatsapp : `https://wa.me/${store.whatsapp}`}
                                    className="w-full bg-green-500 text-black py-4 rounded-xl font-black tracking-widest uppercase text-xs flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all hover:scale-[1.02]"
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    <MessageCircle className="w-5 h-5 fill-black" />
                                    Chat WhatsApp
                                </Link>
                            )}
                            {store.phone && (
                                <Link
                                    href={`tel:${store.phone}`}
                                    className="w-full glass-cyan text-white py-4 rounded-xl font-black tracking-widest uppercase text-xs flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(0,245,255,0.2)] transition-all"
                                >
                                    <Phone className="w-5 h-5 text-neon-cyan" />
                                    Telepon Toko
                                </Link>
                            )}

                            <button className="w-full glass border-white/10 text-gray-400 py-4 rounded-xl font-bold tracking-widest uppercase text-[10px] flex items-center justify-center gap-3 hover:text-white transition-all">
                                <Share2 className="w-4 h-4" />
                                Bagikan
                            </button>
                        </div>

                        <div className="mt-12 space-y-6">
                            <h4 className="text-white font-bold text-xs uppercase tracking-widest font-orbitron">Sekitar Sini</h4>
                            <div className="space-y-4">
                                {nearbyStores.map((nearby) => (
                                    <Link
                                        key={nearby.id}
                                        href={`/store/${nearby.slug}`}
                                        className="flex items-center gap-4 group p-2 rounded-2xl hover:bg-white/5 transition-colors"
                                    >
                                        <div className="w-12 h-12 rounded-[10px] bg-[#1A1A1A] border border-white/5 flex items-center justify-center text-neon-pink font-bold group-hover:border-neon-pink/30 overflow-hidden shrink-0">
                                            {nearby.logoUrl || nearby.imageUrl ? (
                                                <img src={nearby.logoUrl || nearby.imageUrl || ''} alt={nearby.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                            ) : (
                                                nearby.name.charAt(0)
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm group-hover:text-neon-cyan transition-colors">{nearby.name}</div>
                                            <div className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">{nearby.city}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
