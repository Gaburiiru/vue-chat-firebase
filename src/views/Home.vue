<template>
  <v-layout justify-center class="mt-5">
    <v-flex xs8>
      <v-card class="text-center">
        <v-card-text>
          <h3 class="">Bienvenid@ {{ usuario.nombre }}</h3>
        </v-card-text>
        <v-card-text style="height: 60vh; overflow: auto" v-chat-scroll>
          <div
            :class="item.nombre === usuario.nombre ? 'text-right' : 'text-left'"
            v-for="(item, index) in mensajes"
            :key="index"
          >
            <p
              :class="
                item.nombre === usuario.nombre
                  ? 'caption mb-0 blue--text'
                  : 'caption mb-0'
              "
            >
              {{ item.nombre }}
            </p>
            <v-chip
              :class="
                item.nombre === usuario.nombre
                  ? 'blue darken-1 white--text'
                  : ''
              "
            >
              <v-avatar left>
                <img :src="item.foto" />
              </v-avatar>
              {{ item.mensaje }}
            </v-chip>
            <p
              :class="
                item.nombre === usuario.nombre
                  ? 'caption blue--text'
                  : 'caption'
              "
            >
              {{ item.fecha }}
            </p>
          </div>
        </v-card-text>
        <v-card-text>
          <v-form @submit.prevent="submitMessage()" v-model="valido">
            <v-text-field
              v-model="mensaje"
              label="Envia un mensaje"
              required
              :rules="rules"
            />
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import { db } from "@/firebase";
import moment from "moment";

export default {
  name: "home",
  data() {
    return {
      mensaje: "",
      valido: false,
      rules: [(v) => !!v || "Tienes que escribir un mensaje..."],
      mensajes: [],
    };
  },
  computed: {
    ...mapState(["usuario"]),
  },
  methods: {
    submitMessage() {
      if (this.valido) {
        db.collection("chats")
          .add({
            mensaje: this.mensaje,
            nombre: this.usuario.nombre,
            foto: this.usuario.foto,
            fecha: Date.now(),
          })
          .catch((error) => console.log(error));
        this.mensaje = "";
      }
    },
  },
  created() {
    moment.locale("es");

    let ref = db.collection("chats").orderBy("fecha", "desc").limit(10);
    ref.onSnapshot((querySnapshot) => {
      this.mensajes = [];
      querySnapshot.forEach((doc) => {
        this.mensajes.unshift({
          mensaje: doc.data().mensaje,
          foto: doc.data().foto,
          nombre: doc.data().nombre,
          fecha: moment(doc.data().fecha).format("lll"),
        });
      });
    });
  },
};
</script>
