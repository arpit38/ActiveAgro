import { defineType, defineField } from "sanity";

export default defineType({
    name: "exportProduct",
    title: "Export Product",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Product Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Herbicides", value: "Herbicides" },
                    { title: "Fungicides", value: "Fungicides" },
                    { title: "Insecticides", value: "Insecticides" },
                    {
                        title: "Plant Growth Regulators",
                        value: "Plant Growth Regulators",
                    },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "order",
            title: "Display Order",
            description: "Lower numbers appear first within the category.",
            type: "number",
        }),
    ],
    orderings: [
        {
            title: "Category, then Order",
            name: "categoryOrder",
            by: [
                { field: "category", direction: "asc" },
                { field: "order", direction: "asc" },
            ],
        },
    ],
    preview: {
        select: { title: "name", subtitle: "category" },
    },
});
