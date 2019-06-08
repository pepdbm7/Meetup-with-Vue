<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                  height="130px"
                ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <h4>Kangaroo Valley Safari</h4>
                  <div>{{ card_text }}</div>
                </v-card-title>

                <v-card-actions>
                  <v-btn small to="/meetups/1" color="orange">Read more...</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>