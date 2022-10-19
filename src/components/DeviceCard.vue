<script setup>
import RegisterDeviceForm from "./RegisterDeviceForm.vue";
</script>

<template>
  <v-card class="card">
    <RegisterDeviceForm :dialog="showDialog" @closeDialog="closeDialog" />
    <v-btn class="add-device-button" icon @click="openDialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <p class="card-text">create new device</p>
  </v-card>
</template>

<script>
export default {
  name: "DeviceCard",
  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    openDialog() {
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: Inter;
  src: url("./fonts/Inter-Light.otf");
}
.card {
  width: 25vh;
  margin-left: 2vh;
  margin-top: 2vh;
}

.card-text {
  font: Inter;
  position: relative;
  text-align: center;
  top: 60%;
  margin-top: 1vh;

  color: darkgrey;
}

.add-device-button {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
