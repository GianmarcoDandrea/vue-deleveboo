<script>
import axios from 'axios';
import { store } from '../store';
import RestaurantCard from '../components/RestaurantCard.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

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
            modules: [EffectCoverflow, Pagination, Autoplay],
        };
    },
    data() {
        return {
            store,
            // restaurants: [],
            loading: true,
            swiperInstance: null
        }
    },
}
</script>

<template>
    <div class="container">

        <swiper :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slidesPerView="'4'" :initialSlide=2
            :coverflowEffect="{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }" :pagination="true" :autoplay="{ delay: 3000 }" :modules="modules" class="mySwiper">
            <swiper-slide v-for="(restaurant, index) in carouselRestaurants" :key="index">
                <restaurant-card :restaurant="restaurant" />
            </swiper-slide>
        </swiper>
    </div>
</template>

<style lang="scss" scoped>
.container {

    .swiper {
        width: 100%;
        padding-top: 50px;
        padding-bottom: 50px;
        height: 500px;
    }

    .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 300px;
        height: 400px;

        img {
            display: block;
            width: 100%;
        }
    }
}
</style>