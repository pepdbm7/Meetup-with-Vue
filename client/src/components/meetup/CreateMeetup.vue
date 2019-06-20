<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <h4 class="primary--text">Create a Meetup</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="title" label="Title" id="title" v-model="title" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                name="description"
                label="Description"
                id="description"
                v-model="description"
                required
              ></v-textarea>
            </v-flex>
          </v-layout>

          <v-layout row class="my-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="image" label="Image" id="image" v-model="image" required></v-text-field>
              <!-- to see preview of picture: -->
              <img :src="image" height="150">
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Choose a Date and Time</h4>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date" :min="minDate"></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary mx-0" :disabled="formIsNotValid" type="submit">Create Now</v-btn>
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
      title: "",
      location: "",
      description: "",
      image: "",
      date: new Date().toISOString().substr(0, 10),
      minDate: new Date().toISOString().substr(0, 10),
      time: new Date()
    };
  },
  computed: {
    formIsNotValid() {
      return (
        !this.title.trim() ||
        !this.location.trim() ||
        !this.description.trim() ||
        !this.date ||
        !this.time
      );
    },
    correctDateAndTime() {
      //turn date input value to type date:
      const date = new Date(this.date);
      if (typeof this.time === "string") {
        //time input value, to tranform it into type date:
        let hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }

      return date;
    }
  },
  methods: {
    onCreateMeetup() {
      if (this.formIsNotValid) return;
      const meetupData = {
        title: this.title,
        location: this.location,
        description: this.description,
        image: !this.image.trim()
          ? "https://www.meridadeyucatan.com/wp-content/uploads/2018/01/o-COLLEGE-STUDENTS-TALKING-facebook.jpg"
          : this.image,
        date: this.correctDateAndTime
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    }
  }
};
</script>