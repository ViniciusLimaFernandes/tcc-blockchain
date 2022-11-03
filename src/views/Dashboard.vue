<script setup>
import AddHub from "../components/AddHub.vue";
import HubCard from "../components/HubCard.vue";
import HubAdhesionsVue from "../components/HubAdhesions.vue";
</script>

<template>
  <HubAdhesionsVue :dialog="false" />
  <v-alert type="error" v-if="alertDisconnected" class="alert">
    Desconectado</v-alert
  >
  <v-app v-if="isConnected" :key="refresh" class="dash-app">
    <v-container class="dash-container">
      <v-alert type="success" v-if="alertConnected" class="alert">
        Conexão realizada com sucesso!</v-alert
      >
      <v-alert type="success" v-if="alertSuccess" class="alert">
        Transação concluida!</v-alert
      >
      <AddHub @updateHubs="updateHubs" />
      <v-progress-linear
        v-if="loading"
        color="deep-purple accent-4"
        indeterminate
        rounded
        height="6"
      >
      </v-progress-linear>
      <p v-if="!loading" class="dash-title">Painel de controle</p>
      <p v-if="!loading" class="dash-hubs">Hubs: {{ hubs.length }}</p>

      <v-row v-if="!loading">
        <v-col id="hub-cols" v-for="hub in hubs">
          <HubCard :hub="hub" @updateHubs="updateHubs" />
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
      alertSuccess: false,
      loading: false,
      refresh: 0,
      hubs: [],
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
    hubs() {
      console.log(`Len: ${this.hubs.length}, Bool: ${this.hubs.length == 0}`);
      if (this.hubs.length == 0) {
        this.loading = true;
      }
      setTimeout(() => {
        this.loading = false;
      }, 5000);
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
    alertSuccess(status) {
      if (status) {
        setTimeout(() => {
          this.alertSuccess = false;
        }, 5000);
      }
    },
  },

  methods: {
    updateHubs() {
      this.hubs.pop();
      const updatedHubs = getAllHubs();
      this.hubs = updatedHubs;

      setTimeout(() => {
        this.refresh += 1;
      }, 5000);

      this.alertSuccess = true;
    },
  },

  created() {
    this.hubs = getAllHubs();
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
