<template>
  <v-dialog v-model="dialog">
    <v-card width="120vh" height="60vh" style="overflow: hidden">
      <p>teste</p></v-card
    >
  </v-dialog>
</template>

<script>
import { mqttConnection } from "../scripts/pubsub.js";
import { findActiveAdhesions } from "../scripts/mongo.js";

export default {
  name: "HubAdhesions",
  props: {
    dialog: Boolean,
  },
  created() {
    var client = mqttConnection();

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
