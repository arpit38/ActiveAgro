import { defineType, defineField } from "sanity";

export default defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Product Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "name", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "reference",
            to: [{ type: "category" }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "image",
            title: "Product Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "activeIngredient",
            title: "Active Ingredient",
            type: "string",
        }),
        defineField({
            name: "packaging",
            title: "Available Packaging",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "targetPests",
            title: "Target Pests",
            type: "string",
        }),
        defineField({
            name: "targetDiseases",
            title: "Target Diseases",
            type: "string",
        }),
        defineField({
            name: "targetWeeds",
            title: "Target Weeds",
            type: "string",
        }),
        defineField({
            name: "targetEffect",
            title: "Target Effect",
            type: "string",
        }),
        defineField({
            name: "purpose",
            title: "Purpose",
            type: "string",
        }),
        defineField({
            name: "crops",
            title: "Suitable Crops",
            type: "string",
        }),
        defineField({
            name: "features",
            title: "Features & Benefits",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "dosage",
            title: "Recommended Dosage",
            type: "string",
        }),
        defineField({
            name: "applicationMethod",
            title: "Application Method",
            type: "string",
        }),
        defineField({
            name: "faqs",
            title: "FAQs",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({
                            name: "question",
                            title: "Question",
                            type: "string",
                        }),
                        defineField({
                            name: "answer",
                            title: "Answer",
                            type: "text",
                            rows: 3,
                        }),
                    ],
                    preview: {
                        select: { title: "question" },
                    },
                },
            ],
        }),
        defineField({
            name: "isFeatured",
            title: "Featured Product",
            type: "boolean",
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "activeIngredient",
            media: "image",
        },
    },
});
