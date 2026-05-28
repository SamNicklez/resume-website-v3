// sanity.config.ts
import { defineConfig } from 'sanity';
import { schemaTypes } from '@/sanity/schemas';
import {structureTool} from 'sanity/structure';
import {visionTool} from '@sanity/vision';

export default defineConfig({
  name: 'default',
  title: 'Sam Nicklaus Portfolio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});