<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <v-layout row>
                <v-flex xs12 mb-2 text-xs-center>
                  <img :src="getProfileData.avatar" height="150">
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 mb-2>
                  <div>
                    <div class="profile-titles">USERNAME:</div>
                    {{getProfileData.username}}
                  </div>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 mb-2>
                  <div>
                    <div class="profile-titles">EMAIL:</div>
                    {{getProfileData.email}}
                  </div>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 mb-2>
                  <div>
                    <div class="profile-titles">CITY:</div>
                    {{getProfileData.city}}
                  </div>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 mb-2>
                  <div>
                    <div class="profile-titles">MEMBER SINCE:</div>
                    {{getProfileData.joinDate | filteredDate}}
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getProfileData"])
  },
  beforeCreate() {
    this.$store.dispatch("retrieveUser");
  }
};
</script>