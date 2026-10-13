<template>
  <div class="gist">
    <img v-if="gistErr" id="notFound" height="100%" width="100%"
      src="https://user-images.githubusercontent.com/883233/102043641-d4817580-3d89-11eb-885d-2786373932d4.png" alt="404" />
    <p v-else v-html="gistDiv"></p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({ gistId: String, file: String });
const gistDiv = ref("loading...");
const gistErr = ref(false);

// gist.github.com의 JSONP 응답 (vue-jsonp 대신 직접 구현)
function jsonp(url, timeout = 20000) {
  return new Promise((resolve, reject) => {
    const cb = `__gist_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timer = setTimeout(() => cleanup(new Error("timeout")), timeout);
    function cleanup(err, data) {
      clearTimeout(timer);
      delete window[cb];
      script.remove();
      err ? reject(err) : resolve(data);
    }
    window[cb] = (data) => cleanup(null, data);
    script.src = `${url}${url.includes("?") ? "&" : "?"}callback=${cb}`;
    script.onerror = () => cleanup(new Error("load error"));
    document.head.appendChild(script);
  });
}

onMounted(async () => {
  try {
    const params = props.file ? `?file=${props.file}` : "";
    const result = await jsonp(`https://gist.github.com/${props.gistId}.json${params}`);
    if (result.stylesheet && !document.querySelector(`link[href="${result.stylesheet}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = result.stylesheet;
      document.head.appendChild(link);
    }
    gistDiv.value = result.div;
  } catch (e) {
    gistErr.value = true;
    console.log(e);
  }
});
</script>

<style>
.gist td, .gist tr { background-color: white; border-color: white; }
.gist .markdown-body pre { background-color: black; }
</style>
