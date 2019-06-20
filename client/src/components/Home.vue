<template>
  <v-container class="container home-container">
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large color="secondary" router to="/meetups">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large color="secondary" router to="/meetup/new">Organize Meetup</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-4">
      <v-flex xs12 class="text-xs-center" v-if="loading">
        <v-progress-circular indeterminate color="primary" :width="7" :size="70"></v-progress-circular>
      </v-flex>
      <v-flex xs12 v-if="!loading">
        <v-carousel class="carousel-container">
          <v-carousel-item
            v-for="{image, title, id} in getAllMeetups"
            :src="image"
            :key="id"
            @click="goToMeetup(id)"
            class="carousel-item"
          >
            <div class="title">{{title}}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getAllMeetups", "loading"])
  },
  methods: {
    goToMeetup(id) {
      //onclick on carousel image:
      this.$router.push(`/meetups/${id}`);
    }
  }
};
</script>

<style scope>
.home-container {
  height: 200vh;
}
.carousel-container {
  cursor: pointer;
}
.carousel-item {
  display: flex;
  justify-content: center;
}
.title {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.6);
  color: hsl(46, 86%, 57%);
  text-transform: uppercase;
  font-size: 2em;
  padding: 20px;
}
</style>
