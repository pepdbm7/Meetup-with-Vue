import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const url = "http://localhost:5000/api";

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
    user: null,
    error: null,
    loading: false,
    userId: sessionStorage.getItem("userId") || null,
    token: sessionStorage.getItem("token") || null
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
    signUp({ commit }, user) {
      console.log("this is commit:", commit);
      commit("clearError");
      commit("setLoading", true);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(user)
      };

      return fetch(`${url}/signup`, requestOptions)
        .then(res => res.json())
        .catch(err => console.log(err));
    },
    signIn({ commit }, credentials) {
      commit("clearError");
      commit("setLoading", true);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(credentials)
      };

      return fetch(`${url}/signin`, requestOptions)
        .then(res => res.json())
        .then(res => {
          if (res.error) throw Error(res.error);
          const { id, token } = res.data;
          this.userId = id;
          this.token = token;
          sessionStorage.setItem("userId", id);
          sessionStorage.setItem("token", token);
        });
    },
    logout() {
      this.userId = null;
      this.token = null;

      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("token");
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
    loading: ({ loading }) => loading,
    loggedIn: ({ userId }) => !!userId
  }
});
