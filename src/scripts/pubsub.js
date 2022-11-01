export const config = {
  host: import.meta.env.VITE_MQTT_HOST,
  hostname: import.meta.env.VITE_MQTT_HOST,
  port: 8884,
  path: "/mqtt",
  protocol: "wss",
  username: import.meta.env.VITE_MQTT_USER,
  password: import.meta.env.VITE_MQTT_PASS,
};
