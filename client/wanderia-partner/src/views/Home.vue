<script>
import NavbarPartner from "../components/NavbarPartner.vue";
import { mapState, mapActions } from "pinia";
import { useCounterStore } from "../stores/counter";
import CardBusinesses from "../components/CardBusinesses.vue";
import { useQuery } from "@vue/apollo-composable";
import { PARTNERS_BUSINESS_QUERY } from "../stores/queries";

export default {
  name: "Home",
  setup() {
    const { result, loading, error } = useQuery(PARTNERS_BUSINESS_QUERY, {
      access_token: localStorage.getItem("access_token"),
    });
    return {
      result,
      loading,
      error,
    };
  },
  components: { NavbarPartner, CardBusinesses },
};
</script>
<template>
  <div class="container-fluid">
    <NavbarPartner />
    <div class="col py-3">
      <div class="container">
        <div class="d-flex justify-content-center">
          <h1>Warung Makan Enak</h1>
        </div>
      </div>
      <div class="container">
        <h3>My Business</h3>
        <div class="d-grid gap-3" v-if="result">
          <CardBusinesses
            v-for="business in result.partnerBusiness"
            :key="business.id"
            :business="business"
          />
        </div>
      </div>
    </div>
  </div>
</template>
