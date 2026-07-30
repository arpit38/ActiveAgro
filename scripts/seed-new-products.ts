/**
 * Creates the 12 products whose images existed in public/images but which
 * had no matching document in Sanity. Product data is drawn from each
 * label's stated active ingredient plus standard agronomic references for
 * that molecule. Also uploads + attaches each product's image.
 *
 * Idempotent: deterministic _ids (createOrReplace) + Sanity asset dedupe.
 *
 * Usage:
 *   npx tsx scripts/seed-new-products.ts
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

const CATEGORY_REF: Record<string, string> = {
    insecticide: "category-agriculture-insecticide",
    fungicide: "category-agriculture-fungicide",
    herbicide: "category-agriculture-herbicide",
    pgr: "category-plant-growth-promoter",
};

interface NewProduct {
    slug: string;
    name: string;
    categoryName: string;
    categoryKey: keyof typeof CATEGORY_REF;
    image: string; // filename in public/images
    activeIngredient: string;
    packaging: string[];
    description: string;
    targetPests?: string;
    targetDiseases?: string;
    targetWeeds?: string;
    purpose?: string;
    crops: string;
    features: string[];
    dosage: string;
    applicationMethod: string;
    faqs: { question: string; answer: string }[];
}

const products: NewProduct[] = [
    {
        slug: "active-ban-insecticide",
        name: "Active Ban Insecticide",
        categoryName: "Agriculture Insecticide",
        categoryKey: "insecticide",
        image: "active-ban-insecticide.png",
        activeIngredient: "Chlorpyrifos 20% EC",
        packaging: ["250 ml", "500 ml", "1 L", "5 L"],
        description:
            "A broad-spectrum organophosphate insecticide with contact, stomach and fumigant action, effective against a wide range of soil and foliar pests.",
        targetPests: "Termites, Stem borer, Cutworms, Root grubs, Aphids",
        crops: "Paddy, Cotton, Sugarcane, Groundnut, Vegetables",
        features: [
            "Contact, stomach and fumigant action",
            "Excellent soil pest control",
            "Broad spectrum activity",
            "Economical pest management",
        ],
        dosage: "2-2.5 ml per liter of water (foliar); 4-5 L per acre (soil)",
        applicationMethod: "Foliar spray or soil application",
        faqs: [
            {
                question: "Is it effective against termites?",
                answer: "Yes, Chlorpyrifos is widely used for termite and soil-borne pest management.",
            },
        ],
    },
    {
        slug: "active-cyper-10-insecticide",
        name: "Active Cyper 10% Insecticide",
        categoryName: "Agriculture Insecticide",
        categoryKey: "insecticide",
        image: "active-cyper-10%-insecticide.png",
        activeIngredient: "Cypermethrin 10% EC",
        packaging: ["100 ml", "250 ml", "500 ml", "1 L"],
        description:
            "A synthetic pyrethroid insecticide providing fast knockdown and repellent action against chewing and sucking pests across many crops.",
        targetPests: "Bollworm, Aphids, Jassids, Thrips, Caterpillars",
        crops: "Cotton, Vegetables, Pulses, Cereals",
        features: [
            "Fast knockdown action",
            "Repellent effect on pests",
            "Broad spectrum control",
            "Cost-effective",
        ],
        dosage: "1-1.5 ml per liter of water",
        applicationMethod: "Foliar spray",
        faqs: [
            {
                question: "How quickly does it act?",
                answer: "Being a pyrethroid, it provides rapid contact knockdown of target pests.",
            },
        ],
    },
    {
        slug: "active-cyper-25-insecticide",
        name: "Active Cyper 25% Insecticide",
        categoryName: "Agriculture Insecticide",
        categoryKey: "insecticide",
        image: "active-cyper-25%.png",
        activeIngredient: "Cypermethrin 25% EC",
        packaging: ["50 ml", "100 ml", "250 ml", "500 ml", "1 L"],
        description:
            "A high-concentration synthetic pyrethroid insecticide delivering strong knockdown of bollworms and other lepidopteran pests at low dose rates.",
        targetPests: "Bollworm, Pod borer, Fruit borer, Aphids, Jassids",
        crops: "Cotton, Vegetables, Pulses, Oilseeds",
        features: [
            "High concentration, low dosage",
            "Fast knockdown action",
            "Broad spectrum control",
            "Economical per acre",
        ],
        dosage: "0.4-0.6 ml per liter of water",
        applicationMethod: "Foliar spray",
        faqs: [
            {
                question: "How is 25% different from 10%?",
                answer: "The higher concentration means a lower dose per liter is needed for the same level of control.",
            },
        ],
    },
    {
        slug: "active-fly-insecticide",
        name: "Active Fly Sucking Pest & Mite Controller",
        categoryName: "Agriculture Insecticide",
        categoryKey: "insecticide",
        image: "active-fly.png",
        activeIngredient: "Sucking pest & mite controller (proprietary formulation)",
        packaging: ["10 gm"],
        description:
            "A specialised controller for sucking pests and mites, targeting whitefly, greenfly and red mites for cleaner, healthier foliage.",
        targetPests: "Whitefly, Greenfly (Aphids), Red mites, Jassids, Thrips",
        crops: "Cotton, Chilli, Vegetables, Fruits",
        features: [
            "Targets sucking pests",
            "Effective mite control",
            "Water soluble",
            "Convenient sachet pack",
        ],
        dosage: "As per label recommendation",
        applicationMethod: "Foliar spray",
        faqs: [
            {
                question: "Which pests does it control?",
                answer: "It is formulated to control sucking pests such as whitefly and aphids along with red mites.",
            },
        ],
    },
    {
        slug: "active-king-plant-growth-regulator",
        name: "Active King Plant Growth Regulator",
        categoryName: "Plant Growth Promoter",
        categoryKey: "pgr",
        image: "active-king-plantgrowth-regulator.png",
        activeIngredient: "Plant growth regulator formulation",
        packaging: ["250 ml", "500 ml", "1 L"],
        description:
            "A plant growth regulator formulated to promote vigorous vegetative growth, improve flowering and enhance overall crop yield.",
        purpose: "Overall plant growth promotion and yield enhancement",
        crops: "All crops",
        features: [
            "Promotes vegetative growth",
            "Improves flowering and fruiting",
            "Enhances crop vigour",
            "Suitable for all crops",
        ],
        dosage: "2-3 ml per liter of water",
        applicationMethod: "Foliar spray",
        faqs: [
            {
                question: "When should it be applied?",
                answer: "It is generally applied at the vegetative and flowering stages for best results.",
            },
        ],
    },
    {
        slug: "active-lancer-insecticide",
        name: "Active Lancer Insecticide",
        categoryName: "Agriculture Insecticide",
        categoryKey: "insecticide",
        image: "active-lancer-insecticide.png",
        activeIngredient: "Lambda-cyhalothrin 5% EC",
        packaging: ["100 ml", "250 ml", "500 ml", "1 L"],
        description:
            "A broad-spectrum synthetic pyrethroid insecticide with quick knockdown and long residual control of chewing and sucking pests.",
        targetPests: "Bollworm, Aphids, Jassids, Thrips, Pod borer, Fruit borer",
        crops: "Cotton, Chilli, Vegetables, Pulses",
        features: [
            "Quick knockdown action",
            "Long residual activity",
            "Broad spectrum control",
            "Low dose rate",
        ],
        dosage: "0.5-1 ml per liter of water",
        applicationMethod: "Foliar spray",
        faqs: [
            {
                question: "Is it effective on both sucking and chewing pests?",
                answer: "Yes, Lambda-cyhalothrin controls a broad range of both sucking and chewing pests.",
            },
        ],
    },
    {
        slug: "active-panther-insecticide",
        name: "Active Panther Insecticide",
        categoryName: "Agriculture Insecticide",
        categoryKey: "insecticide",
        image: "active-panther-insecticide.png",
        activeIngredient: "Lambda-cyhalothrin 4.9% CS",
        packaging: ["100 ml", "250 ml", "500 ml", "1 L"],
        description:
            "A micro-encapsulated (CS) formulation of Lambda-cyhalothrin offering quick knockdown with extended residual protection and improved safety.",
        targetPests: "Bollworm, Aphids, Jassids, Thrips, Fruit borer",
        crops: "Cotton, Chilli, Vegetables, Pulses",
        features: [
            "Micro-encapsulated for longer residual",
            "Quick knockdown action",
            "Better user and crop safety",
            "Broad spectrum control",
        ],
        dosage: "0.5-1 ml per liter of water",
        applicationMethod: "Foliar spray",
        faqs: [
            {
                question: "What does CS mean?",
                answer: "CS (capsule suspension) is a micro-encapsulated formulation that releases the active ingredient gradually for longer-lasting control.",
            },
        ],
    },
    {
        slug: "active-runout-herbicide",
        name: "Active Runout Herbicide",
        categoryName: "Agriculture Herbicide",
        categoryKey: "herbicide",
        image: "active-runout-herbicide.png",
        activeIngredient: "Non-selective post-emergent herbicide",
        packaging: ["500 ml", "1 L", "5 L"],
        description:
            "A non-selective post-emergent herbicide for effective control of a wide range of grassy and broadleaf weeds in non-crop and plantation areas.",
        targetWeeds: "Grassy weeds, Broadleaf weeds, Sedges",
        crops: "Non-crop areas, Plantation crops, Orchards, Tea, Bunds",
        features: [
            "Non-selective weed control",
            "Controls grassy and broadleaf weeds",
            "Fast visible action",
            "Ideal for land preparation",
        ],
        dosage: "As per label recommendation",
        applicationMethod: "Directed foliar spray on weeds",
        faqs: [
            {
                question: "Where should it be used?",
                answer: "It is used for weed clearance in non-crop areas, plantations, orchards and along field bunds.",
            },
        ],
    },
    {
        slug: "boan-flower-plant-growth-regulator",
        name: "Boan Flower Plant Growth Regulator",
        categoryName: "Plant Growth Promoter",
        categoryKey: "pgr",
        image: "boan-flower.png",
        activeIngredient: "Nitrobenzene 20% EW",
        packaging: ["100 ml", "250 ml", "500 ml", "1 L"],
        description:
            "A nitrobenzene-based flowering stimulant that induces profuse flowering, reduces flower and fruit drop, and improves overall crop yield.",
        purpose: "Flowering stimulation and yield enhancement",
        crops: "All flowering and fruiting crops",
        features: [
            "Induces profuse flowering",
            "Reduces flower and fruit drop",
            "Improves fruit setting",
            "Boosts overall yield",
        ],
        dosage: "1-2 ml per liter of water",
        applicationMethod: "Foliar spray at flowering initiation",
        faqs: [
            {
                question: "When should Boan Flower be sprayed?",
                answer: "It is best applied just before and during the flowering stage to maximise flower induction and retention.",
            },
        ],
    },
    {
        slug: "gini-505-insecticide",
        name: "Gini 505 Broad Spectrum Insecticide",
        categoryName: "Agriculture Insecticide",
        categoryKey: "insecticide",
        image: "gini-505-insecticide.png",
        activeIngredient: "Chlorpyriphos 50% + Cypermethrin 5% EC",
        packaging: ["250 ml", "500 ml", "1 L"],
        description:
            "A powerful combination insecticide of an organophosphate and a pyrethroid, providing broad-spectrum control with quick knockdown and residual action.",
        targetPests: "Bollworm, Stem borer, Aphids, Jassids, Fruit borer",
        crops: "Cotton, Paddy, Vegetables, Pulses, Oilseeds",
        features: [
            "Dual mode of action",
            "Quick knockdown + residual control",
            "Broad spectrum activity",
            "Anti-resistance management",
        ],
        dosage: "2 ml per liter of water",
        applicationMethod: "Foliar spray",
        faqs: [
            {
                question: "Why combine two insecticides?",
                answer: "The organophosphate and pyrethroid combination provides synergistic action and helps manage insecticide resistance.",
            },
        ],
    },
    {
        slug: "khalas-insecticide",
        name: "Khalas Insecticide",
        categoryName: "Agriculture Insecticide",
        categoryKey: "insecticide",
        image: "khalas-insecticide.png",
        activeIngredient: "Emamectin Benzoate 5% SG",
        packaging: ["5 gm", "25 gm", "100 gm", "250 gm"],
        description:
            "A semi-synthetic avermectin insecticide highly effective against lepidopteran larvae, acting through contact and ingestion with translaminar movement.",
        targetPests: "Fruit borer, Shoot borer, Diamondback moth, Spodoptera, Bollworm",
        crops: "Cotton, Chilli, Cabbage, Cauliflower, Vegetables",
        features: [
            "Excellent control of caterpillars",
            "Translaminar movement",
            "Low dose, low residue",
            "Safe to most beneficial insects",
        ],
        dosage: "0.4-0.5 gm per liter of water",
        applicationMethod: "Foliar spray",
        faqs: [
            {
                question: "Which pests does it target?",
                answer: "Emamectin Benzoate is highly effective against lepidopteran larvae such as borers, Spodoptera and diamondback moth.",
            },
        ],
    },
    {
        slug: "protect-top-fungicide",
        name: "Protect Top Systemic Fungicide",
        categoryName: "Agriculture Fungicide",
        categoryKey: "fungicide",
        image: "protect-top.png",
        activeIngredient: "Azoxystrobin 11.8% + Difenoconazole 11.8% SC",
        packaging: ["100 ml", "250 ml", "500 ml", "1 L"],
        description:
            "A broad-spectrum systemic fungicide combining a strobilurin and a triazole for preventive and curative control of major fungal diseases with a plant-health benefit.",
        targetDiseases:
            "Blast, Sheath blight, Powdery mildew, Rust, Early & Late blight, Fruit rot",
        crops: "Paddy, Wheat, Chilli, Tomato, Grapes, Vegetables",
        features: [
            "Dual systemic mode of action",
            "Preventive and curative action",
            "Broad spectrum disease control",
            "Improves crop greenery and vigour",
        ],
        dosage: "1 ml per liter of water",
        applicationMethod: "Foliar spray",
        faqs: [
            {
                question: "Why combine two fungicides?",
                answer: "The strobilurin (Azoxystrobin) and triazole (Difenoconazole) combination gives broader disease control and better resistance management.",
            },
        ],
    },
];

async function run() {
    const imagesDir = resolve(__dirname, "..", "public", "images");
    let created = 0;
    const failures: string[] = [];

    for (const p of products) {
        const _id = `product-${p.slug}`;

        // Upload image first (if present) so we can attach it in the same write
        let imageField: object | undefined;
        const imgPath = resolve(imagesDir, p.image);
        if (existsSync(imgPath)) {
            const asset = await client.assets.upload("image", readFileSync(imgPath), {
                filename: p.image,
            });
            imageField = {
                _type: "image",
                asset: { _type: "reference", _ref: asset._id },
            };
        } else {
            failures.push(`${p.name} — image "${p.image}" not found (created without image)`);
        }

        await client.createOrReplace({
            _id,
            _type: "product",
            name: p.name,
            slug: { _type: "slug", current: p.slug },
            category: { _type: "reference", _ref: CATEGORY_REF[p.categoryKey] },
            activeIngredient: p.activeIngredient,
            packaging: p.packaging,
            description: p.description,
            targetPests: p.targetPests,
            targetDiseases: p.targetDiseases,
            targetWeeds: p.targetWeeds,
            purpose: p.purpose,
            crops: p.crops,
            features: p.features,
            dosage: p.dosage,
            applicationMethod: p.applicationMethod,
            isFeatured: false,
            faqs: p.faqs.map((f) => ({
                _type: "object",
                _key: Math.random().toString(36).slice(2, 10),
                question: f.question,
                answer: f.answer,
            })),
            ...(imageField ? { image: imageField } : {}),
        });

        created++;
        console.log(`  ✅ ${p.name}${imageField ? " (with image)" : " (NO image)"}`);
    }

    console.log(`\n🎉 Created ${created}/${products.length} products.`);
    if (failures.length) {
        console.log("\n⚠️  Notes:");
        for (const f of failures) console.log(`   - ${f}`);
    }
}

run().catch((err) => {
    console.error("❌ Failed:", err);
    process.exit(1);
});
