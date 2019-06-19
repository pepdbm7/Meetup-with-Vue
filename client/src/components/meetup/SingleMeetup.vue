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
            <h4>{{meetup && meetup.title}}</h4>
          </v-card-title>
          <v-img :src="meetup && meetup.image" height="400px"></v-img>
          <v-card-text>
            <div>{{meetup && meetup.date | filteredDate}} - {{meetup && meetup.location}}</div>
            <div>{{meetup && meetup.description}}</div>
          </v-card-text>
          <v-card-actions>
            <!-- <v-spacer></v-spacer> -->
            <app-meetup-assist :meetupId="id" v-if="!userIsCreator"></app-meetup-assist>
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
      const meetup = this.meetup;
      const userId = this.$store.getters.getUserId;
      const creatorUserId = this.meetup.user;
      return userId === creatorUserId ? true : false;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>