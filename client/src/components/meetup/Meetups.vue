<template>
  <v-container>
    <!-- buttons: -->
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large @click="getMine" color="violet">View my meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large @click="getAll" color="violet">View all meetups</v-btn>
      </v-flex>
    </v-layout>

    <!-- view all meetups: -->
    <v-container v-if="viewall">
      <v-layout row wrap v-for="{id, image, title, date} in allMeetups" :key="id" class="mb-2">
        <v-flex xs12 sm10 md8 offset-sm1 offset-md3>
          <v-card color="primary">
            <v-container fluid>
              <v-layout row>
                <v-flex xs5 sm4 md3>
                  <v-img :src="image" height="120px"></v-img>
                </v-flex>
                <v-flex xs7 sm8 md9>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="meetup-title">{{title}}</h3>
                      <div>{{ date | filteredDate }}</div>
                    </div>
                  </v-card-title>

                  <v-card-actions>
                    <v-btn small :to="`/meetups/${id}`" color="violet">Read more...</v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- only view mine -->
    <v-container v-if="viewmine">
      <v-layout row wrap v-for="{id, image, title, date} in myMeetups" :key="id" class="mb-2">
        <v-flex xs12 sm10 md8 offset-sm1 offset-md3>
          <v-card color="primary">
            <v-container fluid>
              <v-layout row>
                <v-flex xs5 sm4 md3>
                  <v-img :src="image" height="120px"></v-img>
                </v-flex>
                <v-flex xs7 sm8 md9>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="meetup-title">{{title}}</h3>
                      <div>{{ date | filteredDate }}</div>
                    </div>
                  </v-card-title>

                  <v-card-actions>
                    <v-btn small :to="`/meetups/${id}`" color="violet">Read more...</v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      viewall: true,
      viewmine: false
    };
  },
  computed: {
    allMeetups() {
      const allmeetups = this.$store.getters.getAllMeetups;
      console.log(allmeetups);
      return allmeetups;
    },
    myMeetups() {
      const mine = this.$store.getters.getMeetupsIAssistTo;
      console.log(mine);
      return mine;
    }
  },
  methods: {
    getAll() {
      this.viewall = true;
      this.viewmine = false;
    },
    getMine() {
      this.viewall = false;
      this.viewmine = true;
    }
  }
};
</script>