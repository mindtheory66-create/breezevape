import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const stores = await prisma.store.findMany({ select: { slug: true, updatedAt: true } })
    const cities = await prisma.city.findMany({ select: { slug: true } })
    const provinces = await prisma.province.findMany({ select: { slug: true } })

    const baseUrl = 'https://breezevapestore.com'

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

    const routes = ['', '/directory', '/about', '/submit-store', '/privacy', '/terms', '/disclaimer'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.9,
    }))

    return [...routes, ...provinceUrls, ...cityUrls, ...storeUrls]
}
