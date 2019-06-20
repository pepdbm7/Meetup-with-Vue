import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

Vue.use(Vuex);

const url = "http://localhost:5000";

export default new Vuex.Store({
  state: {
    allMeetups: [],
    error: null,
    loading: false,
    userId: localStorage.getItem("userId") || null,
    token: localStorage.getItem("token") || null
  },
  mutations: {
    //to change the state (when modifying db, etc):
    setAllMeetups(state, payload) {
      state.allMeetups = payload;
    },
    createMeetup({ allMeetups }, payload) {
      allMeetups.push(payload);
    },
    setMeetupChanges({ allMeetups }, payload) {
      //replace the meetup with the new one:
      console.log({ meetupwithchanges: payload });
      for (var i in allMeetups) {
        if (allMeetups[i].id === payload._id) {
          console.log(allMeetups[i]);
          allMeetups[i] = payload;
          break;
        }
      }
      console.log({ allMeetups });
    },
    setError: (state, payload) => (state.error = payload),
    clearError: state => (state.error = null),
    setLoading: (state, payload) => (state.loading = payload),
    setUser: (state, payload) => {
      console.log(payload);
      state.userId = payload.id;
      state.token = payload.token;
    },
    clearUser: state => {
      state.userId = null;
      state.token = null;
    }
  },
  actions: {
    //to commit the mutations
    showAllMeetups(context) {
      const { token } = context.state;
      context.commit("setLoading", true);

      return fetch(`${url}/meetups`, { method: "GET" })
        .then(res => res.json())
        .then(meetups => {
          if (meetups.error) {
            //error message
            return commit("setError", meetups.error);
          }
          context.commit("setAllMeetups", meetups);
          context.commit("setLoading", false);
        });
    },

    createMeetup(context, payload) {
      //context object exposes same set of methods/properties on the store instance
      const { userId, token } = context.state;
      const meetupData = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        image: payload.image,
        date: payload.date
      };

      // store it into the DB
      return fetch(`${url}/meetup/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, meetupData })
      })
        .then(res => res.json())
        .then(res => {
          //error message
          if (res.error) {
            return commit("setError", res.error);
          }
          context.commit("createMeetup", res);
          console.log(res);
        });
    },

    assistToMeetup({ commit, state }, payload) {
      console.log({ payload });
      commit("setLoading", true);

      const { userId, token } = state;
      console.log({ userId, token });

      //sending userid and meetupid by params, so we don't need a body:
      return fetch(`${url}/user/${userId}/meetup/${payload}/assist`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(res => {
          commit("setMeetupChanges", res.meetup);
          commit("setLoading", false);
          router.go();
          //error message:
          if (res.error) {
            return commit("setError", res.error);
          }
        });
    },

    cancelAssistance({ commit, state }, payload) {
      console.log({ payload });
      commit("setLoading", true);

      const { userId, token } = state;
      console.log({ userId, token });

      //sending userid and meetupid by params, so we don't need a body:
      return fetch(`${url}/user/${userId}/meetup/${payload}/cancelassistance`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(res => {
          commit("setMeetupChanges", res.meetup);
          commit("setLoading", false);
          router.go();
          //error message:
          if (res.error) {
            return commit("setError", res.error);
          }
        });
    },

    signUp({ commit }, signupData) {
      commit("clearError");
      commit("setLoading", true);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(signupData)
      };

      return fetch(`${url}/signup`, requestOptions)
        .then(res => {
          commit("setLoading", false);
          return res.json();
        })
        .then(res => {
          //error message
          if (res.error) {
            return commit("setError", res.error);
          }
          router.push("/signin");
          console.log(res.message); // TODO: handle success message
        });
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
        .then(res => {
          commit("setLoading", false);
          return res.json();
        })
        .then(async res => {
          if (res.error) {
            return commit("setError", res.error);
          }
          const { id, token } = res.data;

          //storing id and token in our global state of vuex:
          await commit("setUser", { id, token });

          //storing id and token in localStorage:
          await localStorage.setItem("userId", id);
          await localStorage.setItem("token", token);

          await router.push("/");
          // await router.go();
        });
    },

    logout({ commit, state }) {
      commit("clearUser");

      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      console.log("userid after logout: ", state.userId);
      router.push("/");
    },

    clearError({ commit }) {
      commit("clearError");
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
      //get a meetup by the 'meetupId' we pass as a parameter when calling this getter:
      return meetupId => allMeetups.find(m => m.id === meetupId);
    },
    getMeetupsIAssistTo({ allMeetups, userId }) {
      //return array of meetupsid where user is assisting
      if (allMeetups && userId) {
        const meetups = allMeetups.map(meetup => {
          if (meetup.assistants.includes(userId)) {
            return meetup;
          }
        });
        console.log(meetups);

        return meetups.filter(meetup => {
          if (typeof meetup !== undefined) return meetup;
        });
      }
    },
    getUserId: ({ userId }) => userId,
    getError: ({ error }) => error,
    loading: ({ loading }) => loading
  }
});
