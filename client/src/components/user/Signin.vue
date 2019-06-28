<template>
  <v-container>
    <!-- error component; binded to getter truethy-ness: -->
    <v-layout row v-if="getError">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="getError"></app-alert>
      </v-flex>
    </v-layout>

    <!-- formular: -->
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <v-form v-model="isValidForm" ref="loginForm" @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      autofocus
                      name="username"
                      label="Username"
                      id="username"
                      v-model="user.username"
                      type="username"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="user.password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn
                      color="primary"
                      :disabled="loading || !isValidForm"
                      :loading="loading"
                      type="submit"
                    >
                      Sign in
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                    <p class="mt-2">
                      Don't have an account yet?
                      <router-link to="/signup">Register now</router-link>
                    </p>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      isValidForm: true
    };
  },
  computed: {
    ...mapGetters(["loading", "getUserId", "getError"])
  },
  watch: {
    //if the user in store changes, redirect to home page:
    getUserId(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignin() {
      //validate() method returns true when all fields are valid:
      if (this.$refs.loginForm.validate()) {
        this.$store.dispatch("signIn", this.user);
      }
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  },
  beforeCreate() {
    this.$store.dispatch("clearError");
  }
};
</script>