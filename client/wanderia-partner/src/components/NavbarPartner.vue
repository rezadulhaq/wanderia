<script>
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "../stores/counter";

export default {
  name: "NavbarPartner",
  computed: { ...mapState(useCounterStore, ["isLogin", "name"]) },
  methods: {
    ...mapActions(useCounterStore, ["logout"]),
  },
};
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-secondary bg-opacity-50">
      <div class="container-fluid gap-4">
        <RouterLink to="/dashboard">
          <img
            src="https://i.imgur.com/fLn2YRT.png"
            class="ml-20"
            alt="Wanderia"
            width="80"
          />
        </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
            <li class="nav-item">
              <RouterLink
                class="nav-link active"
                aria-current="page"
                to="/dashboard"
                >Home</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/addbusiness"
                >Add Business</RouterLink
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
          </ul>
          <span class="navbar-text">
            <a
              ><button
                type="button"
                class="btn btn-secondary"
                @click.prevent="logout"
              >
                Log Out
              </button></a
            >
          </span>
        </div>
      </div>
    </nav>
  </div>
</template>
