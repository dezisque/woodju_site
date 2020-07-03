<template>
    <div class="events__section">
        <div class="events__inner">
            <swiper :options="swiperOption" ref="eventsSwiper" class="music__slider" >
                <swiper-slide>
                    <span class="event__date">31.01.2020</span>
                    <div class="event__cover"></div>
                </swiper-slide>
                <swiper-slide>
                    <span class="event__date">31.01.2020</span>
                    <div class="event__cover"></div>
                </swiper-slide>
                <swiper-slide>
                    <span class="event__date">31.01.2020</span>
                    <div class="event__cover"></div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    // TODO: bug with pointer_circle
    export default{
        data(){
            return{
                swiperOption: {
                    touchStartPreventDefault: false,
                    lazy: true,
                    direction: 'vertical',
                    slidesPerView: 2,
                    spaceBetween: 100,
                    speed: 500,
                    centeredSlides: true,
                    mousewheel: true,
                    watchSlidesProgress: true,
                    watchSlidesVisibility: true
                }
            }
        },
        components:{
            Swiper,
            SwiperSlide
        },
        computed:{
            swiper() {
                return this.$refs.eventsSwiper.$swiper
            }
        },

        beforeRouteEnter (to, from, next) {
            setTimeout(function () {
                document.querySelector('.main__logo').classList.remove('main__logo_animated');
                document.querySelector('.main__background_overlay').classList.remove('main__background_overlay_animated');
                document.querySelector('.main__navigation').classList.remove('main__navigation_animated');
                document.querySelector('.main__author').classList.remove('main__author_animated');
                document.querySelector('.main__social').classList.remove('main__social_animated');
                document.querySelector('.main__background').classList.remove('main__background_animated');
            }, 700);
            setTimeout(function () {
                next();
                document.querySelector('.panel_left').classList.remove('panel__left_animate');
                document.querySelector('.panel_right').classList.remove('panel__right_animate');
            }, 1000);
        },

        beforeRouteLeave (to, from, next) {
            setTimeout(function () {
                document.querySelector('.main__logo').classList.add('main__logo_animated');
            }, 300);
            setTimeout(function () {
                document.querySelector('.main__navigation').classList.add('main__navigation_animated');
                document.querySelector('.main__social').classList.add('main__social_animated');
                document.querySelector('.main__author').classList.add('main__author_animated');
                document.querySelector('.hello').classList.add('hello_animated');
            }, 600);
            setTimeout(function () {
                document.querySelector('.main__background').classList.add('main__background_animated');
                document.querySelector('.main__background_overlay').classList.add('main__background_overlay_animated');
            }, 900);

            setTimeout(function () {
                document.querySelector('.panel_left').classList.add('panel__left_animate');
                document.querySelector('.panel_right').classList.add('panel__right_animate');
            }, 1500);

            setTimeout(function () {
                next();
            }, 1900);
        },
    }
</script>

<style lang="scss">
    .events__section{
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100vh;
    }
    .events__inner{
        position: absolute;
        width: 100%;
        text-align: center;
    }
    .event__date{
        color: white;
        font-family: 'Montserrat', sans-serif;
        font-size: 3rem;
        font-weight: bold;
    }
    .event__cover{
        margin: 2rem auto 0 auto;
        height: 25rem;
        width: 25rem;
        background: url("../assets/covers/cover1.jpg");
        background-size: cover;
    }
</style>