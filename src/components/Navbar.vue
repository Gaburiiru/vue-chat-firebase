<template>
  <nav>
    <v-app-bar class="blue darken-1" dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Chat App</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn @click="SignOff" target="_blank" text>
        <span class="mr-2">CERRAR SESIÓN</span>
        <v-icon>fas fa-user-times</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer class="blue darken-1" v-model="drawer" dark absolute>
      <v-card-text></v-card-text>
      <v-card-text></v-card-text>
      <v-row column align-center mt-5>
        <v-col>
          <v-list-item-avatar>
            <v-img :src="usuario.foto"></v-img>
          </v-list-item-avatar>
        </v-col>
        <v-col>
          <p class="mt-3 white--text">{{ usuario.nombre }}</p>
        </v-col>
      </v-row>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Chat",
          icon: "fa-regular fa-comments",
          to: { name: "home" },
        },
        {
          title: "Config",
          icon: "fa-solid fa-wrench",
          to: { name: "admin" },
        },
      ],
    };
  },
  methods: {
    ...mapActions(["SignOff"]),
  },
  computed: {
    ...mapState(["usuario"]),
  },
};
</script>