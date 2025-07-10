<template>
  <div>
    <div class="subhome">
      <h1>{{ title }}</h1>
      <p>{{ desc }}</p>
        <!-- <vue-typed-js :strings="[desc]">
          <p class="typing description"></p>
        </vue-typed-js> -->
    </div>
    <div v-for="(page, index) in paginatedPosts" :key="page.key || index">
      <div class="container">
        <router-link :to="{ path: page.path}" class="thumbnail-container">
          <img-lazy class="thumbnail" :src="altImg(page.frontmatter.image)" />
        </router-link>
        <div class="blog-content">
            <h5>{{page.frontmatter.lastUpdated}}</h5>
            <h3><router-link :to="{ path: page.path}">{{page.title}}</router-link></h3>
            <p>{{page.frontmatter.subTitle}}</p>
        </div>
      </div>
      <h2></h2>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">←</button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: page === currentPage }"
      >
        {{ page }}
      </button>

      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">→</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nav: {
      default: "blog",
    },
    title: {
      default: "Blog",
    },
    desc: {
      default: "music, movie, series etc...",
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    filteredPosts() {
      return this.$site.pages
        .filter(
          (page) =>
            page.relativePath.startsWith(this.nav) &&
            !page.relativePath.includes("README") &&
            !page.relativePath.includes("/list") &&
            !page.relativePath.includes("/all")
        )
        .sort(
          (a, b) =>
            new Date(b.frontmatter.lastUpdated || "1999/10/04") -
            new Date(a.frontmatter.lastUpdated || "1999/10/04")
        );
    },
    totalPages() {
      return Math.ceil(this.filteredPosts.length / this.itemsPerPage);
    },
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredPosts.slice(start, start + this.itemsPerPage);
    },
  },
  created() {
    const pageFromQuery = parseInt(this.$route.query.page);
    if (pageFromQuery && pageFromQuery >= 1 && pageFromQuery <= this.totalPages) {
      this.currentPage = pageFromQuery;
    }
  },
  methods: {
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      this.$router.replace({
        path: this.$route.path,
        query: { ...this.$route.query, page: String(page) },
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    altImg(image) {
      return image || "/logo.jpg";
    },
  },
};
</script>

<style lang="stylus" scoped>
h5, h3, h4, p {
  margin-top: 1px;
  margin-bottom: 10px;
}
h3, p {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
p {
  font-size: 0.9em;
}
.container {
  display: flex;
  scroll-margin-block-start: 70px;
}
.thumbnail-container {
  display: flex;
  cursor: pointer;
  width: 120px;
  height: 120px;
  float: left;
  margin-left: 30px;
  margin-right: 30px;
}
.thumbnail {
  object-fit: cover;
    width: 100%; /* 부모 컨테이너의 너비를 채움 */
    height: 100%; /* 부모 컨테이너의 높이를 채움 */
}
.blog-content {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 200px;
  margin-top: 10px;
}

.divider {
  width: calc(100% - 60px);
  margin: 20px auto;
  border: none;
  border-top: 1px solid #ccc;
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

.pagination {
  display: flex;
  justify-content: center;
  margin: 30px 0;
  gap: 5px;

  button {
    border: 1px solid #ccc;
    background: white;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 4px;
  }

  button.active {
    background-color: #2F3D7C;
    color: white;
    font-weight: bold;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

@media (max-width: $MQMobile)
  h5, h3, h4, p {
    margin-top: 2px;
    margin-bottom: 0px;
  }
  h3 
    a {
      font-size: 1.1rem;
    }
  p {
    font-size: 0.9rem;
  }
  .thumbnail-container{
    display: flex;
    object-fit: cover;
    cursor: pointer;
    width: 100px;
    height: 100px;
    float: left;
    margin-left: 10px;
    margin-right: 15px;
  }
  .subhome
    text-align center
    h1
      font-size 2rem
    .description
      margin-bottom 40px
      font-size 1.4rem
      line-height 1.3
  .container
    h3
      font-size 1.2rem
  .blog-content {
    margin-top: 0px;
    margin-left: 10px;
  }
</style>