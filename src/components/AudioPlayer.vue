<template>
    <div class="audio-message-content">
        <a v-if="loaded" class="play-pause-btn" href="#" :title="playing ? 'Clique aqui para pausar o audio' : 'Clique aqui ouvir o audio'" @click.prevent="togglePlay">
            <svg key="pause" v-if="playing" x="0px" y="0px" viewBox="0 0 18 20" style="width: 18px; height: 20px; margin-top: -11px; fill: rgb(255,200,0);">
                <path d="M17.1,20c0.49,0,0.9-0.43,0.9-0.96V0.96C18,0.43,17.6,0,17.1,0h-5.39c-0.49,0-0.9,0.43-0.9,0.96v18.07c0,0.53,0.4,0.96,0.9,0.96H17.1z M17.1,20"/>
                <path d="M6.29,20c0.49,0,0.9-0.43,0.9-0.96V0.96C7.19,0.43,6.78,0,6.29,0H0.9C0.4,0,0,0.43,0,0.96v18.07C0,19.57,0.4,20,0.9,20H6.29z M6.29,20"/>
            </svg>
            <svg key="play" v-else x="0px" y="0px" viewBox="0 0 18 22" style="width: 18px; height: 22px; margin-top: -12px; fill: #fff;">
                <path d="M17.45,10.01L1.61,0.14c-0.65-0.4-1.46,0.11-1.46,0.91V20.8c0,0.81,0.81,1.32,1.46,0.91l15.84-9.87C18.1,11.43,18.1,10.41,17.45,10.01L17.45,10.01z M17.45,10.01"/>
            </svg>
        </a>
        <div v-else class="loading">
            <div class="spinner"></div>
        </div>

        <div class="controls">
            <span class="current-time">{{ currentTime }}</span>
            <div class="slider" data-direction="horizontal">
                <div class="progress" :style="{width: percent, backgroundColor: playing ? 'rgb(255, 200, 0)' : '#fff'}">
                    <div class="pin" id="progress-pin" data-method="rewind" :style="{ backgroundColor: playing ? 'rgb(255, 200, 0)' : '#fff'}"></div>
                </div>
            </div>
            <span class="total-time">{{ totalTime }}</span>
        </div>

        <audio ref="audio" :src="require('../assets/tracks/' + message + '.mp3')" @loadedmetadata="loadedMetaData" @canplay="canPlay" @timeupdate="timeUpdate" @ended="ended"></audio>
    </div>
</template>
<script>
    export default{
        props: ['message'],
        data: () => ({
            audio: undefined,
            loaded: false,
            playing: false,
            currentTime: '00:00',
            totalTime: '00:00',
            percent: '0%',
            draggableClasses: ['pin'],
            currentlyDragged: null
        }),
        computed: {},
        methods: {
            formatTime(time) {
                var min = Math.floor(time / 60);
                var sec = Math.floor(time % 60);
                return min + ':' + ((sec < 10) ? ('0' + sec) : sec);
            },
            loadedMetaData() {
                this.totalTime = this.formatTime(this.audio.duration)
            },
            canPlay() {
                this.loaded = true
            },
            timeUpdate(){
                var current = this.audio.currentTime;
                var percent = (current / this.audio.duration) * 100;

                this.percent = percent + '%';

                this.currentTime = this.formatTime(current);
            },
            ended(){
                this.playing = false
                this.audio.currentTime = 0
            },
            isDraggable(el) {
                let canDrag = false;
                let classes = Array.from(el.classList);
                this.draggableClasses.forEach(draggable => {
                    if (classes.indexOf(draggable) !== -1)
                        canDrag = true;
                })
                return canDrag;
            },
            inRange(event) {
                let rangeBox = this.getRangeBox(event);
                let rect = rangeBox.getBoundingClientRect();
                let direction = rangeBox.dataset.direction;
                if (direction == 'horizontal') {
                    var min = rangeBox.offsetLeft;
                    var max = min + rangeBox.offsetWidth;
                    if (event.clientX < min || event.clientX > max) return false;
                } else {
                    min = rect.top;
                    max = min + rangeBox.offsetHeight;
                    if (event.clientY < min || event.clientY > max) return false;
                }
                return true;
            },
            togglePlay() {
                if (this.audio.paused) {
                    this.audio.play();
                    this.playing = true;
                } else {
                    this.audio.pause();
                    this.playing = false;
                }
            },
            makePlay() {
                this.playpauseBtn.style.display = 'block';
                this.loading.style.display = 'none';
            },
            getRangeBox(event) {
                let rangeBox = event.target;
                let el = this.currentlyDragged;
                if (event.type == 'click' && this.isDraggable(event.target)) {
                    rangeBox = event.target.parentElement.parentElement;
                }
                if (event.type == 'mousemove') {
                    rangeBox = el.parentElement.parentElement;
                }
                return rangeBox;
            },
            getCoefficient(event) {
                let slider = this.getRangeBox(event);
                let rect = slider.getBoundingClientRect();
                let K = 0;
                if (slider.dataset.direction == 'horizontal') {

                    let offsetX = event.clientX - slider.offsetLeft;
                    let width = slider.clientWidth;
                    K = offsetX / width;

                } else if (slider.dataset.direction == 'vertical') {

                    let height = slider.clientHeight;
                    var offsetY = event.clientY - rect.top;
                    K = 1 - offsetY / height;

                }
                return K;
            },
            rewind(event) {
                if (this.inRange(event)) {
                    this.audio.currentTime = this.audio.duration * this.getCoefficient(event);
                }
            }
        },
        mounted() {
            this.audio = this.$refs.audio
        },
    }
</script>
<style lang="scss">
    .audio-message-content {
        width: 50rem;
        min-width: 300px;
        height: 56px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 24px;
        border-radius: 4px;
        user-select: none;
        -webkit-user-select: none;

        .play-pause-btn {
            position: relative;
            width: 18px;
            height: 22px;
            cursor: pointer;

            svg{
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -9px;
            }
        }

        .spinner {
            width: 18px;
            height: 18px;
            background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/loading.png);
            background-size: cover;
            background-repeat: no-repeat;
            animation: spin 0.4s linear infinite;
        }

        .slider {
            flex-grow: 1;
            background-color: #D8D8D8;
            cursor: pointer;
            position: relative;

            .progress {
                border-radius: inherit;
                position: absolute;
                pointer-events: none;
                transition: all .3s;

                .pin {
                    height: 16px;
                    width: 16px;
                    border-radius: 8px;
                    position: absolute;
                    pointer-events: all;
                    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.32);
                    transition: all .3s;
                }
            }
        }

        .controls {
            font-family: 'Roboto', sans-serif;
            font-size: 16px;
            line-height: 18px;
            color: #fff;
            display: flex;
            flex-grow: 1;
            justify-content: space-between;
            align-items: center;
            margin-left: 24px;

            .slider {
                margin-left: 16px;
                margin-right: 16px;
                border-radius: 2px;
                height: 4px;

                .progress {
                    width: 0;
                    height: 100%;

                    .pin {
                        right: -8px;
                        top: -6px;
                    }
                }
            }

            span {
                cursor: default;
            }
        }
    }

    svg, img {
        display: block;
    }

    @keyframes spin {
        from {
            transform: rotateZ(0);
        }
        to {
            transform: rotateZ(1turn);
        }
    }
</style>