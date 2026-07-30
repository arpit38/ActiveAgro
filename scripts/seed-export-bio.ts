/**
 * Seed script: Creates "Export Product" and "Bio-Pesticide" documents in
 * Sanity from the data that used to be hardcoded in
 * src/app/export/page.tsx and src/app/bio-pesticides/page.tsx.
 *
 * Safe to re-run — uses deterministic IDs (createOrReplace), so it won't
 * create duplicates. Existing edits made in Studio to these same
 * documents WILL be overwritten if you re-run this after seeding.
 *
 * Usage:
 *   npx tsx scripts/seed-export-bio.ts
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "next-sanity";

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

function slugify(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80);
}

// ─── Export products, grouped by category (matches the printed sheet) ──
const exportCatalogue: Record<string, string[]> = {
    Herbicides: [
        "2,4-D Amine Salt 58% S.L.",
        "2,4-D Ethyl Ester 20% W.P. (containing 2,4-D Acid 18% W/W)",
        "2,4-D Ethyl Ester 38% E.C. (having 2,4-D Acid 34% W/W)",
        "Atrazine 50% W.P.",
        "Bispyribac Sodium 10% W/V SC",
        "Butachlor 50% EC",
        "Butachlor 50% EW",
        "Clodinafop-Propargyl 15% WP",
        "Clodinafop Propargyl 9% + Metribuzin 20% WP",
        "Glufosinate Ammonium 13.5% W/W SL",
        "Metribuzin 70% W.P.",
        "Metsulfuron Methyl 20% W.P.",
        "Paraquat Dichloride 24% SL",
        "Pendimethalin 30% EC",
        "Pendimethalin 38.7% CS",
        "Pinoxaden 5.1% EC for Indigenous Manufacture",
        "Pretilachlor 37% W/W EW",
        "Pretilachlor 50% E.C.",
        "Pyroxasulfone 85% WG",
        "Sulfosulfuron 75% + Metsulfuron Methyl 5% WG",
        "Sulfosulfuron 75% WG",
        "Tembotrione 34.4% W/W SC",
        "Metsulfuron Methyl 20% WG",
    ],
    Fungicides: [
        "Azoxystrobin 11% + Tebuconazole 18.3% W/W SC",
        "Azoxystrobin 18.2% W/W + Difenoconazole 11.4% W/W SC for IM",
        "Azoxystrobin 23% SC for Indigenous Manufacture",
        "Carbendazim 12% + Mancozeb 63% WP",
        "Carbendazim 46.27% SC",
        "Cymoxanil 8% + Mancozeb 64% WP",
        "Pencycuron 22.9% SC",
        "Propineb 70% WP",
        "Sulphur 80% WDG",
        "Tebuconazole 10% + Sulphur 65% WG",
        "Tebuconazole 2% DS",
        "Tebuconazole 25.9% E.C.",
        "Tebuconazole 50% + Trifloxystrobin 25% WG",
        "Tebuconazole 6.7% + Captan 26.9% W/W SC",
        "Thiophanate Methyl 70% WP",
        "Mancozeb 75% WP",
        "Captan 70% + Hexaconazole 5% WP",
    ],
    Insecticides: [
        "Acephate 95% SG (W/W)",
        "Bifenthrin 10% EC W/W",
        "Bifenthrin 2.5% EC",
        "Carbofuran 3% C.G.",
        "Cartap Hydrochloride 4% GR",
        "Chlorantraniliprole 18.5% W/W SC",
        "Chlorantraniliprole 8.8% + Thiamethoxam 17.5% SC",
        "Chlorantraniliprole 9.3% + Lambdacyhalothrin 4.6% ZC",
        "Chlorpyrifos 50% E.C.",
        "Chlorpyriphos 1.5% D.P.",
        "Chlorpyriphos 20% E.C.",
        "Chlorpyriphos 50% + Cypermethrin 5% EC",
        "Dinotefuran 15% + Pymetrozine 45% WG",
        "Dinotefuran 20% W/W SG",
        "Emamectin Benzoate 1.9% EC",
        "Fipronil 0.3% G.R.",
        "Fipronil 0.6% W/W GR",
        "Flubendiamide 39.35% M/M SC",
        "Imidacloprid 17.8% SL",
        "Imidacloprid 30.5% SC",
        "Novaluron 5.25% + Emamectin Benzoate 0.9% W/W SC",
        "Novaluron 5.25% + Indoxacarb 4.5% W/W SC",
        "Pymetrozine 50% WG",
        "Pyriproxyfen 5% + Diafenthiuron 25% SE",
        "Thiamethoxam 25% WG",
        "Thiamethoxam 30% FS",
        "Thiamethoxam 75% W/W SG",
        "Emamectin Benzoate 5% SG",
        "Profenofos 40% + Cypermethrin 4% E.C.",
    ],
    "Plant Growth Regulators": ["Gibberellic Acid 0.001% L"],
};

// ─── Bio-pesticide products (microbials + humic/fulvic biostimulants) ──
const bioPesticideCatalogue: string[] = [
    "Helicoverpa armigera",
    "Verticillium lecanii",
    "Metarhizium anisopliae",
    "NPV of Helicoverpa armigera",
    "Pseudomonas fluorescens",
    "Beauveria bassiana",
    "Bacillus thuringiensis",
    "Bacillus thuringiensis var. israelensis",
    "Trichoderma viride",
    "Humalite 100% (Granular Powder)",
    "Humic Acid and Fulvic Acid 19.5% (Liquid)",
    "Humalite 82% (Powder)",
    "Humic Acid and Fulvic Acid 85% (Powder)",
    "Humic Substance 16% (Liquid)",
    "Humic Substances 6% (Liquid)",
    "Humic Acid 0.27% (Liquid)",
    "Humic Acid 1% (Liquid)",
    "Humic Substances 1.5% (Granule)",
    "Humic Acids 40% (Powder)",
    "Humic Acid 1.2% (Granules)",
    "Humic Acid 4% (Liquid)",
];

async function seedExportProducts() {
    console.log("📦 Seeding Export Products...\n");
    let count = 0;
    for (const [category, names] of Object.entries(exportCatalogue)) {
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            const id = `export-product-${slugify(category)}-${slugify(name)}`;
            await client.createOrReplace({
                _id: id,
                _type: "exportProduct",
                name,
                category,
                order: i,
            });
            count++;
            console.log(`  ✅ [${category}] ${name}`);
        }
    }
    console.log(`\n🎉 Seeded ${count} export products.\n`);
}

async function seedBioPesticides() {
    console.log("🌱 Seeding Bio-Pesticides...\n");
    for (let i = 0; i < bioPesticideCatalogue.length; i++) {
        const name = bioPesticideCatalogue[i];
        const id = `bio-pesticide-${slugify(name)}`;
        await client.createOrReplace({
            _id: id,
            _type: "bioPesticide",
            name,
            order: i,
        });
        console.log(`  ✅ ${name}`);
    }
    console.log(`\n🎉 Seeded ${bioPesticideCatalogue.length} bio-pesticide products.\n`);
}

async function seed() {
    await seedExportProducts();
    await seedBioPesticides();
    console.log("✅ All done!");
}

seed().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
