<script>
import axios from 'axios';
import { store } from '../store';
import RestaurantCard from '../components/RestaurantCard.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/scss/pagination';
import { EffectCoverflow, Pagination, Autoplay, Keyboard } from 'swiper/modules';

export default {
    props: {
        carouselRestaurants: Array,
    },
    components: {
        Swiper,
        SwiperSlide,
        RestaurantCard
    },
    setup() {
        return {
            modules: [EffectCoverflow, Pagination, Autoplay, Keyboard],
        };
    },
    data() {
        return {
            store,
            loading: true,
            swiperInstance: null,
        };
    }
}
</script>

<template>
    <div class="bg">
        <div class="swiper-container text-center">
            <div class="container">
                <h2 class="pt-5 pb-3">Celebrate Flavor with Our Top 10 Restaurants</h2>
            </div>
            <swiper class="custom-swiper" :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slidesPerView="4"
                :initialSlide="2" :coverflowEffect="{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }" :pagination="{ clickable: true, }" :keyboard="{ enabled: true }" :autoplay="{ delay: 3000 }"
                :modules="modules" :breakpoints="{
                    0: { slidesPerView: 1, spaceBetween: 10 },
                    376: { slidesPerView: 2, spaceBetween: 10 },
                    769: { slidesPerView: 3, spaceBetween: 20 },
                }">
                <swiper-slide v-for="(restaurant, index) in carouselRestaurants" :key="index">
                    <restaurant-card :restaurant="restaurant" />
                </swiper-slide>
            </swiper>
            <div class="container">
                <h2 class="pt-3 pb-5">Your Culinary Adventure Awaits!</h2>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '../style/general.scss';

.bg {
    background-color: #2f2626;
    border-top: #ffca2c 4px solid;
    border-bottom: #ffca2c 4px solid;


    .swiper-container {
        h2 {
            font-size: 2rem;
            color: #ffca2c;
            font-family: 'Protest Revolution', sans-serif;
        }
        .custom-swiper {
            width: 100%;
            padding-top: 50px;
            padding-bottom: 50px;
            height: 500px;
        }

        .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 300px;
            min-width: 165px;
            height: 400px;
            border: #ffca2c 4px solid;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0px 5px 10px -3px black;
            img {
                display: block;
                width: 100%;
            }
        }

        .swiper-pagination {
            &-bullet-active {
                background-color: #ffca2c;
                height: 12px;
                width: 12px;
                box-shadow: 0px 5px 10px -3px black;
                border: black 1.5px solid;
            }

            &-bullet {
                height: 12px;
                width: 12px;
            }
        }
    }
}
</style>