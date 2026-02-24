import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
    useCdn: true,
});

// Write client (for seeding / mutations)
export const writeClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
    return builder.image(source);
}

/**
 * Retry wrapper for Sanity queries.
 * Retries up to `maxRetries` times with exponential backoff on network errors.
 */
export async function fetchWithRetry<T>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryFn: () => Promise<T>,
    maxRetries = 3,
    baseDelay = 1000
): Promise<T> {
    let lastError: unknown;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await queryFn();
        } catch (err) {
            lastError = err;
            if (attempt < maxRetries) {
                const delay = baseDelay * Math.pow(2, attempt);
                console.warn(
                    `Sanity fetch attempt ${attempt + 1} failed, retrying in ${delay}ms...`,
                    err
                );
                await new Promise((res) => setTimeout(res, delay));
            }
        }
    }
    throw lastError;
}
