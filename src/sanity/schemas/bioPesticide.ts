import { defineType, defineField } from "sanity";

export default defineType({
    name: "bioPesticide",
    title: "Bio-Pesticide",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Product Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "order",
            title: "Display Order",
            description: "Lower numbers appear first.",
            type: "number",
        }),
    ],
    orderings: [
        {
            title: "Display Order",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
    ],
    preview: {
        select: { title: "name" },
    },
});
