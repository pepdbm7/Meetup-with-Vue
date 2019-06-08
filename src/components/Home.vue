<template>
  <v-container class="container">
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetup/new">Organize Meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-4">
      <v-flex xs12>
        <v-carousel class="carousel-container">
          <v-carousel-item
            v-for="{src, title, id} in meetups"
            v-bind:src="src"
            :key="id"
            class="carousel-item"
            @click="goToMeetup(id)"
          >
            <div class="title">{{title}}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout class="mt-4">
      <v-flex xs12 class="text-xs-center">
        <p>Join us!!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      meetups: [
        {
          src:
            "https://blog.headout.com/wp-content/uploads/2016/07/NYC-770x514.jpg",
          id: "1",
          title: "Meetup in NYC"
        },
        {
          src:
            "https://www.upsuitesbcn.com/wp-content/uploads/2019/03/barcelona-1.jpg",
          id: "2",
          title: "Meetup in Barcelona"
        }
      ]
    };
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
.container {
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
  color: white;
  font-size: 2em;
  padding: 20px;
}
</style>
