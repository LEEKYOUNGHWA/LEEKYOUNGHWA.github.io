<template>
  <div class="iframe-wrapper" :style="{ maxWidth: maxWidth, margin: '0 auto' }">
    <div class="iframe-container">
      <iframe
          width="560"
          height="315"
          :src="src"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    maxWidth: {
      type: String,
      default: '560px' // 원하는 기본 max-width
    }
  }
};
</script>

<style scoped>
.iframe-wrapper {
    width: 100%;
    text-align: center;
    padding-top: 16px; /* 위쪽 여백 추가 */
}
.iframe-container {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px;
    height: 0;
    overflow: hidden;
}
.iframe-container iframe,
.iframe-container object,
.iframe-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>