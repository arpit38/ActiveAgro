/**
 * Seed script: Deletes ALL existing products & categories from Sanity,
 * then re-seeds from the products.ts data file.
 *
 * Usage:
 *   npx tsx scripts/seed-sanity.ts
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "next-sanity";
import { categories, products } from "../src/data/products";

// Load .env.local manually (Next.js doesn't run here)
function loadEnv() {
    try {
        const envPath = resolve(__dirname, "..", ".env.local");
        const envContent = readFileSync(envPath, "utf-8");
        for (const line of envContent.split("\n")) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith("#")) continue;
            const eqIndex = trimmed.indexOf("=");
            if (eqIndex === -1) continue;
            const key = trimmed.slice(0, eqIndex);
            const value = trimmed.slice(eqIndex + 1);
            if (!process.env[key]) process.env[key] = value;
        }
    } catch { /* ignore if file doesn't exist */ }
}
loadEnv();

const client = createClient({
    projectId: "8m0swnfc",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

async function deleteAll() {
    console.log("🗑️  Deleting ALL existing products...");
    const productIds: { _id: string }[] = await client.fetch(`*[_type == "product"]{ _id }`);
    for (const { _id } of productIds) {
        await client.delete(_id);
    }
    console.log(`   Deleted ${productIds.length} products.`);

    console.log("🗑️  Deleting ALL existing categories...");
    const categoryIds: { _id: string }[] = await client.fetch(`*[_type == "category"]{ _id }`);
    for (const { _id } of categoryIds) {
        await client.delete(_id);
    }
    console.log(`   Deleted ${categoryIds.length} categories.\n`);
}

async function seed() {
    console.log("🌱 Re-seeding Sanity with real product data...\n");

    // 1. Delete everything first
    await deleteAll();

    // 2. Create categories
    console.log(`📂 Creating ${categories.length} categories...`);
    const categoryMap: Record<string, string> = {};

    for (const cat of categories) {
        const doc = await client.createOrReplace({
            _id: `category-${cat.slug}`,
            _type: "category",
            name: cat.name,
            slug: { _type: "slug", current: cat.slug },
            description: cat.description,
        });
        categoryMap[cat.slug] = doc._id;
        console.log(`  ✅ ${cat.name} → ${doc._id}`);
    }

    // 3. Create products
    console.log(`\n📦 Creating ${products.length} products...`);

    for (const prod of products) {
        await client.createOrReplace({
            _id: `product-${prod.slug}`,
            _type: "product",
            name: prod.name,
            slug: { _type: "slug", current: prod.slug },
            category: {
                _type: "reference",
                _ref: categoryMap[prod.categorySlug],
            },
            activeIngredient: prod.activeIngredient,
            packaging: prod.packaging,
            description: prod.description,
            targetPests: prod.targetPests || undefined,
            targetDiseases: prod.targetDiseases || undefined,
            targetWeeds: prod.targetWeeds || undefined,
            targetEffect: prod.targetEffect || undefined,
            purpose: prod.purpose || undefined,
            crops: prod.crops,
            features: prod.features,
            dosage: prod.dosage,
            applicationMethod: prod.applicationMethod,
            faqs: prod.faqs.map((faq) => ({
                _type: "object",
                _key: Math.random().toString(36).slice(2, 10),
                question: faq.question,
                answer: faq.answer,
            })),
            isFeatured: prod.isFeatured || false,
        });
        console.log(`  ✅ ${prod.name}`);
    }

    console.log(`\n🎉 Seeding complete! ${products.length} products across ${categories.length} categories.`);
}

seed().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
