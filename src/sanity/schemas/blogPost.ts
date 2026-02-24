import { defineType, defineField } from "sanity";

export default defineType({
    name: "blogPost",
    title: "Blog Post",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            rows: 3,
            validation: (Rule) => Rule.max(250),
        }),
        defineField({
            name: "body",
            title: "Body",
            type: "array",
            of: [
                { type: "block" },
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: "alt",
                            title: "Alt Text",
                            type: "string",
                        }),
                        defineField({
                            name: "caption",
                            title: "Caption",
                            type: "string",
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Farming Tips", value: "farming-tips" },
                    { title: "Product Updates", value: "product-updates" },
                    { title: "Industry News", value: "industry-news" },
                    { title: "Research", value: "research" },
                ],
            },
        }),
        defineField({
            name: "author",
            title: "Author",
            type: "string",
        }),
        defineField({
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
        }),
    ],
    orderings: [
        {
            title: "Published Date (New → Old)",
            name: "publishedAtDesc",
            by: [{ field: "publishedAt", direction: "desc" }],
        },
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "category",
            media: "coverImage",
        },
    },
});
