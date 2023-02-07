<script>
export default {
  name: "Section",
  props: ["id", "title", "content"],
};
</script>

<template>
  <section :id="id">
    <div class="container" data-aos="fade-up">
      <div class="section-header">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
      </div>
      <slot></slot>
    </div>
    <slot name="container"></slot>
  </section>
</template>
