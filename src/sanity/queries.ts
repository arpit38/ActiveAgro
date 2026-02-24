import { client, fetchWithRetry } from "./client";

// ─── Product Types (matching frontend expectations) ──────────
export interface SanityProduct {
    _id: string;
    slug: string;
    name: string;
    category: string;
    categorySlug: string;
    activeIngredient: string;
    packaging: string[];
    description: string;
    targetPests?: string;
    targetDiseases?: string;
    targetWeeds?: string;
    targetEffect?: string;
    purpose?: string;
    crops: string;
    features: string[];
    dosage: string;
    applicationMethod: string;
    faqs: { question: string; answer: string }[];
    isFeatured?: boolean;
    image?: string;
}

export interface SanityCategory {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image?: string;
}

export interface SanityBlogPost {
    _id: string;
    title: string;
    slug: string;
    coverImage?: string;
    excerpt: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any[];
    category: string;
    author: string;
    publishedAt: string;
}

// ─── GROQ Queries ────────────────────────────────────────────

const productFields = `
    _id,
    "slug": slug.current,
    name,
    "category": category->name,
    "categorySlug": category->slug.current,
    activeIngredient,
    packaging,
    description,
    targetPests,
    targetDiseases,
    targetWeeds,
    targetEffect,
    purpose,
    crops,
    features,
    dosage,
    applicationMethod,
    faqs,
    isFeatured,
    "image": image.asset->url
`;

// ─── Product Queries ─────────────────────────────────────────

export async function getAllProducts(): Promise<SanityProduct[]> {
    return fetchWithRetry(() =>
        client.fetch(
            `*[_type == "product"] | order(name asc) { ${productFields} }`
        )
    );
}

export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
    return fetchWithRetry(() =>
        client.fetch(
            `*[_type == "product" && slug.current == $slug][0] { ${productFields} }`,
            { slug }
        )
    );
}

export async function getProductsByCategory(categorySlug: string): Promise<SanityProduct[]> {
    return fetchWithRetry(() =>
        client.fetch(
            `*[_type == "product" && category->slug.current == $categorySlug] | order(name asc) { ${productFields} }`,
            { categorySlug }
        )
    );
}

export async function getFeaturedProducts(): Promise<SanityProduct[]> {
    return fetchWithRetry(() =>
        client.fetch(
            `*[_type == "product" && isFeatured == true] { ${productFields} }`
        )
    );
}

export async function getSuggestedProducts(currentSlug: string, categorySlug: string): Promise<SanityProduct[]> {
    return fetchWithRetry(() =>
        client.fetch(
            `*[_type == "product" && category->slug.current == $categorySlug && slug.current != $currentSlug][0...4] { ${productFields} }`,
            { currentSlug, categorySlug }
        )
    );
}

// ─── Category Queries ────────────────────────────────────────

export async function getAllCategories(): Promise<SanityCategory[]> {
    return fetchWithRetry(() =>
        client.fetch(
            `*[_type == "category"] | order(name asc) {
            _id,
            name,
            "slug": slug.current,
            description,
            "image": image.asset->url
        }`
        )
    );
}

// ─── Blog Queries ────────────────────────────────────────────

export async function getAllBlogPosts(): Promise<SanityBlogPost[]> {
    return fetchWithRetry(() =>
        client.fetch(
            `*[_type == "blogPost"] | order(publishedAt desc) {
            _id,
            title,
            "slug": slug.current,
            "coverImage": coverImage.asset->url,
            excerpt,
            body,
            category,
            author,
            publishedAt
        }`
        )
    );
}

export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
    return fetchWithRetry(() =>
        client.fetch(
            `*[_type == "blogPost" && slug.current == $slug][0] {
            _id,
            title,
            "slug": slug.current,
            "coverImage": coverImage.asset->url,
            excerpt,
            body,
            category,
            author,
            publishedAt
        }`,
            { slug }
        )
    );
}
