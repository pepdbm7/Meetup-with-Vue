
  <template>
  <v-container>
    <!-- error message: -->
    <v-layout row wrap v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>
    <!-- formular: -->
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <v-form v-model="isValidForm" ref="form" @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="username"
                      label="Username"
                      id="username"
                      v-model="username"
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
                      v-model="email"
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
                      v-model="password"
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
                      v-model="city"
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
                      v-model="avatar"
                      type="avatar"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn :disabled="!isValidForm" type="submit">Sign in</v-btn>
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
export default {
  data() {
    return {
      isValidForm: true,
      username: "",
      email: "",
      password: "",
      city: "",
      avatar: "",
      emailRules: [
        email => !!email || "Email is empty",
        email => /.@+./.test(email) || "Please use a valid email"
      ]
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  watch: {
    //if the user in store changes, redirect to home page:
    getUser(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignup() {
      if (this.$refs.form.validate())
        //validate() method returns true when all fields are valid
        this.$store.dispatch("signUp", {
          username: this.username,
          email: this.email,
          password: this.password,
          city: this.city,
          avatar: this.avatar
        });
    }
  }
};
</script>