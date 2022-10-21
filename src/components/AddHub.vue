<script setup>
import AddHubForm from "./AddHubForm.vue";
</script>

<template>
  <AddHubForm
    :dialog="showDialog"
    @closeDialog="closeDialog"
    @updateHubs="updateHubs"
  />
  <v-btn
    class="add-device-button"
    icon="mdi-plus"
    color="#FE6AB1"
    @click="openDialog"
  />
</template>

<script>
export default {
  name: "AddHub",
  emits: ["updateHubs"],
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
    updateHubs() {
      this.$emit("updateHubs");
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
  z-index: 9999999;
  margin: 0;
  position: fixed;
  right: 50px;
  bottom: 50px;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
