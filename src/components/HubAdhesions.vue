<template></template>

<script>
import mqtt from "mqtt";
import { config } from "../scripts/pubsub.js";

export default {
  name: "HubAdhesions",
  created() {
    console.log(process.env.VUE_APP_MQTT_HOST);
    var client = mqtt.connect(config);

    client.on("connect", () => {
      console.log("Connected");
    });

    client.on("error", (error) => {
      console.log("sheee");
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
