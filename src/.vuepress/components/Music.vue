<template>
    <div>
        <iframe 
            :src="jukeBox" 
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
            frameborder="0" 
            height="450" 
            style="width:100%;overflow:hidden;border-radius:10px;padding-bottom: 20px;" 
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation">
        </iframe>

        <!-- 검색 & 정렬 UI -->
        <div class="controls">
            <input
                type="text"
                v-model="searchQuery"
                placeholder="검색 (앨범명 / 아티스트)"
                @keyup="filterAlbums"
                class="search-box"
            />
            <select v-model="sortOption" @change="sortAlbums" class="sort-dropdown">
                <option value="register">등록순</option>
                <option value="release">발매순</option>
                <option value="album">앨범명 가나다순</option>
                <option value="artist">아티스트명 가나다순</option>
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

        <h4> albumlist {{filteredAlbums.length}} </h4>

        <div v-for="(album, idx) in filteredAlbums" :key="albumId(album.artist, album.name)">
            <div class="container" :id="albumId(album.artist, album.name)">
                <div class="wrap" @click="changeJukebox(album.link)">
                    <img-lazy class="album-img" :src="album.img"/>
                </div>
                <div class="blog-content">
                    <h4>{{album.date}}</h4>
                    <h3>
                        {{idx + 1}}. {{album.artist}} - {{album.name}} 
                        <span v-if="album.year">({{album.year}})</span>
                        <a :href="album.link" target="_blank">
                            <img class="apple-music-img" src="@image/2024/apple-music.png">
                        </a>
                    </h3>
                    <p :style="{ whiteSpace: 'pre-line' }" v-html="album.memo"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { albumList } from '@data/albumList.js';

export default {
    props: {
        year: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            jukeBox: '',
            searchQuery: '',
            sortOption: 'register', // 기본값: 등록순
            isDesc: true, // true = 내림차순 (최신순), false = 오름차순 (오래된순)
            filteredAlbums: [],
        };
    },
    computed: {
        albums() {
            if (this.year) {
                return albumList[this.year] || [];
            }
            return Object.entries(albumList)
                .reverse()
                .flatMap(([_, albums]) => albums);
        },
    },
    created() {
        const firstAlbum = this.albums[0];
        if (firstAlbum) {
            this.jukeBox = firstAlbum.link.replace('music', 'embed.music');
        }
        this.filteredAlbums = [...this.albums];
        this.sortAlbums();
    },
    mounted() {
        this.handleInitialScroll();

        // URL 쿼리에서 search 파라미터 읽어서 필터 적용
        const params = new URLSearchParams(window.location.search);
        const searchParam = params.get('search');
        if (searchParam) {
            this.searchQuery = searchParam;
            this.filterAlbums();
        }
    },
    methods: {
        albumId(artist, name) {
            return `${artist}-${name}`.replaceAll(' ', '-');
        },
        changeJukebox(link) {
            this.jukeBox = link.replace('music', 'embed.music');
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        },
        handleInitialScroll() {
            const params = new URLSearchParams(window.location.search);
            const albumParam = params.get('album');
            if (albumParam) {
                const normalizedTarget = albumParam.toLowerCase().replace(/\s+/g, '');
                const targetAlbum = this.albums.find(album =>
                    album.name.toLowerCase().replace(/\s+/g, '') === normalizedTarget
                );
                if (targetAlbum) {
                    this.$nextTick(() => {
                        const targetElement = document.getElementById(
                            this.albumId(targetAlbum.artist, targetAlbum.name)
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
        filterAlbums() {
            const query = this.searchQuery.toLowerCase();
            this.filteredAlbums = this.albums.filter(album =>
                album.name.toLowerCase().includes(query) ||
                album.artist.toLowerCase().includes(query)
            );
            this.sortAlbums();
        },
        toggleOrder() {
            this.isDesc = !this.isDesc;
            this.sortAlbums();
        },
        sortAlbums() {
            if (!this.filteredAlbums.length) return;

            const order = this.isDesc ? 1 : -1;

            this.filteredAlbums.sort((a, b) => {
                switch (this.sortOption) {
                    case 'release':
                        return ((b.year || 0) - (a.year || 0)) * order;
                    case 'register':
                        return (this.albums.indexOf(a) - this.albums.indexOf(b)) * order;
                    case 'album':
                        return a.name.localeCompare(b.name, 'ko') * order;
                    case 'artist':
                        return a.artist.localeCompare(b.artist, 'ko') * order;
                    default:
                        return 0;
                }
            });
        },
    },
};
</script>

<style scoped>
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
.apple-music-img {
    width: 20px;
    height: 20px;
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
        flex-wrap: nowrap;    /* 한 줄로 유지 */
        gap: 6px;             /* 간격 조금 좁게 */
        justify-content: flex-start; /* 왼쪽 정렬 */
        overflow-x: auto;     /* 넘치면 가로 스크롤 */
    }
    .search-box {
        flex: 1 1 auto;       /* 가능한 넓게 */
        min-width: 120px;
    }
    .sort-dropdown {
        flex: 0 0 auto;       /* 고정 크기 */
        width: 120px;
    }
    .order-toggle {
        flex: 0 0 auto;       /* 고정 크기 */
        width: 28px;          /* 좀 더 작게 */
        height: 28px;
        font-size: 1em;       /* 버튼 내부 글자 크기 조정 */
        padding: 0;
    }
}
</style>