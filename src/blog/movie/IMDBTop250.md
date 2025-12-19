---
title: IMDb Top 250
lastUpdated: 2025/12/01 17:10:00
subTitle: 포스터 사고싶었으나 돈없..
image: https://m.media-amazon.com/images/G/01/imdb/images/social/imdb_logo.png
---

<template>
  <div class="top-250-watchlist">
    <h1>IMDb Top 250</h1>
    <div class="poster-grid">
      <div
        v-for="movie in movies"
        :key="movie.index"
        class="poster-container"
        :class="{ 'is-watched': movie.watched }"
        @click="goToReview(movie.reviewLink)"
      >
        <img :src="movie.poster" :alt="movie.name" class="movie-poster" loading="lazy">
        <div class="movie-info">
          <p class="movie-title">{{ movie.name }}</p>
          <p class="movie-meta">({{ movie.year }})</p>
          <p class="movie-meta">⭐ {{ movie.rating }}</p>
          <a :href="movie.link" target="_blank" class="imdb-link" @click.stop>
            <span class="imdb-icon">★</span> IMDb
          </a>
        </div>
        <div class="unwatched-cover" v-if="!movie.watched">
          </div>
        <div class="movie-index">{{ movie.index }}</div>
      </div>
    </div>
  </div>
</template>

<script>

import imdbtop250 from '@data/imdb-top250.json'

export default {
  name: 'ImdbTop250',
  data() {
    return {
      movies: imdbtop250
    };
  },
  methods: {
    goToReview(reviewLink) {
      if (reviewLink) {
        this.$router.push('/blog/movie' + reviewLink);
      } else {
        alert("아직 감상평 링크가 없습니다.");
      }
    }
  }
};
</script>

<style scoped>
/* IMDB Top 250 스타일 */
.top-250-watchlist {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 0.5em;
}


.poster-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px; /* 포스터 사이 간격 */
}

.poster-container {
  position: relative;
  width: calc(10% - 10px); /* 가로 10개, gap을 고려하여 계산 */
  aspect-ratio: 9/13.3; /* 포스터 비율 (예시: 90px x 133px) */
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.poster-container:hover {
  transform: scale(1.05);
  z-index: 10;
}

.movie-poster {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  filter: saturate(100%);
}

.poster-container:not(.is-watched) .movie-poster {
  filter: grayscale(100%) brightness(50%); /* 안 본 영화: 흑백 & 어둡게 */
  transition: filter 0.3s ease;
}

/* 마우스 오버 시 정보 표시 */
.movie-info {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  text-align: center;
  box-sizing: border-box;
}

.poster-container:hover .movie-info {
  opacity: 1;
}

.movie-title {
  font-weight: bold;
  font-size: 0.9em;
  padding-top: 15px;
  line-height: 1.2;
  margin:0;
}

.movie-meta {
  margin: 0px;
  font-size: 0.8em;
  color: #ccc;
}

.imdb-link {
  color: #f5c518; /* IMDb 대표 색상 */
  text-decoration: none;
  font-size: 0.7em;
  padding: 5px 10px;
  margin: 5px;
  border: 1px solid #f5c518;
  border-radius: 3px;
  background: rgba(245, 197, 24, 0.1);
  transition: background 0.2s;
}

.imdb-link:hover {
  background: rgba(245, 197, 24, 0.3);
}

.imdb-icon {
  margin-right: 3px;
}

.unwatched-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 스크래치 질감 효과를 위해 배경색이나 패턴을 사용할 수 있습니다. */
  background: rgba(255, 255, 255, 0.1); 
  mix-blend-mode: overlay; /* 포스터 위에 얇은 질감 레이어 추가 */
  pointer-events: none; /* 클릭 이벤트 방해하지 않도록 설정 */
  z-index: 5;
}

.movie-index {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 5px;
  font-size: 0.7em;
  font-weight: bold;
  z-index: 6;
}
@media (max-width: 768px) {

  /* 제목 크기 조정 */
  h1 {
    font-size: 2em;
  }

  /* 모바일 화면: 가로 3개 배치 */
  .poster-container {
    /* 가로 3개 배치: (100% / 3) - (gap 크기) */
    width: calc(33.333% - 7px); /* 10px gap을 고려하여 약 7px 정도를 빼줍니다. */
  }

  /* 모바일에서는 hover 효과 비활성화/축소 */
  .poster-container:hover {
    transform: none; /* 확대 효과 제거 */
    z-index: initial;
  }

  /* 모바일 터치 환경에서는 hover 정보를 항상 숨김 (클릭 이벤트에 집중) */
  .movie-info {
    opacity: 0; 
    /* 필요에 따라, 안 본 영화의 경우에만 불투명도를 살짝 주어 정보를 표시할 수도 있습니다.
   .poster-container:not(.is-watched) .movie-info { opacity: 0.2; } */
 }
 
 /* 안 본 영화의 필터 밝기 조정 */
 .poster-container:not(.is-watched) .movie-poster {
  filter: grayscale(100%) brightness(60%); /* 너무 어두워지지 않게 60%로 상향 조정 */
 }
 
 /* 포스터 정보 글꼴 크기 축소 */
 .movie-title {
  font-size: 0.8em;
 }

 .movie-meta,
 .imdb-link {
  font-size: 0.65em;
 }
 
 .movie-index {
  font-size: 0.6em;
 }
}
</style>
