<script>
export default {
  name: "CardDashboard",
  props: ["business"],
};
</script>
<template>
  <div class="col swiper-slide">
    <img :src="business.imageUrl" class="img-fluid" :alt="business.name" />
    <p>{{ business.name }}</p>
  </div>
</template>
