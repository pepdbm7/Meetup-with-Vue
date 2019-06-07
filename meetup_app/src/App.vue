<template>
  <v-app dark class="app">
    <!-- side navbar: -->
    <v-navigation-drawer v-model="sideNav">
      <v-list>
        <v-list-title v-for="(item, i) in menuItems" :key="i" router :to="item.link">
          <v-list-title-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-title-action>
          <v-list-title-content>{{item.description}}</v-list-title-content>
        </v-list-title>
      </v-list>
    </v-navigation-drawer>
    <!-- main navbar: -->
    <v-toolbar dark class="navbar">
      <v-toolbar-side-icon @click.native="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="nav-title">Meetup</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="(item, i) in menuItems" :key="i" router :to="item.link">
          <v-icon left>s{{item.icon}}</v-icon>
          {{item.description}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
import "./styles/styles.scss";
export default {
  data() {
    return {
      sideNav: false,
      menuItems: [
        {
          icon: "supervisor_account",
          description: "View Meetups",
          link: "/meetups"
        },
        { icon: "room", description: "Organize Meetup", link: "/new" },
        { icon: "person", description: "Profile", link: "/profile" },
        { icon: "face", description: "Sign up", link: "/signup" },
        { icon: "lock_open", description: "Sign in", link: "/signin" }
      ]
    };
  }
};
</script>


<style lang="scss">
@import "./styles/styles";

.app {
  color: $primary;
}
.navbar {
  background: orange;
}
.navbar-title {
  cursor: pointer;
}
</style>
