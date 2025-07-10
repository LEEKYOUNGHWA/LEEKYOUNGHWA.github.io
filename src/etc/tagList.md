---
title: Home > Tags
sidebar: false
---

<div class="subhome">
    <h1>Tags</h1>
    <p>태그 모음</p>
</div>

<template v-for="tag in Object.keys(tags)">
  <h2 :id="tag.replace(' ','-')">
    <router-link
        :to="{ path: `#${tag.replace(' ','-')}`}"
        class="header-anchor"
        aria-hidden="true">
        #
    </router-link>
    {{tag}}
  </h2>
  <ul>
    <li v-for="page in tags[tag]">
      <router-link :to="{ path: page.path}">{{page.title}}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    tags() {
      let tags = {}
      for (let page of this.$site.pages) {
        for (let index in page.frontmatter.tags) {
          const tag = page.frontmatter.tags[index]
          if (tag in tags) {
            tags[tag].push(page)
          } else {
            tags[tag] = [page]
          }
        }
      }
      return tags
    }
  },
}
</script>

<style lang="stylus" scoped>
p {
  font-size: 0.9em;
}
.subhome {
  padding: 0;
  max-width: $homePageWidth;
  display: block;
  text-align: left;
  margin-left: 20px;
  margin-bottom: 40px;

  h1 {
    font-size: 3rem;
    margin-bottom: 10px;
  }
  .description {
    max-width: 35rem;
    font-size: 1.6rem;
    line-height: 1.3;
    color: lighten($textColor, 40%);
  }
}

</style>