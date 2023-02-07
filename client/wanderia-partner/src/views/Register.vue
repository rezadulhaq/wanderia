<script>
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

export default {
  name: "Register",
  data() {
    return {
      input: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  setup() {
    const { mutate: addNewUser } = useMutation(
      gql`
        mutation addNewUser($input: NewPartnerUser) {
          addNewUser(input: $input) {
            id
            name
            email
          }
        }
      `
    );
    return {
      addNewUser,
    };
  },
  methods: {
    async handleRegister() {
      try {
        let { data } = await this.addNewUser({
          input: this.input,
        });
        console.log("success register");
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div class="d-flex align-self-center">
    <main class="form-register w-100 m-auto">
      <img
        src="../assets/logo-wanderia.png"
        class="mx-auto d-block pb-4"
        alt="Wanderia"
        width="200"
      />
      <form @submit.prevent="handleRegister">
        <h1 class="h3 mb-3 fw-normal">Register</h1>

        <div class="mb-3 row">
          <label for="name" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input
              type="text"
              v-model="input.name"
              class="form-control"
              id="name"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="email" class="col-sm-2 col-form-label"
            >Email address</label
          >
          <div class="col-sm-10">
            <input
              type="email"
              v-model="input.email"
              class="form-control"
              id="email"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="password" class="col-sm-2 col-form-label">Password</label>
          <div class="col-sm-10">
            <input
              type="password"
              v-model="input.password"
              class="form-control"
              id="password"
            />
          </div>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Register
        </button>
      </form>
    </main>
  </div>
</template>
