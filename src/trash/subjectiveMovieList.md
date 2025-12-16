---
lastUpdated: 2025/02/18 14:15:00
subTitle: 이제 검증되지 않은 영화를 영화관에서 보는건 고문이다
image: https://m.media-amazon.com/images/M/MV5BYzFlMTJjYzUtMWFjYy00NjkyLTg1Y2EtYmZkMjdlOGQ1ZGYwL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg
---

# 주관적 취향이 다분한 Movie(+Series) 리스트

> ......이제 검증되지 않은 영화를 영화관에서 보는건 고문이다   
> ## [leekyounghwa's IMDB Watchlist](https://www.imdb.com/user/ur191119219/watchlist/?ref_=ext_shr_lnk)  
> 여기서 n번 시청한 영화 리스트업

<br/>

<template v-for="(movie, idx) in movies" >
    <div class="container" :id="movieId(movie.name)">
            <a :href="movie.link" target="_blank"><img class="movie-img" :src="movie.img"/></a>
        <div class="blog-content">
            <h4>{{movie.date}}</h4>
            <h3>
                <a :href="`#${movieId(movie.name)}`"
                    class="header-anchor"
                    aria-hidden="true">#</a>
                {{idx+1}}. {{movie.name}}
            </h3>
            <p>{{movie.memo}}</p>
            <ul><li class="star" v-for="star in movie.star">⭐</li></ul>
        </div>
    </div>
</template>

<script>
import movieList from '@data/movieList.json'

export default {
    methods: {
        movieId(name) {
            return name.replaceAll(' ', '-');
        },
    },
    data() {
        return {
            movies: movieList.subjective,
        }
    }
}
</script>

<style scoped>
h3 {
    margin-top: 10px;
    margin-bottom: 0;
}

p {
    margin-top: 10px;
    margin-bottom: 0;
    font-size: 0.9em;
}

h4 {
    margin-bottom: 0;
}

ul {
    padding: 0;
    margin: 0;
}

.container {
    display: flex;
    scroll-margin-block-start: 70px;
    flex-wrap: wrap; /* Wrap the items to prevent overflow */
}

.movie-img {
    cursor: pointer;
    height: 200px;
    width: 150px;
    margin-right: 40px;
    object-fit: cover; 
}

.blog-content {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-left: 20px;
    padding-right: 20px;
}

.star {
    display: inline-block; /* 원래대로 가로 정렬 */
    margin-right: 2px; /* Optional: 별 사이 간격 조정 */
    font-size: 1.3em; /* 폰트 크기를 1.5배로 설정 */
}

ul {
    padding: 0;
    margin: 0;
    display: flex; /* ul을 flex로 만들어 가로 정렬 */
    list-style-type: none; /* 불필요한 기본 마커 없애기 */
}

@media (max-width: 800px) {
    .container {
        margin-top: 80px;
        flex-direction: column;
        align-items: center; /* 이미지와 콘텐츠를 가운데 정렬 */
    }
    
    .movie-img {
        height: 200px;
        margin-right: 0;
        margin-bottom: 20px; /* Optional, if you want space below the image */
    }
    
    .blog-content {
        text-align: left; /* 텍스트를 왼쪽으로 정렬 */
        flex: 1; /* flex 값을 1로 설정하여 공간을 고르게 분배 */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start; /* 자식 요소들을 왼쪽으로 정렬 */
        width: 100%; /* 블로그 콘텐츠 너비를 100%로 설정하여 박스 크기 일관되게 */
        box-sizing: border-box; /* 여백과 패딩을 포함한 크기 계산 */
    }

    .blog-cover {
        margin: 0 auto;
    }
}
</style>