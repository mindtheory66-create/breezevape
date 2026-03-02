import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Daftarkan Toko Vapor - Breeze Vape Directory",
    description: "Tambahkan vape store Anda secara gratis di Breeze Vape Directory, dan jangkau lebih banyak pelanggan potensial di seluruh Indonesia.",
};

export default function SubmitStoreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Daftarkan Toko Vapor di Breeze Vape Directory",
        "url": "https://breezevapestore.com/submit-store",
        "description": "Formulir pendaftaran gratis untuk vape store di Indonesia.",
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
