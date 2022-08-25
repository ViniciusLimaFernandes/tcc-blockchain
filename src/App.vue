<script setup>
import { WalletMultiButton } from "solana-wallets-vue";
</script>

<template>
  <v-app>
    <v-main>
      <v-app-bar elevation="4">
        <h1>Vini APP</h1>
        <wallet-multi-button dark />
      </v-app-bar>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
