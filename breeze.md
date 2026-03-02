Project Name: Breeze Vape Store Directory
Domain: breezevapestore.com
Stack: Next.js + PostgreSQL
Builder: Antigravity
Data Source: CSV Import → Auto-generate Listing
Target Market: Indonesia (Nasional)
Positioning: Direktori Vapor Store paling modern & anak muda

1️⃣ PRODUCT CONTEXT
🎯 Objective

Mengubah breezevapestore.com menjadi:

Direktori vapor store Indonesia dengan desain modern, vapor-style, bold, nyentrik, dan youth-centric.

Bukan e-commerce.
Bukan blog utama.
Fokus: Discovery + SEO + Local Directory.

👥 Target User Persona
1. Casual Vaper (18–30 tahun)

Cari vape store terdekat

Cari store dengan liquid tertentu

Cek rating & jam buka

2. Heavy Vaper / Hobbyist

Cari toko dengan mod device premium

Cari toko dengan komunitas aktif

3. Traveler

Cari vape store di kota tertentu

💎 Unique Selling Proposition

Direktori vapor store khusus Indonesia

UI vapor aesthetic (dark neon)

SEO-friendly per kota

Mobile-first

Cepat & ringan

Data terstruktur

2️⃣ INFORMATION ARCHITECTURE
🌍 Main Structure
/
├── /directory
├── /city/[city-slug]
├── /province/[province-slug]
├── /store/[store-slug]
├── /about
├── /submit-store
📂 URL Strategy (SEO Optimized)
Kota
/vape-store-jakarta
/vape-store-surabaya
/vape-store-bandung
Provinsi
/vape-store-jawa-barat
Store Detail
/store/alpha-vape-jakarta
3️⃣ TECH STACK
Frontend

Next.js 14+ (App Router)

TypeScript

TailwindCSS

Framer Motion (animation)

Shadcn UI (optional)

Backend

Next.js Server Actions

PostgreSQL

Prisma ORM

Data Import

CSV parser

Seeder script

Antigravity local generation

Deployment

Vercel

Supabase (Postgres) / Neon

4️⃣ DATABASE SCHEMA (POSTGRESQL)
Table: stores
Field	Type	Description
id	UUID	Primary key
name	TEXT	Store name
slug	TEXT	SEO slug
address	TEXT	Full address
city	TEXT	City
province	TEXT	Province
phone	TEXT	Contact
whatsapp	TEXT	WA
latitude	FLOAT	Map
longitude	FLOAT	Map
rating	FLOAT	Average rating
review_count	INT	Total review
instagram	TEXT	IG link
description	TEXT	Store description
created_at	TIMESTAMP	Auto
Table: cities

| id | UUID |
| name | TEXT |
| slug | TEXT |
| province | TEXT |
| store_count | INT |

Table: provinces

| id | UUID |
| name | TEXT |
| slug | TEXT |
| store_count | INT |

5️⃣ CSV IMPORT STRUCTURE

CSV Format Example:

name,address,city,province,phone,whatsapp,latitude,longitude,instagram,description
Alpha Vape,JL Sudirman No 1,Jakarta,DKI Jakarta,08123,62812,-6.2,106.8,@alphavape,Best vape shop in Jakarta
Import Flow

Upload CSV

Validate required fields

Auto-generate:

slug

city slug

province slug

Insert ke DB

Update store_count otomatis

6️⃣ ANTIGRAVITY GENERATION FLOW

Karena kamu generate listing otomatis:

CSV → Parse → Generate static page per store

Generate page per city berdasarkan grouping

Generate page per province

Save as static pages di local Antigravity

Deploy

7️⃣ DESIGN SYSTEM (VERY IMPORTANT)
🎨 Visual Direction: “Cyber Vapor Neon”
Primary Colors

#0D0D0D (Deep black)

#1A1A1A (Dark gray)

#00F5FF (Neon cyan)

#FF00D4 (Neon pink)

#9D00FF (Purple accent)

✨ UI Style

Glassmorphism cards

Neon border glow

Hover effect with glow

Animated gradient background

Vapor/smoke subtle animation

Bold typography

🖋 Typography

Heading: Space Grotesk / Orbitron

Body: Inter

💡 Homepage Concept

Hero section:

FIND YOUR VAPE STORE NEAR YOU
🔥 Discover 1000+ Vapor Stores Across Indonesia

Search bar besar neon glow.

Below:

Popular Cities

Featured Stores

Recently Added

8️⃣ STORE DETAIL PAGE STRUCTURE
[ Store Name ]
Rating ⭐ 4.7 (120 reviews)

📍 Address
📞 Contact
📱 WhatsApp Button

📝 Description

📸 Gallery (future feature)

📌 Map Embed

🔥 Nearby Stores
9️⃣ SEO STRATEGY
On Page SEO

Title:

Alpha Vape Jakarta - Vape Store Terdekat & Terlengkap

Meta Description:

Alpha Vape Jakarta adalah toko vapor terpercaya di Jakarta. Cek alamat, nomor WA, jam buka, dan lokasi lengkapnya di Breeze Vape Directory.
Programmatic SEO Pages

vape-store-[city]

vape-store-[province]

store-[slug]

Schema Markup

Gunakan:

LocalBusiness

Store

AggregateRating

🔟 PERFORMANCE OPTIMIZATION

Static generation (SSG)

ISR untuk city pages

Image optimization

Lazy load components

Database indexing:

city

province

slug

1️⃣1️⃣ MONETIZATION STRATEGY (Future)

Featured listing

Top of city placement

Ads banner

Sponsored store

Claim listing premium

1️⃣2️⃣ FUTURE FEATURES ROADMAP
Phase 2

User review system

Login user

Store claim

Submission form auto approval

Phase 3

Vape event directory

Vape community listing

Vape brand directory

1️⃣3️⃣ SECURITY & COMPLIANCE (PENTING)

Karena vape termasuk produk regulasi:

Tambahkan Age Disclaimer:

18+ Only Website

Disclaimer:

Informasi hanya direktori toko, bukan penjualan produk.
1️⃣4️⃣ PROJECT FOLDER STRUCTURE (Next.js)
/app
  /store/[slug]
  /city/[slug]
  /province/[slug]
  /submit-store
/components
/lib
/prisma
/styles