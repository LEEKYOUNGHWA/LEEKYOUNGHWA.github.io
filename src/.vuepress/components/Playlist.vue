<template>
  <div>
    <iframe
      v-if="jukeBox"
      :src="jukeBox"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameborder="0"
      height="450"
      style="width:100%;overflow:hidden;border-radius:10px;padding-bottom: 20px;"
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation allow-presentation"
      allowfullscreen
    ></iframe>
    <div v-else class="no-jukebox-placeholder">
      재생할 비디오를 선택해주세요.
    </div>

    <!-- 검색 & 정렬 UI -->
    <div class="controls">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="비디오 검색 (제목 / 채널명)"
        @keyup="filterVideos"
        class="search-box"
      />
      <select v-model="sortOption" @change="sortVideos" class="sort-dropdown">
        <option value="createdAt">등록순</option>
        <option value="publishedAt">발행일순</option>
        <option value="title">제목 가나다순</option>
        <option value="channelTitle">채널명 가나다순</option>
      </select>
      <button
        class="order-toggle"
        @click="toggleOrder"
        :title="isDesc ? '최신순' : '오래된순'"
      >
        <span v-if="isDesc">↓</span>
        <span v-else>↑</span>
      </button>
    </div>

    <h4> 비디오 목록 {{ filteredVideos.length }} </h4>

    <div v-for="(video, idx) in filteredVideos" :key="videoId(video.id)">
      <div class="container" :id="videoId(video.id)">
        <div class="wrap" @click="changeJukebox(video.videoId)">
          <!-- 이미지 로딩을 위한 img-lazy 컴포넌트가 필요합니다. -->
          <img class="album-img" :src="video.thumbnailUrl" :alt="video.title"/>
        </div>
        <div class="blog-content">
          <h4>{{formatDate(video.publishedAt)}}</h4>
          <h3>
            {{ idx + 1 }}. {{ video.videoOwnerChannelTitle }} - {{ video.title }}
            <a :href="`https://www.youtube.com/watch?v=${video.videoId}`" target="_blank">
              <!-- 기존 Apple Music 이미지 대신 YouTube 아이콘 또는 텍스트로 대체 -->
              <img class="youtube-icon-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/768px-YouTube_full-color_icon_%282017%29.svg.png?20240107144800">
            </a>
          </h3>
          <!-- description이 있다면 표시 (옵션, 현재 요청에선 제거) -->
          <!-- <p :style="{ whiteSpace: 'pre-line' }" v-html="video.description"></p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    year: { // 기존 year prop은 사용되지 않을 가능성이 높습니다.
      type: String,
      required: false,
    },
  },
  data() {
    return {
      jukeBox: 'https://www.youtube.com/embed/?listType=playlist&list=PLp4i3bBl_j23_sMaXfKPwexUqOnd8lAsV',
      searchQuery: '',
      sortOption: 'createdAt', // 기본값: 등록순 (API createdAt 필드)
      isDesc: true, // true = 내림차순 (최신순), false = 오름차순 (오래된순)
      allVideos: [], // API에서 불러온 모든 비디오 데이터
      filteredVideos: [], // 검색 및 정렬된 비디오 데이터
      API_URL: 'http://158.180.66.250:8080/api/videos', // ✅ 여기에 여러분의 API 주소를 정확히 입력하세요.
      API_URL_LOCAL: 'http://localhost:8080/api/videos',
    };
  },
  computed: {
    // computed.albums 대신 allVideos를 직접 사용합니다.
  },
  async mounted() {
    try {
      window.global ||= window;
      const axios = require('axios').default
      const response = await axios.get(this.API_URL_LOCAL);
      // API 응답 구조에 따라 데이터를 저장
      this.allVideos = response.data.map(video => ({
        ...video,
        // 필요에 따라 필드명 조정 (예: 'artist'는 videoOwnerChannelTitle로)
        artist: video.videoOwnerChannelTitle, 
        // link는 YouTube videoId를 사용하여 직접 생성
        link: `https://www.youtube.com/watch?v=${video.videoId}`,
        img: video.thumbnailUrl || `https://placehold.co/200x200/e2e8f0/64748b?text=No+Image`, // 썸네일 없으면 폴백
      }));
      this.filteredVideos = [...this.allVideos];
      this.sortVideos(); // 초기 로드 후 정렬 적용

    } catch (error) {
      console.error("비디오 데이터를 불러오는 중 오류 발생:", error);
      // 사용자에게 에러 메시지를 표시할 수 있습니다.
    }

    this.handleInitialScroll();

    // URL 쿼리에서 search 파라미터 읽어서 필터 적용
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      this.searchQuery = searchParam;
      this.filterVideos();
    }
  },
  methods: {
    videoId(id) { // albumId 대신 videoId 사용
      return `video-${id}`;
    },
    changeJukebox(videoId) { // link 대신 videoId를 받도록 변경
      this.jukeBox = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    formatDate(dateString) { // 날짜 포맷팅 함수 추가 (YYYY-MM-DD 형식으로)
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    },
    handleInitialScroll() {
      const params = new URLSearchParams(window.location.search);
      const videoParam = params.get('video'); // 'album' 대신 'video' 파라미터
      if (videoParam) {
        const targetVideo = this.allVideos.find(video =>
          String(video.id) === videoParam // ID로 직접 찾기
        );
        if (targetVideo) {
          this.$nextTick(() => {
            const targetElement = document.getElementById(
              this.videoId(targetVideo.id)
            );
            if (targetElement) {
              const rect = targetElement.getBoundingClientRect();
              const offset = 70;
              const targetPosition = window.scrollY + rect.top - offset;
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
              });
            }
          });
        }
      }
    },
    filterVideos() { // filterAlbums 대신 filterVideos
      const query = this.searchQuery.toLowerCase();
      this.filteredVideos = this.allVideos.filter(video =>
        // 제목과 채널명에서 검색
        video.title.toLowerCase().includes(query) ||
        video.videoOwnerChannelTitle.toLowerCase().includes(query)
      );
      this.sortVideos();
    },
    toggleOrder() {
      this.isDesc = !this.isDesc;
      this.sortVideos();
    },
    sortVideos() { // sortAlbums 대신 sortVideos
      if (!this.filteredVideos.length) return;

      const order = this.isDesc ? 1 : -1;

      this.filteredVideos.sort((a, b) => {
        switch (this.sortOption) {
          case 'publishedAt': // 발행일 (publishedAt 필드 사용)
            return (new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()) * order;
          case 'createdAt': // 등록순 (createdAt 필드 사용)
            return (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) * order;
          case 'title': // 제목 가나다순
            return a.title.localeCompare(b.title, 'ko') * order;
          case 'channelTitle': // 채널명 가나다순
            return a.videoOwnerChannelTitle.localeCompare(b.videoOwnerChannelTitle, 'ko') * order;
          default:
            return 0;
        }
      });
    },
  },
};
</script>

