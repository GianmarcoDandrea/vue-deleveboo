<template>
  <swiper :slidesPerView="1" :spaceBetween="30" :loop="true" :pagination="{ clickable: true }" :navigation="true"
    :modules="modules" class="mySwiper">
    <swiper-slide v-for="(image, index) in images" :key="index">
      <img :src="getImagePath(image)" alt="Restaurant Image" />
    </swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../style/general.scss';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Pagination, Navigation],
    };
  },
  methods: {
    getImagePath(imageName) {
      return new URL(`../assets/images/${imageName}.png`, import.meta.url).href;
    },
  },
};
</script>
  
<style lang="scss" scoped>
.mySwiper {
  width: 100%;
  height: auto;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;

  img {
    max-height: 100%;
    max-width: 100%;
  }
}
</style>