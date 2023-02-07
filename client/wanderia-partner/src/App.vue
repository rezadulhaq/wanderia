<script>
import { mapWritableState } from "pinia";
import { RouterLink, RouterView } from "vue-router";
import { useCounterStore } from "./stores/counter";

export default {
  name: "App",
  computed: {
    ...mapWritableState(useCounterStore, ["isLogin", "name"]),
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.isLogin = true;
      this.name = localStorage.getItem("name");
    }
  },
};
</script>

<template>
  <RouterView />
</template>
