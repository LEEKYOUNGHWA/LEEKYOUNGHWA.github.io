import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

export const SITE = {
  title: "MIND UPLOAD",
  repo: "https://github.com/LEEKYOUNGHWA/LEEKYOUNGHWA.github.io",
  nav: [
    { text: "TIL", link: "/posts/list.html" },
    { text: "Study", link: "/study/list.html" },
    { text: "Journal", link: "/blog/list.html" },
    { text: "Tags", link: "/etc/tagList.html" },
    { text: "Profile", link: "/etc/resume.html" },
  ],
};

export const url = (p: Post) => (p.id.endsWith("/index") ? `/${p.id.slice(0, -5)}` : `/${p.id}.html`);

export async function allPosts() {
  return getCollection("posts");
}

// 목록 페이지: VuePress SubHome과 같은 lastUpdated 내림차순
export async function listOf(section: Post["data"]["section"], prefix?: string) {
  const time = (p: Post) => new Date(p.data.lastUpdated || "1999/10/04").getTime();
  return (await allPosts()).filter((p) => p.data.section === section && (!prefix || p.id.startsWith(prefix))).sort((a, b) => time(b) - time(a));
}

// 사이드바: 폴더 = 그룹, 파일명 순 (VuePress config의 readMarkdownTree와 동일)
export type SidebarGroup = { title: string; items: Post[] };
export async function sidebarOf(section: "posts" | "study"): Promise<SidebarGroup[]> {
  const list = (await allPosts()).filter((p) => p.data.section === section);
  const groups = new Map<string, Post[]>();
  for (const p of list) {
    const parts = p.id.split("/");
    const g = parts.length > 2 ? parts[1] : "";
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g)!.push(p);
  }
  // 파일 시스템 순서(대문자 먼저)와 같게 코드 포인트 순 비교
  const cmp = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
  return [...groups.entries()]
    .sort(([a], [b]) => cmp(a, b))
    .map(([title, items]) => ({ title, items: items.sort((a, b) => cmp(a.id, b.id)) }));
}
