<template>
    <div class="music__item_preview">
        <transition name="slide-fade-down" appear>
            <router-link :to="{name: 'music'}">
                <div class="music__item_close" @mouseover="changePointerHover()" @mouseout="changePointerUnhover()"></div>
            </router-link>
        </transition>
        <MusicItem class="music__item_preview_el" :itemdata="itemdata"></MusicItem>
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
                itemdata: this.$route.params.itemprop
            }
        },
        mounted(){
            setTimeout(function () {
                document.querySelector('.music__item_preview_el').classList.add('music__item_preview_el_animated');
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
    .audio_block{
        position: absolute;
        width: 100%;
        top: calc(50% + 18rem);
        padding: 3rem 0;
        opacity: 0;
        transition: all .6s;
    }
    .audio_block_animated{
        opacity: 1;
        transform: translateY(-3rem) scale(1.1);
    }
    .audio_item_block{
        width: 50rem;
        margin: 0 auto;
    }
    .audio_item_name{
        text-transform: uppercase;
        color: #fff;
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
    }
    .audio_item{
        margin-top: -20px;
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
</style>