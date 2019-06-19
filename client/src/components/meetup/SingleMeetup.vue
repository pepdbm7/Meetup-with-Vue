<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate class="primary--text" :width="7" :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4>{{meetup.title}}</h4>
          </v-card-title>
          <v-img :src="meetup.image" height="400px"></v-img>
          <v-card-text>
            <div>{{meetup.date | filteredDate}} - {{meetup.location}}</div>
            <div>{{meetup.description}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-meetup-assist :meetupId="meetup.id"></app-meetup-assist>
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
    },
    userIsCreator() {
      const userId = this.$store.getters.getUserId;
      const creatorUserId = this.$store.getters.getAMeetup(this.id).user;
      return userId === creatorUserId ? true : false;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>