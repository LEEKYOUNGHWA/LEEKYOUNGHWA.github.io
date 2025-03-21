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
        <h4> albumlist {{albums.length}} </h4>
        <div v-for="(album, idx) in albums">
            <div class="container" :id="albumId(album.artist, album.name)">
                <div class="wrap" @click="changeJukebox(album.link)">
                    <img-lazy class="album-img" :src="album.img"/>
                </div>
                <div class="blog-content">
                    <h4>{{album.date}}</h4>
                    <h3>
                        <a  class="header-anchor"
                            @click.prevent="scrollTo(album.artist, album.name)">#</a>
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
        };
    },
    computed: {
        albums() {
            if (this.year) {
                return albumList[this.year] || [];
            }
            return Object.entries(albumList)
            .reverse() // 키(연도) 순서를 역순으로 변경
            .flatMap(([_, albums]) => albums);
        },
    },
    created() {
        const firstAlbum = this.albums[0];
        if (firstAlbum) {
            this.jukeBox = firstAlbum.link.replace('music', 'embed.music');
        }
    },
    mounted () {
        this.handleInitialScroll();
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
        scrollTo(artist, name) {
            const id = this.albumId(artist, name);
            const targetElement = document.getElementById(id);
            console.log(id)
            if (targetElement) {
                const rect = targetElement.getBoundingClientRect();
                const offset = 60; // Padding from the top
                const targetPosition = window.scrollY + rect.top - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });
            }
        },
        handleInitialScroll() {
            const hash = window.location.hash;
            if (hash) {
                const targetId = hash.substring(1);  // '#' 이후 값만 추출
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const rect = targetElement.getBoundingClientRect();
                    const offset = 70; // Padding from the top
                    const targetPosition = window.scrollY + rect.top - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth',
                    });
                }
            }
        },
    },
};
</script>

<style scoped>
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
}
</style>