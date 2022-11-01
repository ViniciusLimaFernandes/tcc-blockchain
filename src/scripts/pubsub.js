export const config = {
  host: process.env.MQTT_HOST,
  hostname: process.env.MQTT_HOST,
  port: 8884,
  path: "/mqtt",
  protocol: "wss",
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS,
};
