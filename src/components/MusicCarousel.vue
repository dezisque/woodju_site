<template>
    <div>
        <swiper :options="swiperOption" ref="mySwiper" class="music__slider" >
            <swiper-slide v-for="(item, index) in musicItems" :key="index">
                <router-link :to="{name: 'MusicItemPreview', params: { itemprop: item }}"><MusicItem :id="index" @click.native="changeSlide" :itemdata="item" :state="'show'"></MusicItem></router-link>
            </swiper-slide>
        </swiper>
        <router-view></router-view>
    </div>
</template>
<script>
    import MusicItem from '@/components/MusicItem'
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'

    export default{
        components:{
            MusicItem,
            Swiper,
            SwiperSlide
        },
        /* eslint-disable no-alert, no-console */
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper
            }
        },
        data() {
            return{
                index: 0,
                musicItems:[
                    {id: 0, title: 'Sod\'s Law', date: '2019', coverUrl: 'cover1', links: ['https://vk.com', 'https://youtube.com']},
                    {id: 1, title: 'S A U D A D E', date: '2019', coverUrl: 'cover2', links: []},
                    {id: 2, title: 'Take Me Away', date: '2019', coverUrl: 'cover3', links: []},
                ],
                swiperOption: {
                    touchStartPreventDefault: false,
                    lazy: true,
                    slidesPerView: 2,
                    spaceBetween: 200,
                    speed: 500,
                    centeredSlides: true,
                    mousewheel: true,
                }
            }
        },
        methods:{
            changeSlide(e){
                this.swiper.slideTo(e.target.id);
            },
        },
    }
</script>
<style lang="scss">
    .music__slider{
        height: 100vh;
    }
    .swiper-lazy-preloader{
        margin-left: 0;
    }
    .music__slider_item{
        text-align: center;
        width: 100%;
        margin: 0 auto;
    }
</style>