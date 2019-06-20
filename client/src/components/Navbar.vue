<template>
  <div>
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
        <v-list-tile v-if="loggedIn" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
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
        <v-btn
          flat
          small
          v-for="{icon, description, link, avatar} in menuItems"
          :key="description"
          :to="link"
        >
          <v-icon left>{{icon}}</v-icon>

          <v-avatar v-if="avatar" size="40">
            <img :src="user.avatar">
          </v-avatar>
          {{description}}
        </v-btn>

        <v-btn v-if="loggedIn" flat small @click="onLogout">
          <v-icon left dark color="danger">exit_to_app</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
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

      if (this.loggedIn) {
        console.log(this.loggedIn, typeof this.loggedIn);
        menuItems = [
          {
            icon: "supervisor_account",
            description: "View Meetups",
            link: "/meetups"
          },
          { icon: "room", description: "Organize Meetup", link: "/meetup/new" },
          {
            avatar: true,
            description: this.user.username,
            link: "/profile"
          }
        ];
      }
      return menuItems;
    },
    loggedIn() {
      return this.$store.getters.getUserId;
    },
    user() {
      return this.$store.getters.getProfileData;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
