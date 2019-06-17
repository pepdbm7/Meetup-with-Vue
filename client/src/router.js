import Vue from "vue";
import Router from "vue-router";

//Components:
import Home from "@/components/Home";
import Meetups from "@/components/meetup/Meetups";
import CreateMeetup from "@/components/meetup/CreateMeetup";
import SingleMeetup from "@/components/meetup/SingleMeetup";
import Profile from "@/components/user/Profile";
import Signin from "@/components/user/Signin";
import Signup from "@/components/user/Signup";

//helpers:
import AuthGuard from "./AuthGuard";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/meetups",
      name: "Meetups",
      component: Meetups,
      beforeEnter: AuthGuard
    },
    {
      path: "/meetup/new",
      name: "CreateMeetup",
      component: CreateMeetup,
      beforeEnter: AuthGuard
    },
    {
      path: "/meetups/:id",
      name: "SingleMeetup",
      props: true,
      component: SingleMeetup,
      beforeEnter: AuthGuard
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    }
  ]
});
