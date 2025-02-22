# Tags

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