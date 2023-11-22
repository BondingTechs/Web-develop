<script>
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/pagination";
// import 'swiper/css/navigation'

// import required modules
// import { Navigation, Pagination } from 'swiper'
import { Autoplay, Pagination } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return {
      ArticleType: {
        11: "一般新聞",
        12: "影音新聞",
      },
      pagination: {
        clickable: true,
        renderBullet(index, className) {
          return `<span class="${className}">${index + 1}</span>`;
        },
      },
      modules: [Pagination, Autoplay],
    };
  },
};
</script>

<template>
  <Swiper
    v-if="list && list.length"
    :space-between="20"
    :pagination="pagination"
    :modules="modules"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    class="pb-[1.7em]"
  >
    <SwiperSlide
      v-for="slide in list"
      :key="slide.id"
      class="rounded-md overflow-hidden"
    >
      <div class="absolute top-0 left-0 w-full h-full">
        <img :src="slide.thumbnail" class="object-cover w-full h-full" />
      </div>
      <div
        class="row flex flex-wrap content-end absolute bottom-0 left-0 w-full px-4 h-1/3 pb-7 md:pb-5 lg:pb-10 lg:px-6"
      >
        <div
          class="flex items-center w-full pb-1 md:pb-3 text-xs space-x-1 md:space-x-3 text-white"
        >
          <div class="w-fit h-6 leading-6 px-2 rounded bg-green-500">
            {{ ArticleType[slide.type] }}
          </div>
          <div
            v-for="(item, index) in slide.categories?.split(',')"
            :key="index"
            class="w-fit h-6 leading-6 px-2 rounded bg-blue-500"
          >
            {{ item }}
          </div>
        </div>

        <h3
          class="title text-sm md:text-xl font-bold tracking-widest text-white"
        >
          {{ slide.title }}
        </h3>
      </div>
      <nuxt-link
      :to="`/news/${slide.categorySlug}/${slide.slug}`"
        class="absolute top-0 left-0 w-full h-full"
      />
    </SwiperSlide>
  </Swiper>
</template>

<style lang="scss">
.swiper {
  width: 100%;
}

.swiper-slide {
  padding-top: calc(100% * 7 / 12);
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-pagination {
  // bottom: 0 !important;
  @media (max-width: 767px) {
    // bottom: 5px !important;
  }
}

.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  opacity: 0.35;
  margin: 0 6px !important;

  @apply bg-blue-400 dark:bg-slate-500 duration-150;

  @media (max-width: 767px) {
    margin-bottom: 0 !important;
  }
  &-active {
    opacity: 1;
  }
}
</style>

<style lang="scss" scoped>
.row {
  background: linear-gradient(180deg, transparent, rgb(255 255 255 / 60%));
  .dark & {
    background: linear-gradient(180deg, transparent, rgb(0 0 0 / 60%));
  }
}

.title {
  text-shadow: 1px 1px 8px #2d2d2d;
}
</style>
