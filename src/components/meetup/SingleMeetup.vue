<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4>{{meetup.title}}</h4>
          </v-card-title>
          <v-img :src="meetup.src" height="400px"></v-img>
          <v-card-text>
            <div>{{meetup.date | filteredDate}} - {{meetup.location}}</div>
            <div>{{meetup.description}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.getAMeetup(this.id); //id from the props of this componennt
    }
  }
};
</script>