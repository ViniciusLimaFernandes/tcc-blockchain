<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <v-progress-linear
      v-if="loading"
      class="position-absolute"
      style="z-index: 1"
      color="deep-purple"
      height="10"
      indeterminate
    ></v-progress-linear>

    <v-img height="250" src="../assets/hub-iot.png" cover></v-img>

    <v-card-item>
      <v-card-title>{{ hub.name }}</v-card-title>

      <v-card-subtitle>
        <span class="mr-1">{{ hub.publicKey.toBase58() }}</span>

        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>Portas disponíveis</v-card-title>

    <!-- <div class="px-4">
      <v-chip-group v-model="selection" v-for="port in hub.ports">
        <v-chip>{{ port }}</v-chip>
      </v-chip-group>
    </div> -->

    <v-card-actions>
      <v-btn color="deep-purple-lighten-2" text @click="confirm">
        confirmar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "HubCard",
  props: {
    hub: Object,
  },
  data: () => ({
    loading: false,
    selection: 1,
  }),
  methods: {
    confirm() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>

<style></style>
