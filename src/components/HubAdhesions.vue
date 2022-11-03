<template>
  <v-dialog v-model="dialog">
    <v-card width="120vh" height="60vh" style="overflow: hidden">
      <p>teste</p></v-card
    >
  </v-dialog>
</template>

<script>
import mqtt from "mqtt";
import { config } from "../scripts/pubsub.js";

export default {
  name: "HubAdhesions",
  props: {
    dialog: Boolean,
  },
  created() {
    console.log(config);
    var client = mqtt.connect(config);

    client.on("connect", () => {
      console.log("Connected with MQTT topic");
    });

    client.on("error", (error) => {
      console.log(error);
    });

    client.on("message", (topic, message) => {
      console.log("Received message:", topic, message.toString());
    });

    client.subscribe("esp");
  },
};
</script>

<style scoped></style>
