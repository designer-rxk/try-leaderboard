import { SANITY_STUDIO_DATASET, SANITY_STUDIO_PROJECT_ID } from "@utils";
import path from "path";
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: SANITY_STUDIO_PROJECT_ID,
    dataset: SANITY_STUDIO_DATASET,
  },
  vite: {
    resolve: {
      alias: {
        "@documents": path.resolve(
          __dirname,
          "./src/schemas/documents/index.ts",
        ),
        "@objects": path.resolve(__dirname, "./src/schemas/objects/index.ts"),
        "@fields": path.resolve(__dirname, "./src/schemas/fields/index.ts"),
        "@utils": path.resolve(__dirname, "./src/utils/index.ts"),
        "@lib": path.resolve(__dirname, "./src/lib/index.ts"),
      },
    },
  },
});
