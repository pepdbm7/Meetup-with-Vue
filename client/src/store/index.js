import Vue from "vue";
import Vuex from "vuex";

// require("dotenv").config();
const { MONGO_URL } = process.env;

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    allMeetups: [
      {
        id: "1",
        title: "Meetup in NYC",
        src:
          "https://blog.headout.com/wp-content/uploads/2016/07/NYC-770x514.jpg",
        date: new Date(),
        location: "NY",
        description:
          "very cool meetup with cool people talking about their cool lives"
      },
      {
        id: "2",
        title: "Meetup in Barcelona",
        src:
          "https://www.upsuitesbcn.com/wp-content/uploads/2019/03/barcelona-1.jpg",
        date: new Date(),
        location: "Barcelona",
        description:
          "very cool meetup with cool people talking about their cool lives"
      }
    ],
    user: { id: "asdfa", registeredMeetups: ["jvñlkasj", "vas"] },
    error: null,
    loading: false
  },
  mutations: {
    //to change the state:
    createMeetup({ allMeetups }, payload) {
      allMeetups.push(payload);
    },
    setError: (state, payload) => {
      state.error = payload;
    },
    clearError: ({ error }) => {
      error = null;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    }
  },
  actions: {
    //to commit the mutations
    createMeetup(context, payload) {
      //context object exposes same set of methods/properties on the store instance
      const newMeetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        src: payload.image,
        date: payload.date
      };
      // store it into the DB
      context.commit("createMeetup", newMeetup);
    },
    signUp: async ({ commit }, user) => {
      console.log("this is commit:", commit);
      try {
        commit("clearError");
        commit("setLoading", true);

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        };

        return fetch(`${MONGO_URL}/users/signup`, requestOptions);

        // //this is for server side routes:
        // //check if email or username already exist:
        // const isUsedEmail = await User.findOne({ email });
        // if (isUsedEmail) throw new Error("This email is already used!");
        // const isUsedUsername = await User.findOne({ username });
        // if (isUsedUsername) throw new Error("This username is already used");
        // const newUser = await new User({
        //   username,
        //   email,
        //   password,
        //   city,
        //   avatar
        // });

        // await newUser.save();
      } catch (err) {
        commit("setLoading", false);
        commit("setError", error);
        console.log(err);
      }
    },
    signIn: async ({ commit }, credentials) => {
      try {
        commit("clearError");
        commit("setLoading", true);

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials)
        };
        const fetch = await fetch(`${MONGO_URL}/users/signin`, requestOptions);

        console.log("sending user data to our server!");
      } catch (err) {
        console.log(err);
      }
    }
  },
  getters: {
    getAllMeetups({ allMeetups }) {
      //(allMeetups from state)
      //get ALL meetups sorted
      return allMeetups.sort((meetupA, meetupB) => meetupA.date > meetupB.date);
    },
    getSomeMeetups(state, getters) {
      //get only 5 meetups
      return getters.getAllMeetups.slice(0, 5);
    },
    getAMeetup({ allMeetups }) {
      //get a meetup by Id
      return meetupId => allMeetups.find(m => m.id === meetupId);
    },
    getUser: ({ user }) => user,
    error: ({ error }) => error,
    loading: ({ loading }) => loading
  }
});
