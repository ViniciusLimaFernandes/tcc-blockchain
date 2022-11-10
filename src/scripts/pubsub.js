export const config = {
  host: import.meta.env.VITE_MQTT_HOST,
  hostname: import.meta.env.VITE_MQTT_HOST,
  port: 8884,
  path: "/mqtt",
  protocol: "wss",
  username: import.meta.env.VITE_MQTT_USER,
  password: import.meta.env.VITE_MQTT_PASS,
};

export const Adhesion = class {
  constructor(hubID, port, consumed, totalKwh, active) {
    this.hub = hubID;
    this.port = port;
    this.consumed = consumed;
    this.total_kwh = totalKwh;
    this.active = active;
  }

  static from(json) {
    return Object.assign(new AdhesionStatus(), json);
  }
};
