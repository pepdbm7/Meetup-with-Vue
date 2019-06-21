import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
//to create temporary fake ids for created comments, to store them in the store for a while:
const uuidv4 = require("uuid/v4");

Vue.use(Vuex);

const url = "http://localhost:5000";

export default new Vuex.Store({
  state: {
    allMeetups: [],
    error: null,
    loading: false,
    user: {
      userId: localStorage.getItem("userId") || null,
      token: localStorage.getItem("token") || null,
      username: localStorage.getItem("username") || null,
      email: localStorage.getItem("email") || null,
      city: localStorage.getItem("city") || null,
      avatar: localStorage.getItem("avatar") || null,
      joinDate: localStorage.getItem("joinDate") || null
    },
    currentMeetupComments: []
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
      //replace the meetup in the state, with the new one:

      for (var i in allMeetups) {
        if (allMeetups[i].id === payload._id) {
          allMeetups[i] = payload;
          console.log("meetup with new changes:", allMeetups[i]);
          break;
        }
      }
      console.log({ allMeetups });
    },

    //comments:
    clearComments: state => (state.currentMeetupComments = []),
    showAllComments: (state, payload) =>
      (state.currentMeetupComments = payload),
    addNewComment: (state, payload) => {
      state.currentMeetupComments.push(payload);
      console.log(state.currentMeetupComments);
    },
    //errors:
    setError: (state, payload) => {
      console.log(payload);
      state.error = payload;
    },
    clearError: state => (state.error = null),
    //loading:
    setLoading: (state, payload) => (state.loading = payload),

    //userData:
    setUser: ({ user }, payload) => {
      console.log(payload);
      user.userId = payload.id;
      user.token = payload.token;
      user.username = payload.username;
      user.avatar = payload.avatar;
    },
    setUserMoreData: ({ user }, payload) => {
      console.log(payload);
      user.email = payload.email;
      user.city = payload.city;
      user.avatar = payload.avatar;
      user.joinDate = payload.joinDate;
    },

    clearUser: ({ user }) => {
      user.userId = null;
      user.token = null;
      user.email = null;
      user.city = null;
      user.avatar = null;
      user.joinDate = null;
    }
  },
  actions: {
    //to commit the mutations
    showAllMeetups(context) {
      const { token } = context.state.user;
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

          router.push("/meetups");
        });
    },

    createMeetup({ commit, state }, payload) {
      //context object exposes same set of methods/properties on the store instance
      const {
        user: { userId, token }
      } = state;

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
          commit("createMeetup", res);
          console.log(res);
        });
    },

    showCurrentMeetup({ commit, state }, payload) {
      commit("clearComments");

      //fetch the comments of this meetup:
      return fetch(`${url}/comments/${payload}`, { method: "GET" })
        .then(res => res.json())
        .then(comments => {
          console.log({ comments });
          if (comments.error) {
            //error message
            return commit("setError", comments.error);
          }

          commit("showAllComments", comments);

          router.push(`/meetups/${payload}`);
        });
    },

    createComment({ commit, state }, { meetupId, comment }) {
      commit("setLoading", true);
      const {
        user: { userId, token, username }
      } = state;

      // store it into the DB
      return fetch(`${url}/meetup/${meetupId}/newcomment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, comment })
      })
        .then(res => res.json())
        .then(res => {
          console.log("lo que responde el back al crear comment: ", res);
          commit("setLoading", false);
          //error message
          if (res.error) {
            return commit("setError", res.error);
          }
          commit("addNewComment", {
            user: { username },
            meetup: meetupId,
            content: comment,
            _id: uuidv4()
          });
        });
    },

    assistToMeetup({ commit, state }, payload) {
      commit("setLoading", true);

      const {
        user: { userId, token }
      } = state;

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
          //error message:
          if (res.error) {
            return commit("setError", res.error);
          }
          console.log(state.allMeetups);
        });
    },

    cancelAssistance({ commit, state }, payload) {
      commit("setLoading", true);

      const {
        user: { userId, token }
      } = state;

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
          const { id, token, username, avatar } = res;
          console.log(res);

          //storing id and token in our global state of vuex:
          await commit("setUser", { id, token, username, avatar });

          //storing id and token in localStorage:
          await localStorage.setItem("userId", id);
          await localStorage.setItem("token", token);
          await localStorage.setItem("username", username);
          await localStorage.setItem("avatar", avatar);
          //redirect to home:
          await router.push("/");
        });
    },

    retrieveUser({ commit, state }) {
      const {
        user: { userId }
      } = state;

      return fetch(`${url}/user/${userId}`, { method: "GET" })
        .then(res => res.json())
        .then(async res => {
          if (res.error) {
            //error message
            return commit("setError", res.error);
          }
          console.log({ res });

          const { email, city, avatar, joinDate } = res;

          //storing data in our global state of vuex:
          await commit("setUserMoreData", { email, city, avatar, joinDate });

          //storing data in localStorage, in case the page is refreshed store data can be lost:
          await localStorage.setItem("email", email);
          await localStorage.setItem("city", city);
          await localStorage.setItem("avatar", avatar);
          await localStorage.setItem("joinDate", joinDate);
        })
        .catch(err => console.log(err));
    },

    logout({ commit, state }) {
      commit("clearUser");

      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("city");
      localStorage.removeItem("avatar");
      localStorage.removeItem("joinDate");
      router.push("/");
      console.log(state);
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
    getMeetupsIAssistTo({ allMeetups, user }) {
      //return array of meetupsid where user is assisting
      if (allMeetups && user.userId) {
        console.log({ allMeetups });
        const meetups = allMeetups.map(meetup => {
          if (meetup.assistants.includes(user.userId)) {
            return meetup;
          }
        });

        return meetups.filter(meetup => {
          if (typeof meetup !== undefined) return meetup;
        });
      }
    },
    getMeetupComments: ({ currentMeetupComments }) => {
      console.log(currentMeetupComments);
      return currentMeetupComments;
    },
    getUserId: ({ user }) => user.userId,
    getProfileData: ({ user }) => user,
    getError: ({ error }) => error,
    loading: ({ loading }) => loading
  }
});
