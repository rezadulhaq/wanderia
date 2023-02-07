<script>
export default {
  name: "CardBusinesses",
  props: ["business"],
};
</script>
<template>
  <div class="card border border-dark border-2">
    <div class="card-header">{{ business.name }}</div>
    <div class="card-body d-flex flex-row">
      <div class="me-3">
        <img :src="business.imageUrl" alt="ini gambar apa" width="200" />
      </div>
      <div class="d-flex flex-column justify-content-between w-100">
        <div>
          <h5 class="card-title">Alamat</h5>
          <p class="card-text">
            {{ business.address }}
          </p>
        </div>
        <div class="d-flex justify-content-end">
          <RouterLink :to="`/business/${business.id}`">
            <a href="#" class="btn btn-primary me-3 btn-lg">Detail</a>
          </RouterLink>
          <a href="#" class="btn btn-primary btn-lg">Edit</a>
        </div>
      </div>
    </div>
  </div>
</template>
