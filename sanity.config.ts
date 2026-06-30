import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
    name: "active-agro-science",
    title: "Active Agro Science CMS",
    projectId: "8m0swnfc",
    dataset: "production",
    basePath: "/studio",
    plugins: [
        structureTool({
            structure: async (S, context) => {
                const client = context.getClient({ apiVersion: "2024-01-01" });

                const categories: { _id: string; name: string }[] =
                    await client.fetch(
                        `*[_type == "category"] | order(name asc) { _id, name }`
                    );

                return S.list()
                    .title("Content")
                    .items([
                        // One item per category — opens a filtered product list directly
                        ...categories.map((cat) =>
                            S.listItem()
                                .title(cat.name)
                                .id(cat._id)
                                .schemaType("product")
                                .child(
                                    S.documentTypeList("product")
                                        .title(cat.name)
                                        .filter(
                                            '_type == "product" && category._ref == $categoryId'
                                        )
                                        .params({ categoryId: cat._id })
                                        .initialValueTemplates([
                                            S.initialValueTemplateItem(
                                                "product-by-category",
                                                { categoryId: cat._id }
                                            ),
                                        ])
                                )
                        ),
                        S.divider(),
                        // Separate section to edit categories themselves
                        S.listItem()
                            .title("Manage Categories")
                            .id("manage-categories")
                            .schemaType("category")
                            .child(
                                S.documentTypeList("category").title(
                                    "Manage Categories"
                                )
                            ),
                    ]);
            },
        }),
    ],
    schema: {
        types: schemaTypes,
        // Pre-fills the category reference when creating a product from within a category view
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        templates: (prev: any[]) => [
            ...prev,
            {
                id: "product-by-category",
                title: "Product (by category)",
                schemaType: "product",
                parameters: [{ name: "categoryId", type: "string" }],
                value: (params: { categoryId: string }) => ({
                    category: { _type: "reference", _ref: params.categoryId },
                }),
            },
        ],
    },
});
