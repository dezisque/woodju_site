<template>
    <div class="home__section">
        <div class="main__title_block">
            <transition name="slide-fade-left" appear><h1 class="main__title">Woodju</h1></transition>
            <transition name="slide-fade-right" appear><h2 class="main__subtitle">Official website</h2></transition>
        </div>
    </div>
</template>

<script>
    export default{
        beforeRouteEnter (to, from, next) {
            setTimeout(function () {
                document.querySelector('.main__logo').classList.remove('main__logo_animated');
                document.querySelector('.main__navigation').classList.remove('main__navigation_animated');
                document.querySelector('.main__background_overlay').classList.remove('main__background_overlay_animated');
                document.querySelector('.main__navigation').classList.remove('main__navigation_animated');
                document.querySelector('.main__social').classList.remove('main__social_animated');
                document.querySelector('.main__author').classList.remove('main__author_animated');
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
                document.querySelector('.main__title').classList.add('main__title_disappear');
                document.querySelector('.main__subtitle').classList.add('main__subtitle_disappear');
            }, 600);
            setTimeout(function () {
                document.querySelector('.main__background').classList.add('main__background_animated');
                document.querySelector('.main__background_overlay').classList.add('main__background_overlay_animated');
            }, 900);

            setTimeout(function () {
                document.querySelector('.panel_left').classList.add('panel__left_animate');
                document.querySelector('.panel_right').classList.add('panel__right_animate');
            }, 1400);

            setTimeout(function () {
                next();
            }, 2000);
        },
    }
</script>

<style lang="scss">
</style>