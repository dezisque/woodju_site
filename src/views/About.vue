<template>
    <div class="about__section">
        <div class="hello">
            <transition name="slide-fade-left" appear>
                <div>
                    <h2 class="about__section_title">
                        Woodju — электронный продюсер из Москвы, автор увесистых инструментальных прогрессий, сочетающих мощный наступательный вайб и пронзительные лиричные оттенки.
                    </h2>
                    <p class="about__section_description">
                        WoodJu является резидентом отечественного лейбла Abstrasension Records и фестивалей атмосферной электроники «Абстрасенция». На счету музыканта — выступления с Sorrow (UK), Vacant (UK), Sun Glitters (LUX), Arms and Sleepers (USA), Slow Magic (USA) и многими другими на главных площадках двух столиц.
                        WoodJu является резидентом отечественного лейбла Abstrasension Records и фестивалей атмосферной электроники «Абстрасенция». На счету музыканта — выступления с Sorrow (UK), Vacant (UK), Sun Glitters (LUX), Arms and Sleepers (USA), Slow Magic (USA) и многими другими на главных площадках двух столиц.
                        <br><br>Сам Woodju предпочитает не привязываться к жанрам, его больше привлекает атмосферность и настроение, умиротворение и меланхолия. Книжный нуар, фантастика, метафорические путешествия в будущее и личные переживания — основа композиций столичного продюсера.
                    </p>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    export default{
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
    .about__section{
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100vh;
    }
    .about__section_title, .about__section_description{
        font-family: 'Montserrat', sans-serif;
        color: #fff;
    }
    .about__section_title{
        text-transform: uppercase;
        font-weight: bold;
        font-size: 3rem;
    }
    .about__section_description{
        font-weight: normal;
        font-size: 1.3rem;
        padding-bottom: 10vh;
    }

</style>