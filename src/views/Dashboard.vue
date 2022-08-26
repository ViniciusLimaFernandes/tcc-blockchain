<template>
  <v-app>
    <v-main>
      <v-alert type="warning" v-if="alertDisconnected">
        You must connect your wallet</v-alert
      >
      <v-alert type="success" v-if="alertConnected">
        Connection successfuly made!</v-alert
      >
      <p v-if="isConnected">TESTEEEEE</p>
    </v-main>
  </v-app>
</template>

<script>
import { useWallet } from "solana-wallets-vue";

export default {
  name: "Dashboard",

  data() {
    return {
      wallet: useWallet().connected,
      isConnected: false,
      alertConnected: false,
      alertDisconnected: false,
    };
  },

  watch: {
    wallet: {
      handler(connection) {
        this.isConnected = connection;
        this.alertConnected = connection;
        this.alertDisconnected = !connection;
        console.log(connection);
      },
      deep: true,
    },
    alertConnected(status) {
      if (status) {
        console.log("Connected alert: ", status);
        setTimeout(() => {
          this.alertConnected = false;
        }, 5000);
      }
    },
    alertDisconnected(status) {
      if (status) {
        setTimeout(() => {
          this.alertDisconnected = false;
        }, 5000);
      }
    },
  },
};
</script>
