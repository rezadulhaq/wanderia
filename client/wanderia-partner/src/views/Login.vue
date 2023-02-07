<script>
// import { mapActions } from "pinia";
// import { useCounterStore } from "../stores/counter";
import { useQuery, useMutation } from "@vue/apollo-composable";
// import { PARTNER_LOGIN_QUERY } from "../stores/queries";
// import { gql } from "@apollo/client";
import gql from "graphql-tag";

export default {
  name: "login",
  setup() {
    const { mutate: login } = useMutation(
      gql`
        mutation login($input: InputLogin) {
          login(input: $input) {
            access_token
          }
        }
      `
    );
    return {
      login,
    };
  },
  data() {
    return {
      input: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async handleLogin() {
      try {
        // console.log(this.login);
        let { data } = await this.login({
          input: this.input,
        });
        localStorage.setItem("access_token", data.login.access_token);
        this.$router.push("/dashboard");
        // console.log(result);
      } catch (error) {
        console.log(error);
      }
    },
    // ...mapActions(useCounterStore, ["login"]),
    // loginPost() {
    //   let user = {
    //     email: this.email,
    //     password: this.password,
    //   };
    //   this.login(user);
    // },
    // async login() {
    // console.log(this);
    // console.log(gql);
    // const { data } = await this.$apollo.mutate({
    //   mutation: gql`
    //     mutation Mutation($input: InputLogin) {
    //       login(input: $input) {
    //         access_token
    //       }
    //     }
    //   `,
    //   variables: {
    //     InputLogin: {
    //       email: this.email,
    //       password: this.password,
    //     },
    //   },
    // });
    // localStorage.setItem("access_token", data.access_token);
    // },
  },
};
</script>

<template>
  <div class="d-flex align-self-center">
    <main class="form-signin w-100 m-auto">
      <img
        src="../assets/logo-wanderia.png"
        class="mx-auto d-block pb-4"
        alt="Wanderia"
        width="200"
      />
      <form @submit.prevent="handleLogin">
        <h1 class="h3 mb-3 fw-normal">Sign in</h1>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            v-model="input.email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            v-model="input.password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </main>
  </div>
</template>
