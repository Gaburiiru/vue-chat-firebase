<template>
  <v-app>
    <Navbar v-if="usuario != ''"></Navbar>
    <v-main class="blue lighten-5" style="padding: 0px; margin-top: 4rem;">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  data: () => ({
    //
  }),
  components: {
    Navbar,
  },
  computed: {
    ...mapState(["usuario"]),
  },
};
</script>