<style scoped>
/* 기존 스타일은 유지 */
.controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px; /* 간격 통일 */
  margin-bottom: 10px;
  flex-wrap: nowrap; /* 가로 한 줄 유지 */
}

.search-box,
.sort-dropdown,
.order-toggle {
  padding: 5px 8px;
  font-size: 0.9em;
  border: 1px solid #ccc;
  border-radius: 4px; /* 아주 살짝 둥글게 */
  background: white;
  margin: 0; /* 기본 margin 제거 */
}

.order-toggle {
  cursor: pointer;
  background: #f5f5f5;
  user-select: none;
  border-radius: 4px;
  line-height: 1;
  font-weight: bold;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

h3 {
  margin: 2px 0 0 0;
}
p {
  margin: 7px 0 0 0;
  font-size: 0.85em;
}
h4 {
  margin: 0 0;
}

.container {
  display: flex;
  padding-top: 20px;
  scroll-margin-block-start: 70px;
}
.youtube-icon-img { /* Apple Music 이미지 클래스명 변경 */
  width: 20px;
  height: 20px;
  vertical-align: middle; /* 텍스트와 이미지 정렬 */
  margin-left: 5px;
}
.album-img {
  cursor: pointer;
  width: 200px;
  height: 200px;
}
.blog-content {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 50px;
}

.no-jukebox-placeholder {
  text-align: center;
  padding: 50px;
  border: 1px dashed #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  color: #666;
  font-size: 1.2em;
}


@media (max-width: 800px) {
  p {
    font-size: 0.9em;
  }
  .container {
    flex-direction: column;
    padding-top: 40px;
  }
  .blog-content {
    margin: 20px;
  }
  .wrap {
    margin: auto;
  }
  .controls {
    flex-wrap: nowrap; /* 한 줄로 유지 */
    gap: 6px; /* 간격 조금 좁게 */
    justify-content: flex-start; /* 왼쪽 정렬 */
    overflow-x: auto; /* 넘치면 가로 스크롤 */
    padding-bottom: 5px; /* 스크롤바와 내용 겹침 방지 */
  }
  .search-box {
    flex: 1 1 auto; /* 가능한 넓게 */
    min-width: 120px;
  }
  .sort-dropdown {
    flex: 0 0 auto; /* 고정 크기 */
    width: 120px;
  }
  .order-toggle {
    flex: 0 0 auto; /* 고정 크기 */
    width: 28px; /* 좀 더 작게 */
    height: 28px;
    font-size: 1em; /* 버튼 내부 글자 크기 조정 */
    padding: 0;
  }
}
</style>