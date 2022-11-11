import axios from "axios";

const url =
  "https://cors-anywhere.herokuapp.com/https://data.mongodb-api.com/app/data-ilhtg/endpoint/data/v1/action";

const headers = {
  headers: {
    "api-key": import.meta.env.VITE_MONGO_API_KEY,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

let body = {
  collection: "adhesions",
  database: "devices",
  dataSource: "TCC-Cluster",
};

export const findActiveAdhesions = async () => {
  const findHubUrl = `${url}/find`;
  const filter = {
    active: true,
  };
  body.filter = filter;

  const adhesions = await axios.post(findHubUrl, body, headers);

  return adhesions.data.documents;
};

export const createAdhesion = (adhesion) => {
  const createAdhesionUrl = `${url}/insertOne`;
  body.document = adhesion;

  axios.post(createAdhesionUrl, body, headers).then((result) => {
    console.log(`adhesion ${result.insertedId} successfully created`);
  });
};

export const updateAdhesion = (hubId) => {
  const updateAdhesionUrl = `${url}/updateOne`;
  const filter = {
    hub: hubId,
    active: true,
  };
  const update = {
    $set: { active: false },
  };

  body.filter = filter;
  body.update = update;

  axios.post(updateAdhesionUrl, body, headers).then((result) => {
    console.log(`hub ${hubId} successfully updated`);
  });
};

export const Adhesion = class {
  constructor(hubID, owner, port, consumed, totalKwh, active) {
    this.hub = hubID;
    this.owner = owner;
    this.port = port;
    this.consumed = consumed;
    this.total_kwh = totalKwh;
    this.active = active;
    this.created_at = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
  }

  static from(json) {
    return Object.assign(new AdhesionStatus(), json);
  }
};
