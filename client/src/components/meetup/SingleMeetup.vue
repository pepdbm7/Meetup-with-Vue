<template>
  <v-container>
    <!-- meetup section: -->
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate class="primary--text" :width="7" :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4 class="meetup-title">{{meetup && meetup.title}}</h4>
          </v-card-title>
          <v-img :src="meetup && meetup.image" height="400px"></v-img>
          <v-card-text class="meetup-info">
            <div>{{meetup && meetup.date | filteredDate}} - {{meetup && meetup.location}}</div>
            <div>{{meetup && meetup.description}}</div>
          </v-card-text>
          <v-card-actions>
            <app-meetup-assist :meetupId="id" v-if="!userIsCreator"></app-meetup-assist>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-spacer></v-spacer>

    <!-- current comments: -->
    <v-flex my-2 xs12>
      <h4 class="comments-title">Comments:</h4>
    </v-flex>
    <v-layout row wrap my-3 v-for="{user, _id, content} in allComments" :key="_id">
      <v-flex xs12>
        <v-card class="comment-card">
          <v-card-title class="comment-title">{{user.username}}</v-card-title>
          <v-card-text>
            <div>"{{content}}"</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-spacer></v-spacer>

    <!-- post new comment: -->
    <v-flex my-2 xs12>
      <h4 class="comments-title">Post a new comment:</h4>
    </v-flex>
    <v-layout row wrap my-2>
      <v-flex xs12>
        <v-form @submit.prevent="onCreateComment">
          <v-layout row>
            <v-flex xs12>
              <v-textarea
                name="comment"
                placeholder="Write here..."
                id="comment"
                v-model="comment"
                required
              ></v-textarea>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-btn
                color="primary"
                :disabled="loading || formIsNotValid"
                :loading="loading"
                type="submit"
              >
                POST
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      comment: ""
    };
  },
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.getAMeetup(this.id); //id from the props of this componennt
    },
    userIsCreator() {
      const meetup = this.meetup;
      const userId = this.$store.getters.getUserId;
      const creatorUserId = this.meetup && this.meetup.user;
      return userId === creatorUserId ? true : false;
    },
    allComments() {
      return this.$store.getters.getMeetupComments;
    },
    formIsNotValid() {
      return !this.comment.trim();
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    allComments(oldva, newva) {
      console.log({ oldva, newva });
    }
  },
  methods: {
    onCreateComment() {
      if (this.formIsNotValid) return;

      this.$store.dispatch("createComment", {
        meetupId: this.id,
        comment: this.comment
      });

      this.comment = "";
    }
  },
  created() {
    this.$store.dispatch("showCurrentMeetup", this.id);
  }
};
</script>