<template></template>

<script>
import mqtt from "mqtt";
import { config } from "../scripts/pubsub.js";

export default {
  name: "HubAdhesions",
  created() {
    console.log(config);
    var client = mqtt.connect(config);

    client.on("connect", () => {
      console.log("Connected");
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
