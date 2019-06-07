<template>
  <v-app dark class="app">
    <!-- Side Menu: -->
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="{icon, description, link} in menuItems"
          :key="description"
          router
          :to="link"
        >
          <v-list-tile-action>
            <v-icon>{{icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{description}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!-- main navbar: -->
    <v-toolbar scroll-off-screen dark class="navbar">
      <v-toolbar-side-icon @click.native="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="navbar-title">Meetup App</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="{icon, description, link} in menuItems"
          :key="description"
          router
          :to="link"
        >
          <v-icon left>s{{icon}}</v-icon>
          {{description}}
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


<style scope lang="scss">
$primary: red;

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
