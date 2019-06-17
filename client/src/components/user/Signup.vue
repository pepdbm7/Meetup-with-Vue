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
              <v-form v-model="isValidForm" ref="registerForm" @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
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
                      :rules="emailRules"
                      name="email"
                      label="Email"
                      id="email"
                      v-model="user.email"
                      type="email"
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
                    <v-text-field
                      name="city"
                      label="City"
                      id="city"
                      v-model="user.city"
                      type="city"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="avatar"
                      label="Picture"
                      id="avatar"
                      v-model="user.avatar"
                      type="avatar"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" :disabled="loading || !isValidForm" :loading="loading">
                      Sign up
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
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
        email: "",
        password: "",
        city: "",
        avatar: ""
      },
      isValidForm: true,
      emailRules: [
        email => !!email || "Email is empty",
        email => /.@+./.test(email) || "Please use a valid email"
      ]
    };
  },
  computed: {
    //their values now are available for the component, so we can bind html elements to add behaviour
    ...mapGetters(["loading", "getUser", "getError"])
  },
  watch: {
    //if user already logged in, redirect to home page:
    getUser(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    ...mapActions(["signUp"]),
    onSignup() {
      //validate() method returns true when all fields are valid:
      if (this.$refs.registerForm.validate()) {
        this.signUp(this.user);
      }
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>