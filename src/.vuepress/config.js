const { description } = require("../../package");
const fs = require("fs");
const path = require("path");

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "MIND UPLOAD",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["link", { rel: "icon", href: "/logo.jpg" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
    ["script", { async: true, src: "https://www.googletagmanager.com/gtag/js?id=G-672PNZBWWP"}],
    ["script", {}, ["window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-672PNZBWWP');"]],
    ["script", { async: true, src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8111136017997298", crossorigin: "anonymous" }],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    logo: "/logo.jpg",
    repo: "",
    editLinks: true,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    nav: [
      { text: "TIL", link: "/posts/list" },
      { text: "Study", link: "/study/list" },
      { text: "Journal", link: "/blog/list" },
      { text: "Tags", link: "/etc/tagList" },
      { text: "Profile", link: "/etc/resume" }
    ],
    sidebar: {
      "/posts/": getSideBar("posts"),
      "/study/": getSideBar("study"),
      "/blog/": getSideBar("blog"),
    },
    smoothScroll: true,
    author: "LeeKyounghwa",
    domain: "leekyounghwa.github.io",
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    "img-lazy",
    "flowchart",
    "vuepress-plugin-mermaidjs",
    "vuepress-plugin-chart",
    ["sitemap", { hostname: "https://leekyounghwa.github.io" }],
    [
      "seo",
      {
        image: ($page, $site) =>
          $page.frontmatter.image ||
          "https://" + $site.themeConfig.domain + $site.themeConfig.logo,
        modifiedAt: ($page) =>
          $page.lastUpdated ||
          $page.frontmatter.lastUpdated ||
          new Date("2023/11/15 20:46:25"),
      },
    ],
  ],

  configureWebpack: {
    resolve: {
      alias: {
        "@data": "/src/data/",
        "@image": "/src/image/",
        "@components": "/src/.vuepress/components/",
      },
    },
  },

  markdown: {
    lineNumbers: true,
  },
};

function getSideBar(dirNm) {
  const src = "./src/";
  const fs = require("fs");
  const fileList = [];
  fs.readdirSync(src + dirNm)
    .filter((file) => file != "list.md")
    .forEach((file) => {
      const childrenList = [];
      fs.readdirSync(src + dirNm + "/" + file)
        .filter((fileName) => fileName != "list.md")
        .forEach((fileName) => {
          childrenList.push((file + "/" + fileName).replace(".md", ""));
        });
      fileList.push({
        title: file,
        collapsable: true,
        children: childrenList,
      });
    });
  console.log(fileList);
  return fileList;
}
