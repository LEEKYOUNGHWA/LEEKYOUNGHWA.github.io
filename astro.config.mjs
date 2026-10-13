// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";

// 코드블록을 VuePress와 같은 마크업으로 감싸기 (언어 표시 + 줄 번호)
/** @type {import('shiki').ShikiTransformer} */
const vuepressCodeBlock = {
  name: "vuepress-code-block",
  root(root) {
    const lang = this.options.lang;
    const lines = this.source.replace(/\n$/, "").split("\n").length;
    const numbers = [];
    for (let i = 1; i <= lines; i++) {
      numbers.push({ type: "element", tagName: "span", properties: { className: ["line-number"] }, children: [{ type: "text", value: String(i) }] });
      numbers.push({ type: "element", tagName: "br", properties: {}, children: [] });
    }
    return {
      type: "root",
      children: [{
        type: "element",
        tagName: "div",
        properties: { className: [`language-${lang}`, "line-numbers-mode"] },
        children: [
          ...root.children,
          { type: "element", tagName: "div", properties: { className: ["line-numbers-wrapper"] }, children: numbers },
        ],
      }],
    };
  },
};

export default defineConfig({
  site: "https://leekyounghwa.github.io",
  // 기존 VuePress 주소(/posts/2026/LLM.html)를 그대로 유지
  build: { format: "preserve" },
  integrations: [vue(), mdx()],
  markdown: {
    syntaxHighlight: { type: "shiki", excludeLangs: ["mermaid"] },
    shikiConfig: { theme: "one-dark-pro", transformers: [vuepressCodeBlock] },
  },
});
