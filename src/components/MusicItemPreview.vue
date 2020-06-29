<template>
    <div class="music__item_preview">
        <transition name="slide-fade-down" appear>
            <router-link :to="{name: 'music'}">
                <div class="music__item_close" @mouseover="changePointerHover()" @mouseout="changePointerUnhover()"></div>
            </router-link>
        </transition>
        <MusicItem class="music__item_preview_el" :itemdata="itemdata"></MusicItem>
        <div class="music__item_preview_socialgrid">
            <h2 class="socialgrid_title">Слушайте на всех площадках:</h2>
            <div class="break"></div>
            <div v-for="n in itemdata.links.length" :key="n" :class="((n-1) != 0 && (n-1) % 5 == 0) ? 'break' : 'socialgrid_item'">
                <a :href="itemdata.links[n-1]"><img class="socialgrid_item_icon" :src="require('../assets/social/musicitem/' + icons[n-1])" /></a>
            </div>
        </div>
    </div>
</template>
<script>
    import MusicItem from '@/components/MusicItem'
    import AudioPlayer from '@/components/AudioPlayer'
    export default{
        components:{
            MusicItem,
        },
        data(){
            return{
                itemdata: this.$route.params.itemprop,
                icons: [
                    'apple_music.svg',
                    'boom.svg',
                    'itunes.svg',
                    'yandex_music.svg',
                    'youtube_music.svg',
                    'youtube_music.svg',
                    'youtube_music.svg',
                    'youtube_music.svg',
                ]
            }
        },
        mounted(){
            setTimeout(function () {
                document.querySelector('.music__item_preview_el').classList.add('music__item_preview_el_animated');
                document.querySelector('.music__item_preview_socialgrid').classList.add('music__item_preview_socialgrid_animated');
            },300)

        },
        methods: {
            changePointerHover(){
                document.getElementById('pointer__circle').classList.add('pointer__circle_active');
            },
            changePointerUnhover(){
                document.getElementById('pointer__circle').classList.remove('pointer__circle_active');
            },
        },
        /* eslint-disable no-alert, no-console */
        beforeRouteEnter(to, from, next){
            setTimeout(()=>{
                document.querySelector('.main__navigation').classList.add('main__navigation_animated');
                document.querySelector('.main__logo').classList.add('main__logo_animated');

            }, 100)
            setTimeout(()=>{
                document.querySelector('.main__navigation').style.visibility = "hidden";
                document.querySelector('.main__logo').style.visibility = "hidden";
                next();
            }, 150)

        },
        beforeRouteLeave(to, from, next){
            document.querySelector('.main__navigation').style.visibility = "visible";
            document.querySelector('.main__logo').style.visibility = "visible";
            document.querySelector('.music__item_preview_socialgrid').classList.remove('music__item_preview_socialgrid_animated');
            document.querySelector('.music__item_preview_el').classList.remove('music__item_preview_el_animated');
            document.querySelector('.music__item_close').classList.add('music__item_close_disappear');
            document.querySelector('.main__navigation').classList.remove('main__navigation_animated');
            document.querySelector('.main__logo').classList.remove('main__logo_animated');
            setTimeout(()=>{
                next();
            }, 600)
        }
    }
</script>
<style lang="scss">
    :root {
        --scale--ratio-music_item: 1;
    }
    .music__item_preview{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        width: 100%;
        height: 100vh;
        background-color: #222;
    }
    .music__item_description{
        position: relative;
        z-index: 3;
        color: #fff;
    }
    .music__item_preview_el{
        transform: scale(1);
        transition: transform .6s;
    }
    .music__item_preview_el_animated{
        --scale--ratio-music_item: 1.2;
        transform: translateY(-8rem) scale(1.2);
    }

    .music__item_close{
        width: 4rem;
        height: 4rem;
        border: 2px solid white;
        border-radius: 50%;
        position: fixed;
        right: 3rem;
        top: 2rem;
        z-index: 3;
        transition: opacity,transform .5s;
    }
    .music__item_close:before {
        content: '';
        width: 3rem;
        height: 3rem;
        border-top: 2px solid white;
        transform: rotate(45deg);
        position: absolute;
        left: -0.5rem;
        top: 1.5rem;
    }
    .music__item_close:after {
        content: '';
        width: 3rem;
        height: 3rem;
        border-top: 2px solid white;
        transform: rotate(-45deg);
        position: absolute;
        left: 1.5rem;
        top: 1.5rem;
    }
    .music__item_close:hover{
        transform: scale(0.8);
        border-color: rgba(255,200,0,1);
    }
    .music__item_close:hover:before, .music__item_close:hover:after{
        border-color: rgba(255,200,0,1);
    }
    .music__item_close_disappear{
        opacity: 0;
    }
    .music__item_preview_socialgrid{
        display: flex;
        flex-wrap: wrap;
        margin: 0 -0.5rem;
        justify-content: center;
    }
    .music__item_preview_socialgrid{
        position: absolute;
        top: calc(50% + 16rem);
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        transition: all .6s;
    }
    .music__item_preview_socialgrid_animated{
        opacity: 1;
    }
    .socialgrid_item{
        margin: 0 0.5rem;
    }
    .socialgrid_item_icon{
        width: 3rem;
    }
    .socialgrid_title{
        font-family: 'Montserrat', sans-serif;
        color: #ffc801;
        font-size: 1.4rem;
    }
    .break {
        flex-basis: 100%;
        height: 0;
        visibility: hidden;
        padding-top: 0.5rem;
    }
</style>