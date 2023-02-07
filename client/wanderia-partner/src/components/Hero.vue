<script>
export default {
  name: "Hero",
};
</script>

<template>
  <section id="hero">
    <div class="hero-content" data-aos="fade-up">
      <h2>Mari <span>daftarkan bisnis anda</span><br />segera!</h2>
      <div>
        <a href="/register" class="btn-get-started scrollto">Get Started</a>
      </div>
    </div>

    <div class="hero-slider swiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          style="background-image: url('../assets/img/hero-carousel/1.jpg')"
        ></div>
        <div
          class="swiper-slide"
          style="background-image: url('../assets/img/hero-carousel/2.jpg')"
        ></div>
        <div
          class="swiper-slide"
          style="background-image: url('../assets/img/hero-carousel/3.jpg')"
        ></div>
        <div
          class="swiper-slide"
          style="background-image: url('../assets/img/hero-carousel/4.jpg')"
        ></div>
        <div
          class="swiper-slide"
          style="background-image: url('../assets/img/hero-carousel/5.jpg')"
        ></div>
      </div>
    </div>
  </section>
</template>
