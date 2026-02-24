import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
    name: "active-agro-science",
    title: "Active Agro Science CMS",
    projectId: "8m0swnfc",
    dataset: "production",
    basePath: "/studio",
    plugins: [structureTool(), visionTool()],
    schema: {
        types: schemaTypes,
    },
});
