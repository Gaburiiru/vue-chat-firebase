<template>
  <div>
    <v-row class="mt-5 d-flex justify-center">
      <v-col cols="12" sm="8" md="6" xl="4">
        <v-card class="mb-6 blue lighten-4">
          <v-card-text class="black--text subtitle-1 font-italic"
            >Chat App</v-card-text
          >
          <v-spacer></v-spacer>
          <v-img
            src="../assets/img/chat.jpg"
            style="width: fit-content; height: 50px"
            class="rounded-lg"
          />
        </v-card>
        <v-card class="blue lighten-2 rounded-xl">
          <v-card-text
            class="display-1 text-uppercase blue darken-2 white--text text-center"
          >
            <span v-if="!registro">Ingreso</span>
            <span v-if="registro">Registro</span>
          </v-card-text>
          <v-card-text>
            <v-btn class="mb-2 red lighten-1 white--text" block @click="google">
              <v-icon left dark>fab fa-google</v-icon>
              Google
            </v-btn>
            <v-btn block class="white--text blue darken-4" @click="facebook">
              <v-icon left dark>fab fa-facebook-f</v-icon>
              Facebook
            </v-btn>
          </v-card-text>

          <v-card-text>
            <v-btn
              block
              color="black white--text"
              @click="registro = true"
              v-if="!registro"
              >¿No tenes una cuenta? Registrate aquí</v-btn
            >
            <v-btn
              block
              color="black white--text"
              @click="registro = false"
              v-if="registro"
              >¿Ya tenes una cuenta? Ingresa aquí</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { firebase, auth } from "@/firebase";
import { mapMutations, mapActions } from "vuex";
import router from "@/router";

export default {
  data() {
    return {
      registro: false,
    };
  },
  methods: {
    ...mapMutations(["newUser"]),
    ...mapActions(["setUser"]),
    facebook() {
      console.log("Face");
      const provider = new firebase.auth.FacebookAuthProvider();
      this.access(provider);
    },
    google() {
      console.log("google");
      const provider = new firebase.auth.GoogleAuthProvider();
      this.access(provider);
    },

    async access(provider) {
      firebase.auth().languageCode = "es";
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;

        this.setUser(user);

        router.push({ name: "home" });
      } catch (error) {
        console.log("error de sesion " + error);
      }
    },
  },
};
</script>