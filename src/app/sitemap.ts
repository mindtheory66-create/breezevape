import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

// Force dynamic agar sitemap selalu mengambil data terbaru dari database
// dan tidak di-cache saat build time (yang menyebabkan store tidak muncul).
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://breezevapestore.com'

    const staticRoutes = ['', '/directory', '/about', '/submit-store', '/privacy', '/terms', '/disclaimer'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.9,
    }))

    try {
        const [stores, cities, provinces] = await Promise.all([
            prisma.store.findMany({ select: { slug: true, updatedAt: true } }),
            prisma.city.findMany({ select: { slug: true } }),
            prisma.province.findMany({ select: { slug: true } }),
        ])

        const storeUrls = stores.map((store) => ({
            url: `${baseUrl}/store/${store.slug}`,
            lastModified: store.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))

        const cityUrls = cities.map((city) => ({
            url: `${baseUrl}/city/${city.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))

        const provinceUrls = provinces.map((province) => ({
            url: `${baseUrl}/province/${province.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }))

        return [...staticRoutes, ...provinceUrls, ...cityUrls, ...storeUrls]
    } catch (error) {
        console.error('Sitemap: Gagal mengambil data dari database', error)
        // Fallback: kembalikan hanya halaman statis agar sitemap tidak error
        return staticRoutes
    }
}
