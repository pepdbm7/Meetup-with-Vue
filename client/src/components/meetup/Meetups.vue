<template>
  <v-container>
    <v-layout row wrap v-for="{id, image, title, date} in meetups" :key="id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md3>
        <v-card color="primary">
          <v-container>
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
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.getAllMeetups;
    }
  }
};
</script>