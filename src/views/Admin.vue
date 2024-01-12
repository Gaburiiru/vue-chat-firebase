<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs8>
        <v-card class="text-center">
          <v-card-text>
            <v-avatar>
              <img :src="usuario.foto" alt="avatar" class="" />
            </v-avatar>
          </v-card-text>
          <v-card-text>
            <h3 class="text-center">{{ usuario.nombre }}</h3>
          </v-card-text>
          <v-card-text>
            <input
              type="file"
              ref="boton"
              class="d-none"
              @change="searchImg($event)"
            />
            <v-btn
              class="blue lighten-1 white--text mr-4"
              @click="$refs.boton.click()"
            >
              Buscar imagen
            </v-btn>
            <v-btn
              class="green lighten-1 white--text"
              :disabled="file === null"
              @click="uploatImg()"
              :loading="loading"
            >
              Agregar imagen
            </v-btn>
          </v-card-text>
          <v-card-text v-if="mensaje">
            <h4 color="red--text">{{ mensaje }}</h4>
          </v-card-text>
          <v-card-text v-if="file">
            <h4>{{ file.name }}</h4>
            <v-img :src="urlTemp"></v-img>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { firebase, storage, db } from "@/firebase";

export default {
  name: "admin",
  data() {
    return {
      file: null,
      urlTemp: "",
      loading: false,
      mensaje: null,
    };
  },
  computed: {
    ...mapState(["usuario"]),
  },
  methods: {
    searchImg(event) {
      const tipoImagen = event.target.files[0].type;

      if (
        tipoImagen === "image/jpeg" ||
        tipoImagen === "image/png" ||
        tipoImagen === "image/jpg"
      ) {
        this.file = event.target.files[0];
        this.mensaje = null;
      } else {
        this.mensaje = "Archivo no admitido";
        this.file = null;
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => {
        this.urlTemp = e.target.result;
      };
    },
    async uploatImg() {
      try {
        this.loading = true;
        const imagen = storage
          .ref()
          .child(this.usuario.uid)
          .child("foto de perfil");

        const res = await imagen.put(this.file);
        // console.log(res);
        const urlUpdate = await imagen.getDownloadURL();
        this.usuario.foto = urlUpdate;
        await db.collection("usuarios").doc(this.usuario.uid).update({
          foto: urlUpdate,
        });

        this.mensaje = "Imagen subida con éxito";
        this.file = null;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>