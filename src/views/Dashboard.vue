<template>
  <v-alert type="error" v-if="alertDisconnected" class="alert">
    You must connect your wallet</v-alert
  >
  <v-app v-if="isConnected" class="dash-app">
    <v-container class="dash-container">
      <v-alert type="success" v-if="alertConnected" class="alert">
        Connection successfuly made!</v-alert
      >
      <p class="dash-title">Control panel</p>
      <p class="dash-hubs">Hubs: 1</p>
      <v-btn style="position: fixed; z-index: -1"> Add device</v-btn>
    </v-container>
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

<style scoped>
@font-face {
  font-family: Inter;
  src: url("./fonts/Inter-Light.otf");
}
.dash-app {
  margin-top: 4vh;
  min-width: fit-content;
}

.dash-title {
  font-family: "Inter-Extrabold";
  font-style: bold;
  font-weight: 800;
  font-size: 25px;
  line-height: 44px;

  background: radial-gradient(
    141.6% 247.26% at 4.44% -42.89%,
    #fe1aa7 0%,
    #fefdc2 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dash-hubs {
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 44px;

  background: radial-gradient(
    141.6% 247.26% at 4.44% -42.89%,
    #fe1aa7 0%,
    #fefdc2 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.alert {
  width: fit-content;
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
}
</style>
