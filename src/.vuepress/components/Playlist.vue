<template>
  <div>
    <!-- Jukebox Player (YouTube IFrame Player API로 제어) -->
    <div id="player-container" class="youtube-player-container" ref="playerContainer"></div>
    <div v-if="!currentVideoId" class="no-jukebox-placeholder">
      재생할 비디오를 선택해주세요.
    </div>

    <!-- 검색 & 정렬 UI -->
    <div class="controls">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="비디오 검색 (제목 / 채널명 / 설명)"
        @keyup="filterVideos"
        class="search-box"
      />
      <select v-model="sortOption" @change="sortVideos" class="sort-dropdown">
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
        <div class="wrap" @click="playVideo(video.videoId)">
          <img class="album-img" :src="video.thumbnailUrl" :alt="video.title"/>
        </div>
        <div class="blog-content">
          <h4>{{ formatDate(video.publishedAt) }}</h4>
          <div class="video-info">
            <h3 class="channel-title">
              {{ idx + 1 }}. Channel : {{ video.videoOwnerChannelTitle }}
              <a :href="`https://www.youtube.com/watch?v=${video.videoId}`" target="_blank">
                <img class="youtube-icon-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/768px-YouTube_full-color_icon_%282017%29.svg.png?20240107144800">
              </a>
            </h3>
            <h3 class="video-title">Title : {{ video.title }}</h3>
          </div>
          
          <!-- Description 접기/펴기 기능 -->
          <div v-if="video.description" class="description-section">
            <button @click="toggleDescription(video)" class="description-toggle-btn">
              Description {{ video.showDescription ? '▲' : '▼' }}
            </button>
            <p v-if="video.showDescription" class="video-description" v-html="video.description"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    year: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      player: null, // YouTube Player 인스턴스를 저장할 변수
      currentVideoId: '', // 현재 재생 중인 비디오 ID
      searchQuery: '',
      sortOption: 'publishedAt', // 'createdAt' 제거, 발행일순으로 초기 설정
      isDesc: true,
      allVideos: [], // API에서 불러온 모든 비디오 데이터 (각 비디오에 showDescription 추가)
      filteredVideos: [], // 검색 및 정렬된 비디오 데이터
      API_URL: 'https://api.leekyounghwa.com/api/videos', // ✅ 여러분의 API 주소를 입력하세요.
      // API_URL_LOCAL: 'http://localhost:8080/api/videos', // 로컬 테스트용 (필요 시)
    };
  },
  async mounted() {
    try {
      window.global ||= window;
      const axios = require('axios').default
      const response = await axios.get(this.API_URL);
      this.allVideos = response.data.map(video => ({
        ...video,
        artist: video.videoOwnerChannelTitle, // 기존 로직 유지
        link: `https://www.youtube.com/watch?v=${video.videoId}`, // 기존 로직 유지
        img: video.thumbnailUrl || `https://placehold.co/200x200/e2e8f0/64748b?text=No+Image`, // 기존 로직 유지
        showDescription: false, // ✅ 설명 접기/펴기 상태를 위한 플래그 추가
      }));
      this.filteredVideos = [...this.allVideos];
      this.sortVideos();

      // 첫 번째 비디오 ID로 플레이어 초기화 시도
      const firstVideo = this.filteredVideos[0];
      if (firstVideo && firstVideo.videoId) {
        this.currentVideoId = firstVideo.videoId;
        this.loadYouTubeIframeAPI(); // YouTube API 로드
      }
    } catch (error) {
      console.error("비디오 데이터를 불러오는 중 오류 발생:", error);
      // 에러 메시지 표시 로직 추가 (예: alert, 토스트)
    }

    this.handleInitialScroll();

    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      this.searchQuery = searchParam;
      this.filterVideos();
    }
  },
  beforeUnmount() {
    // 컴포넌트가 파괴되기 전에 플레이어 인스턴스를 정리합니다.
    if (this.player && typeof this.player.destroy === 'function') {
      this.player.destroy();
    }
  },
  methods: {
    videoId(id) {
      return `video-${id}`;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    },
    handleInitialScroll() {
      const params = new URLSearchParams(window.location.search);
      const videoParam = params.get('video');
      if (videoParam) {
        const targetVideo = this.allVideos.find(video =>
          String(video.id) === videoParam
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
    filterVideos() {
      const query = this.searchQuery.toLowerCase();
      this.filteredVideos = this.allVideos.filter(video =>
        video.title.toLowerCase().includes(query) ||
        video.videoOwnerChannelTitle.toLowerCase().includes(query) ||
        (video.description && video.description.toLowerCase().includes(query)) // ✅ 설명 검색 추가
      );
      this.sortVideos();
    },
    toggleOrder() {
      this.isDesc = !this.isDesc;
      this.sortVideos();
    },
    sortVideos() {
      if (!this.filteredVideos.length) return;

      const order = this.isDesc ? 1 : -1;

      this.filteredVideos.sort((a, b) => {
        switch (this.sortOption) {
          case 'publishedAt':
            return (new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()) * order;
          // 'createdAt' 정렬 옵션 제거됨
          case 'title':
            return a.title.localeCompare(b.title, 'ko') * order;
          case 'channelTitle':
            return a.videoOwnerChannelTitle.localeCompare(b.videoOwnerChannelTitle, 'ko') * order;
          default:
            return 0;
        }
      });
    },

    // ✅ Description 토글 메서드 추가
    toggleDescription(video) {
      video.showDescription = !video.showDescription;
    },

    // --- YouTube IFrame Player API 관련 메서드 ---
    loadYouTubeIframeAPI() {
      if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;
      } else {
        this.onYouTubeIframeAPIReady();
      }
    },
    onYouTubeIframeAPIReady() {
      if (this.currentVideoId && this.$refs.playerContainer) {
        // 기존 플레이어가 있으면 파괴하고 새로 만듭니다.
        if (this.player && typeof this.player.destroy === 'function') {
          this.player.destroy();
        }
        this.player = new YT.Player('player-container', {
          height: '450',
          width: '100%',
          videoId: this.currentVideoId,
          playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            'onReady': this.onPlayerReady,
            'onStateChange': this.onPlayerStateChange,
            'onError': this.onPlayerError
          },
        });
      }
    },
    onPlayerReady(event) {
      event.target.playVideo();
      console.log('YouTube Player 준비 완료:', this.currentVideoId);
    },
    onPlayerStateChange(event) {
      if (event.data === YT.PlayerState.ENDED) {
        console.log('동영상 재생 종료:', this.currentVideoId);
        this.playNextVideo();
      } else if (event.data === YT.PlayerState.PLAYING) {
        console.log('동영상 재생 중:', this.currentVideoId);
      }
    },
    onPlayerError(event) {
      console.error('YouTube Player 오류 발생:', event.data);
      this.playNextVideo(); 
    },
    playVideo(videoId) {
      if (this.player && typeof this.player.loadVideoById === 'function') {
        this.currentVideoId = videoId;
        this.player.loadVideoById(videoId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // 플레이어가 아직 초기화되지 않았거나 문제가 발생했을 때 새로 초기화 시도
        this.currentVideoId = videoId; // 비디오 ID 업데이트
        this.onYouTubeIframeAPIReady(); // 플레이어 생성 로직 다시 호출
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    playNextVideo() {
      const currentIndex = this.filteredVideos.findIndex(video => video.videoId === this.currentVideoId);
      if (currentIndex !== -1 && currentIndex < this.filteredVideos.length - 1) {
        const nextVideo = this.filteredVideos[currentIndex + 1];
        this.playVideo(nextVideo.videoId);
      } else {
        console.log('마지막 동영상 재생 완료. 다음 동영상이 없습니다.');
        // 모든 동영상 재생 후 첫 동영상으로 돌아가거나 멈추는 등의 로직 추가 가능
        // if (this.filteredVideos.length > 0) {
        //   this.playVideo(this.filteredVideos[0].videoId);
        // }
      }
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
.youtube-icon-img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
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

.youtube-player-container {
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
  position: relative; /* 자식 iframe의 위치 조정을 위해 */
  height: 0;
}
/* YouTube API가 생성하는 iframe에 대한 추가 스타일 (선택 사항) */
.youtube-player-container iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* ✅ 추가된 스타일 */
.video-info {
  margin-bottom: 10px; /* 채널/제목 정보와 설명 섹션 사이 간격 */
}

.channel-title {
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 5px;
}

.video-title {
  font-size: 1.1em;
  font-weight: normal; /* 제목은 채널명보다 조금 덜 강조 */
  margin-top: 0;
}

.description-section {
  margin-top: 10px;
}

.description-toggle-btn {
  background: #e0e0e0;
  border: 1px solid #ccc;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85em;
  margin-bottom: 5px;
  display: inline-block; /* 버튼이 너무 크지 않도록 */
}

.video-description {
  white-space: pre-line; /* 줄바꿈 유지 */
  font-size: 0.9em;
  color: #555;
  border-left: 3px solid #eee;
  padding-left: 10px;
  margin: 0;
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
    flex-wrap: nowrap;
    gap: 6px;
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 5px;
  }
  .search-box {
    flex: 1 1 auto;
    min-width: 120px;
  }
  .sort-dropdown {
    flex: 0 0 auto;
    width: 120px;
  }
  .order-toggle {
    flex: 0 0 auto;
    width: 28px;
    height: 28px;
    font-size: 1em;
    padding: 0;
  }
}
</style>
