<template>
  <v-dialog persistent v-model="showDialog">
    <template v-slot:activator="{ on }">
      <v-btn
        color="secondary"
        accent
        slot="activator"
        @click="showDialog = true"
      >{{ userIsAssisting ? 'Cancel assitance' : 'I\'ll Assist' }}</v-btn>
    </template>

    <!-- dialog itself: -->
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <!-- condition for the title: -->
            <v-card-title v-if="userIsAssisting">Cancel your assitance?</v-card-title>
            <v-card-title v-else>Assist to Meetup?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>You can always change your decision later on.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn class="red--text darken-1" flat @click="showDialog = false">Cancel</v-btn>
              <v-btn class="green--text darken-1" flat @click="onAgree">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetupId"],
  data() {
    return {
      showDialog: false //dialog not showing by default
    };
  },
  computed: {
    userIsAssisting() {
      const meetup = this.$store.getters.getAMeetup(this.meetupId);

      const userId = this.$store.getters.getUserId;
      const isAssisting = meetup ? meetup.assistants.includes(userId) : false;

      return isAssisting;
    }
  },
  methods: {
    onAgree() {
      if (this.userIsAssisting) {
        this.$store.dispatch("cancelAssistance", this.meetupId);

        this.showDialog = false;
      }

      this.$store.dispatch("assistToMeetup", this.meetupId);
      this.showDialog = false;
    }
  },
  created() {
    this.$store.dispatch("showCurrentMeetup", this.id);
  }
};
</script>