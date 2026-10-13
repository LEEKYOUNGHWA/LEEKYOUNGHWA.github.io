// 기존 VuePress와 같은 /sitemap.xml (서치콘솔에 등록된 주소 유지). trash(개인 아카이브)는 제외
import type { APIRoute } from "astro";
import { allPosts, url, SITE } from "../lib/posts";

export const GET: APIRoute = async ({ site }) => {
  const pages = ["/", ...SITE.nav.map((n) => n.link), ...(await allPosts()).filter((p) => p.data.section !== "trash").map(url)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...new Set(pages)].map((p) => `  <url><loc>${new URL(encodeURI(p), site)}</loc></url>`).join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
