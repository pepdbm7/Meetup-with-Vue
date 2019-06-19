<template>
  <v-dialog persistent v-model="showDialog">
    <v-btn
      primary
      accent
      slot="activator"
    >{{ userIsAssisting ? 'Cancel assitance' : 'I\'ll Assist' }}</v-btn>

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
      return this.$store.getters.getMeetupsUserIsAssistingTo.includes(
        this.meetupId
      );
    }
  },
  methods: {
    onAgree() {
      if (this.userIsAssisting) {
        this.$store.dispatch("Cancel assitanceUserFromMeetup", this.meetupId);
      } else {
        this.$store.dispatch("assistUserForMeetup", this.meetupId);
      }
    }
  }
};
</script>