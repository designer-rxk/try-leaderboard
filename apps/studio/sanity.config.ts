import { resolve } from "@lib";
import { presentationTool } from "@sanity/presentation";
import { visionTool } from "@sanity/vision";
import { SANITY_STUDIO_DATASET, SANITY_STUDIO_PROJECT_ID } from "@utils";
import { groqdPlaygroundTool } from "groqd-playground";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemas as types } from "./src/schemas";

export default defineConfig({
  name: "default",
  title: "mono",

  projectId: SANITY_STUDIO_PROJECT_ID,
  dataset: SANITY_STUDIO_DATASET,

  plugins: [
    structureTool(),
    presentationTool({
      resolve,
      previewUrl: {
        draftMode: {
          enable: "http://localhost:3000/api/draft-mode/enable",
        },
      },
    }),
    visionTool(),
    groqdPlaygroundTool(),
  ],

  schema: { types },
});
