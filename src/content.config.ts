import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  // id를 원래 파일 경로 그대로 사용 (대소문자 유지 → 기존 주소 호환)
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/posts",
    generateId: ({ entry }) => entry.replace(/\.mdx?$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    section: z.enum(["posts", "study", "blog", "etc", "trash"]),
    lastUpdated: z.string().optional(),
    subTitle: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    sidebar: z.boolean().default(true),
  }),
});

export const collections = { posts };
