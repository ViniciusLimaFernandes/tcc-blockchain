<script setup>
import { WalletMultiButton } from "solana-wallets-vue";
</script>

<template>
  <v-app class="home">
    <v-main>
      <v-toolbar flat color="transparent" absolute width="100%">
        <img class="toolbar-image" src="./assets/logo.png" contain />
        <wallet-multi-button dark />
      </v-toolbar>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
.home {
  background: url("./assets/bg.png");
  background-size: cover;
  min-height: 100vh;
}

.toolbar-image {
  padding-left: 5vh;
  padding-right: 5vh;
}
</style>
