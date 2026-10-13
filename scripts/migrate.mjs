// VuePress 글을 Astro 콘텐츠 컬렉션으로 옮기는 스크립트
// 사용법: node scripts/migrate.mjs <vuepress src 경로> [글 경로...]  (글 경로 생략 시 전체)
import fs from "node:fs";
import path from "node:path";

const [src, ...picked] = process.argv.slice(2);
const outDir = "src/content/posts";
const imgOut = "public/image";
const SECTIONS = ["posts", "study", "blog", "etc", "trash"];
const SKIP_FILES = ["list.md", "tagList.md", "README.md", "youtubeplaylistsearch.md", "RESTfulApi.md"];
const SKIP_DIRS = ["blog/acting"];
// MDX로 옮길 때 import 할 컴포넌트 (Vue 컴포넌트는 브라우저에서 동작하도록 client:load)
const COMPONENTS = {
  Youtube: { file: "Youtube.astro" },
  Badge: { file: "Badge.astro" },
  Gist: { file: "Gist.vue", client: true },
  Music: { file: "Music.vue", client: true },
  Movie: { file: "Movie.astro" },
  TTSButton: { file: "TTSButton.astro" },
};

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : d.name.endsWith(".md") ? [p] : [];
  });
}

// MDX는 본문의 { } 를 JS 표현식으로 해석하므로 코드 밖의 중괄호/부등호를 이스케이프
function escapeForMdx(text) {
  let fence = null;
  return text.split("\n").map((line) => {
    const m = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      if (m && m[1][0] === fence[0] && m[1].length >= fence.length && line.trim() === m[1]) fence = null;
      return line;
    }
    if (m) { fence = m[1]; return line; }
    return line
      .split(/((?<!\\)`[^`]*(?<!\\)`)/)
      .map((seg, i) => (i % 2 ? seg : seg.replace(/[{}]/g, (c) => "\\" + c).replace(/<(?![A-Za-z\/!])/g, "&lt;")))
      .join("");
  }).join("\n");
}

const unquote = (v) => v?.trim().replace(/^["']|["']$/g, "");

const files = picked.length
  ? picked.map((p) => path.join(src, p))
  : SECTIONS.flatMap((s) => walk(path.join(src, s)));

fs.mkdirSync(outDir, { recursive: true });
let count = 0;
for (const file of files) {
  const rel = path.relative(src, file);
  const isTrashIndex = rel.startsWith("trash" + path.sep) && path.basename(file) === "README.md";
  if (!isTrashIndex && SKIP_FILES.includes(path.basename(file))) continue;
  if (SKIP_DIRS.some((d) => rel.startsWith(d + path.sep))) continue;

  let raw = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  // <U>, <B> 같은 대문자 HTML 태그는 소문자로 (MDX는 대문자 태그를 컴포넌트로 인식함)
  raw = raw.replace(/<(\/?)(U|B|I|S|BR|P)>/g, (_, slash, t) => `<${slash}${t.toLowerCase()}>`);

  // 옮긴 컴포넌트 외의 VuePress 전용 컴포넌트(Playlist 등)를 쓰는 글은 건너뜀
  const prose = raw.replace(/^(```|~~~)[\s\S]*?^\1/gm, "").replace(/`[^`\n]*`/g, "");
  const used = [...new Set([...prose.matchAll(/<([A-Z][A-Za-z]+)/g)].map((x) => x[1]))];
  const comps = used.filter((c) => !COMPONENTS[c]);
  if (comps.length) {
    console.log(`건너뜀 (${[...new Set(comps)]}): ${rel}`);
    continue;
  }

  // frontmatter 중 한 줄짜리 값만 읽음 (meta 같은 목록은 무시)
  const fm = {};
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (m) {
    for (const line of m[1].split("\n")) {
      const kv = line.match(/^(\w+):\s*(.*)$/);
      if (kv && kv[2]) fm[kv[1]] = unquote(kv[2]);
    }
    raw = raw.slice(m[0].length);
  }

  // 제목: frontmatter title → 첫 번째 # 제목 → 파일명 (본문의 # 제목은 레이아웃이 다시 그리므로 제거)
  raw = raw.replace(/^#\s*\{\{\s*\$frontmatter\.title\s*\}\}\s*$/m, "");
  const h1 = raw.match(/^#\s+(.+)$/m);
  const title = fm.title || h1?.[1].trim() || path.basename(file, ".md");
  if (h1) raw = raw.replace(h1[0], "");

  // 이미지: ~@image/xxx → /image/xxx (파일도 복사)
  raw = raw.replace(/~?@image\/([^)\s"']+)/g, (_, p) => {
    const from = path.join(src, "image", p);
    const to = path.join(imgOut, p);
    if (fs.existsSync(from)) {
      fs.mkdirSync(path.dirname(to), { recursive: true });
      fs.copyFileSync(from, to);
    }
    return `/image/${p}`;
  });

  // [[toc]]는 사이드바가 대신함
  raw = raw.replace(/^\[\[toc\]\]\s*$/m, "");

  // ::: tip 제목 ... ::: → VuePress와 같은 custom-block 마크업
  raw = raw.replace(/^:::\s*(tip|warning|danger|details)\s*(.*)\n([\s\S]*?)^:::\s*$/gm, (_, kind, label, inner) => {
    const t = label.trim() || { tip: "TIP", warning: "WARNING", danger: "WARNING", details: "DETAILS" }[kind];
    return kind === "details"
      ? `<details class="custom-block details">\n<summary>${t}</summary>\n\n${inner.trim()}\n\n</details>`
      : `<div class="custom-block ${kind}">\n<p class="custom-block-title">${t}</p>\n\n${inner.trim()}\n\n</div>`;
  });

  const ext = used.length ? ".mdx" : ".md";
  if (used.length) raw = escapeForMdx(raw);
  for (const c of used) if (COMPONENTS[c].client) raw = raw.replace(new RegExp(`<${c}(?=[\\s/>])`, "g"), `<${c} client:load`);
  const slug = rel.replace(/README\.md$/, "index").replace(/\.md$/, "").split(path.sep).join("/");
  const out = path.join(outDir, slug + ext);
  const compDir = path.relative(path.dirname(out), "src/components").split(path.sep).join("/");
  const imports = used.map((c) => `import ${c} from "${compDir}/${COMPONENTS[c].file}";`).join("\n");
  const body = used.length ? `${imports}\n\n${raw.trim()}\n` : `${raw.trim()}\n`;

  let tags = [];
  if (fm.tags) {
    try { tags = JSON.parse(fm.tags.replace(/'/g, '"')); } catch {}
  }

  const front = [
    "---",
    `title: ${JSON.stringify(title)}`,
    `section: ${rel.split(path.sep)[0]}`,
    fm.lastUpdated ? `lastUpdated: ${JSON.stringify(fm.lastUpdated)}` : null,
    fm.subTitle ? `subTitle: ${JSON.stringify(fm.subTitle)}` : null,
    fm.description ? `description: ${JSON.stringify(fm.description)}` : null,
    fm.image ? `image: ${JSON.stringify(fm.image)}` : null,
    tags.length ? `tags: ${JSON.stringify(tags)}` : null,
    fm.sidebar === "false" ? "sidebar: false" : null,
    "---",
  ].filter(Boolean).join("\n");

  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, `${front}\n\n${body}`);
  count++;
}
console.log(`${count}개 글을 옮겼어요.`);
