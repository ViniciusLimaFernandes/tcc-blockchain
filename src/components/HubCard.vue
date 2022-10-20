<template>
  <v-card :loading="loading" class="card">
    <v-progress-linear
      v-if="loading"
      class="position-absolute"
      style="z-index: 1"
      color="#ffffff"
      height="10"
      indeterminate
    ></v-progress-linear>

    <img id="hub-image" src="../assets/hub-iot.png" cover />

    <v-card-item>
      <v-card-title>{{ hub.name }}</v-card-title>

      <v-card-subtitle>
        <span class="mr-1">{{ hub.publicKey }}</span>

        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :model-value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="10"
        ></v-rating>

        ({{ hub.usages }})
      </v-row>

      <div class="my-4 text-subtitle-1">⚡ • R$ {{ hub.price }} /KWh</div>

      <v-row v-if="hub.owner == userWallet" style="margin-left: 2px"
        >Saldo: {{ hub.balance }} SOL
        <v-btn
          size="x-small"
          color="green"
          style="margin-left: 12px; margin-bottom: 4px"
        >
          sacar
        </v-btn></v-row
      >
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title style="font-size: 16px">portas disponíveis</v-card-title>

    <div class="px-4">
      <v-chip-group v-model="selection">
        <v-chip v-for="port in hub.ports">{{ port }}</v-chip>
      </v-chip-group>
    </div>

    <v-card-actions>
      <v-btn color="deep-purple-lighten-2 " text @click="confirm">
        selecionar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useWallet } from "solana-wallets-vue";

export default {
  name: "HubCard",
  props: {
    hub: Object,
  },
  data: () => ({
    loading: false,
    userWallet: useWallet().publicKey.value.toString(),
    selection: 1,
  }),
  methods: {
    confirm() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 4000);
    },
    isOwner() {
      console.log(`User wallet: ${this.userWallet}, hub owner: ${hub.owner}`);
      return this.userWallet == hub.owner;
    },
  },
};
</script>

<style>
.card {
  width: 25vh;
}

#hub-image {
  width: 25vh;
  height: 20vh;
}
</style>
