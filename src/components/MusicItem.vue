<template>
    <div class="music__slider_item" @mouseover="state == 'show' ? changePointerHover() : ''" @mouseout="state == 'show' ? changePointerUnhover() : ''">
        <div class="music__slider_item_inner">
            <div class="music__slider_item_img" :id="itemdata.id" :style="{'background-image':'url(' + require('../assets/covers/' + itemdata.coverUrl + '.jpg') + ')'}"></div>
            <p  class="music__slider_item_name" :id="itemdata.id">{{ itemdata.title }}</p>
            <p  class="music__slider_item_date" :id="itemdata.id">{{ itemdata.date }}</p>
        </div>
    </div>
</template>

<script>
    export default{
        props: ['itemdata', 'state'],
        data(){
            return{
            }
        },
        methods:{
            changePointerHover(e){
                document.getElementById('pointer__circle').classList.add('pointer__circle_active_music');
            },
            changePointerUnhover(e){
                document.getElementById('pointer__circle').classList.remove('pointer__circle_active_music');
            }
        }
    }
</script>

<style lang="scss">
    .music__slider_item{
        position: absolute;
        top: calc(50% - 15rem);
        text-align: left;
        line-height: 0;
    }
    .music__slider_item_img{
        width: 30rem;
        height: 30rem;
        background-size: cover;
        transition: height .6s, transform 1s;
    }
    .music__slider_item_img_animated{
        height: 0;
    }
    .music__slider_item img{
        width: 100%;
    }
    .music__slider_item_name, .music__slider_item_date{
        color: white;
        text-transform: uppercase;
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
        font-size: 1.5rem;
        transition: opacity .8s, transform 1s;
    }
    .music__slider_item_text_animated{
        opacity: 0;
    }
    .music__slider_item_date{
        font-size: 1rem;
    }
    .music__slider_item_inner{
        position: relative;
        z-index: 3;
        margin: 0 auto;
        width: 30rem;
    }
</style>