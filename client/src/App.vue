<template>
  <v-app dark>
    <!-- Side Menu: -->
    <v-navigation-drawer temporary v-model="sideNav" app>
      <v-list>
        <v-list-tile v-for="{icon, description, link} in menuItems" :key="description" :to="link">
          <v-list-tile-action>
            <v-icon>{{ icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ description }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- main navbar: -->
    <v-toolbar color="primary">
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="navbar-title">Meetup App</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="{icon, description, link} in menuItems" :key="description" :to="link">
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
      sideNav: false
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "face", description: "Sign up", link: "/signup" },
        { icon: "lock_open", description: "Sign in", link: "/signin" }
      ];

      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "supervisor_account",
            description: "View Meetups",
            link: "/meetups"
          },
          { icon: "room", description: "Organize Meetup", link: "/meetup/new" },
          { icon: "person", description: "Profile", link: "/profile" }
        ];
      }
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.geters.user !== undefined
      );
    }
  }
};
</script>
