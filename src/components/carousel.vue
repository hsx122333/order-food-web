<template>
  <div class="carousel">
    <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
      <div class="swiper-slide" v-for="banner in imgList" :key="banner.id">
        <img :src="banner.idView" style="width: 100%" alt=""/>
      </div>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
export default {
  name: 'carousel',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      imgList: [
        {id: 0, idView: require(`../assets/carousel/banner1.jpg`)},
        {id: 1, idView: require(`../assets/carousel/banner2.png`)},
        {id: 2, idView: require(`../assets/carousel/banner3.jpg`)},
        {id: 3, idView: require(`../assets/carousel/banner4.png`)}
      ],
      notNextTick: true,
      swiperOption: {
        loop: true, // 循环轮播
        speed: 1000, // 轮播速度
        autoplay: 1000, // 播放间隔
        pagination: '.swiper-pagination', // 导航栏
        autoplayDisableOnInteraction: false // 操作轮播图后轮播不会停止
      }
    }
  },
  methods: {}
};
</script>
