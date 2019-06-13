import Vue from "vue";
import Vuex from "vuex";

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
    user: { id: "asdfa", registeredMeetups: ["jvñlkasj", "vas"] }
  },
  mutations: {
    //to change the state:
    createMeetup({ allMeetups }, payload) {
      allMeetups.push(payload);
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
    }
  }
});
