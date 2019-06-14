<template>
  <v-container>
    <v-layout row wrap v-for="{id, src, title, date} in meetups" :key="id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card color="primary">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-img :src="src" height="130px"></v-img>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h4>{{title}}</h4>
                    <div>{{ date | filteredDate }}</div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <v-btn small :to="`/meetups/${id}`" @click="console.log(id)" color="orange">Read more...</v-btn>
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