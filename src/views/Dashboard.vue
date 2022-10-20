<script setup>
import AddHub from "../components/AddHub.vue";
import HubCard from "../components/HubCard.vue";
</script>

<template>
  <v-alert type="error" v-if="alertDisconnected" class="alert">
    You must connect your wallet</v-alert
  >
  <v-app v-if="isConnected" class="dash-app">
    <v-container class="dash-container">
      <v-alert type="success" v-if="alertConnected" class="alert">
        Conexão realizada com sucesso!</v-alert
      >
      <AddHub />
      <p class="dash-title">Painel de controle</p>
      <p class="dash-hubs">Hubs: {{ hubs.length }}</p>

      <v-row>
        <v-col id="hub-cols" v-for="hub in hubs">
          <HubCard :hub="hub" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { useWallet } from "solana-wallets-vue";
import { getAllHubs } from "../scripts/solana";

export default {
  name: "Dashboard",

  data() {
    return {
      wallet: useWallet().connected,
      isConnected: false,
      alertConnected: false,
      alertDisconnected: false,
      hubs: getAllHubs(),
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

  methods: {
    async getHubs() {
      const hubs = await getAllHubs();
      console.log(hubs);
      return hubs;
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: Inter;
  src: url("./fonts/Inter-Light.otf");
}

@keyframes fadeinout {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
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
  z-index: 99999999;
  width: fit-content;
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  animation: fadeinout 2s linear 1 forwards;
}

#hub-cols {
  padding: 5px;
  margin-top: 2vh;
}
</style>
