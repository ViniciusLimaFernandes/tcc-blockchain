<script setup>
import { WalletMultiButton } from "solana-wallets-vue";
import Dashboard from "./views/Dashboard.vue";
</script>

<template>
  <v-app class="home">
    <v-main>
      <v-app-bar flat color="transparent" style="margin-top: 1vh; height: 35vh">
        <v-app-bar-title
          ><img class="toolbar-image" src="./assets/logo.png" contain
        /></v-app-bar-title>
        <v-toolbar-items style="padding-right: 2vh; align-items: center">
          <wallet-multi-button dark />
        </v-toolbar-items>
      </v-app-bar>

      <v-container class="Home-content">
        <Dashboard />
        <h1 id="home-title">Blockchain,</h1>
        <h1 id="home-title">IoT,</h1>
        <h1 id="home-title">Inovação</h1>
        <p id="home-subtitle">
          Mantenha o controle dos seus dispositivos de forma segura e
          transparente.
        </p>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
@font-face {
  font-family: Inter;
  src: url("./fonts/Inter-Light.otf");
}

@font-face {
  font-family: Inter-Extrabold;
  src: url("./fonts/Inter-ExtraBold.otf");
}
.home {
  background: url("./assets/bg.png");
  background-size: cover;
  min-height: 100vh;
}

.toolbar-image {
  padding-left: 5vh;
  padding-right: 5vh;
}

.Home-content {
  position: absolute;
  width: 511px;
  height: 269px;
  left: 110px;
  top: 337px;
}

#home-title {
  font-family: "Inter-Extrabold";
  font-style: bold;
  font-weight: 800;
  font-size: 80px;
  line-height: 97px;

  background: radial-gradient(
    114.63% 155.16% at 4.44% -42.89%,
    #ff3eb5 0%,
    #fefdc2 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

#home-subtitle {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
}
</style>
