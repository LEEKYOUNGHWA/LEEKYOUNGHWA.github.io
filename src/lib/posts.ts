import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

export const SITE = {
  title: "MIND UPLOAD",
  repo: "https://github.com/LEEKYOUNGHWA/LEEKYOUNGHWA.github.io",
  nav: [
    { text: "Posts", link: "/posts/list.html" },
    { text: "Tags", link: "/etc/tagList.html" },
    { text: "Profile", link: "/etc/resume.html" },
  ],
};

export const url = (p: Post) => (p.id.endsWith("/index") ? `/${p.id.slice(0, -5)}` : `/${p.id}.html`);

export async function allPosts() {
  return getCollection("posts");
}

// 목록 페이지: VuePress SubHome과 같은 lastUpdated 내림차순
export async function listOf(section: Post["data"]["section"] | Post["data"]["section"][], prefix?: string) {
  const time = (p: Post) => new Date(p.data.lastUpdated || "1999/10/04").getTime();
  const sections = Array.isArray(section) ? section : [section];
  return (await allPosts())
    .filter((p) => sections.includes(p.data.section) && !p.id.endsWith("/index") && (!prefix || p.id.startsWith(prefix)))
    .sort((a, b) => time(b) - time(a));
}

// 함께 보면 좋은 글: 태그가 겹치는 글 우선, 모자라면 같은 섹션 최신 글로 채움 (trash 제외)
export async function relatedOf(post: Post, limit = 3): Promise<Post[]> {
  if (post.data.section === "trash" || post.data.section === "etc") return [];
  const time = (p: Post) => new Date(p.data.lastUpdated || "1999/10/04").getTime();
  const pool = (await allPosts()).filter(
    (p) => p.id !== post.id && !p.id.endsWith("/index") && p.data.section !== "trash" && p.data.section !== "etc",
  );
  const tags = new Set(post.data.tags);
  const shared = (p: Post) => p.data.tags.filter((t) => tags.has(t)).length;
  const byTag = pool.filter((p) => shared(p) > 0).sort((a, b) => shared(b) - shared(a) || time(b) - time(a));
  const picked = byTag.slice(0, limit);
  if (picked.length < limit) {
    const rest = pool
      .filter((p) => p.data.section === post.data.section && !picked.includes(p))
      .sort((a, b) => time(b) - time(a));
    picked.push(...rest.slice(0, limit - picked.length));
  }
  return picked;
}

// 홈 인기 글: GA4 조회수 상위 (2026/10 기준). 순서대로 노출, 없는 id는 건너뜀
export const POPULAR_IDS = [
  "posts/2023/iosReminderDday",
  "posts/2023/autoConfirmClick",
  "posts/2024/svnLock",
  "posts/2024/installSDKman",
];
export async function popularPosts(): Promise<Post[]> {
  const all = await allPosts();
  return POPULAR_IDS.map((id) => all.find((p) => p.id === id)).filter((p): p is Post => !!p);
}
