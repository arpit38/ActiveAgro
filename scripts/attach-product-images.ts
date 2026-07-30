/**
 * Uploads product images from public/images into Sanity and attaches them
 * to the matching product document's `image` field.
 *
 * Matching is explicit (see IMAGE_MAP below) rather than fuzzy, so a
 * mis-named file can never silently land on the wrong product.
 *
 * Safe to re-run: re-uploading the same file reuses Sanity's asset
 * deduplication, and the product patch is idempotent.
 *
 * Usage:
 *   npx tsx scripts/attach-product-images.ts
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { createClient } from "next-sanity";

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
    } catch { /* ignore */ }
}
loadEnv();

const client = createClient({
    projectId: "8m0swnfc",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

// filename in public/images  →  product slug in Sanity
const IMAGE_MAP: Record<string, string> = {
    "active-chloro-50%-insecticide.png": "active-chloro-50-insecticide",
    "active-emida.png": "active-emida-systemic-insecticide",
    "active-fast.png": "active-fast-fertilizer",
    "active-hexa-pro-fungicide.png": "active-hexa-pro-systemic-fungicide",
    "active-hume.png": "active-hume-complete-nutrient-solution",
    "active-plus-plant-growth.png": "active-plus-complete-nutrient-solution",
    "active-pro-super-insecticide.png": "active-pro-super-insecticide",
    "active-quat-herbicide.png": "active-quat-non-selective-contact-herbicide",
};

async function run() {
    const imagesDir = resolve(__dirname, "..", "public", "images");
    let attached = 0;
    const failures: string[] = [];

    for (const [filename, slug] of Object.entries(IMAGE_MAP)) {
        const filePath = resolve(imagesDir, filename);

        if (!existsSync(filePath)) {
            failures.push(`${filename} — file not found on disk`);
            console.log(`  ❌ ${filename} — file not found`);
            continue;
        }

        // Find the target product by slug
        const product: { _id: string; name: string } | null = await client.fetch(
            `*[_type == "product" && slug.current == $slug][0]{ _id, name }`,
            { slug }
        );

        if (!product) {
            failures.push(`${filename} — no product with slug "${slug}"`);
            console.log(`  ❌ ${filename} — no product with slug "${slug}"`);
            continue;
        }

        // Upload the image as a Sanity asset
        const asset = await client.assets.upload("image", readFileSync(filePath), {
            filename,
        });

        // Attach it to the product
        await client
            .patch(product._id)
            .set({
                image: {
                    _type: "image",
                    asset: { _type: "reference", _ref: asset._id },
                },
            })
            .commit();

        attached++;
        console.log(`  ✅ ${filename}  →  ${product.name}`);
    }

    console.log(`\n🎉 Attached ${attached}/${Object.keys(IMAGE_MAP).length} images.`);
    if (failures.length) {
        console.log(`\n⚠️  Failures:`);
        for (const f of failures) console.log(`   - ${f}`);
    }
}

run().catch((err) => {
    console.error("❌ Failed:", err);
    process.exit(1);
});
