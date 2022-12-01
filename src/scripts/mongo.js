import axios from "axios";

const url =
  "https://cors-anywhere.herokuapp.com/https://data.mongodb-api.com/app/data-ilhtg/endpoint/data/v1/action";

const headers = {
  headers: {
    "api-key": import.meta.env.VITE_MONGO_API_KEY,
    "x-requested-with": "axios-web",
  },
};

const defultBody = () => {
  return {
    collection: "adhesions",
    database: "devices",
    dataSource: "TCC-Cluster",
  };
};

export const findActiveAdhesions = () => {
  const findHubUrl = `${url}/find`;
  const filter = {
    active: true,
  };
  let findBody = defultBody();
  findBody.filter = filter;

  let adhesions = [];

  axios.post(findHubUrl, findBody, headers).then((result) => {
    result.data.documents.map((adhesion) => {
      adhesions.push(adhesion);
    });
  });

  return adhesions;
};

export const findAdhesionsByHub = async () => {
  const findHubUrl = `${url}/find`;
  const filter = {
    active: true,
  };
  let findBody = defultBody();
  findBody.filter = filter;

  let result = await axios.post(findHubUrl, findBody, headers);
  let adhesions = result.data.documents;

  let adhesionsByHub = adhesions.reduce((iA, cA) => {
    (iA[cA.hub] = iA[cA.hub] || []).push(cA.port);
    return iA;
  }, {});

  console.log(result);
  console.log(adhesionsByHub);
  return adhesionsByHub;
};

export const createAdhesion = (adhesion) => {
  const createAdhesionUrl = `${url}/insertOne`;
  let createBody = defultBody();
  createBody.document = adhesion;

  console.log(createBody);

  axios.post(createAdhesionUrl, createBody, headers).then((result) => {
    console.log(`adhesion ${result.data.insertedId} successfully created`);
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

  let updateBody = defultBody();
  updateBody.filter = filter;
  updateBody.update = update;

  axios.post(updateAdhesionUrl, updateBody, headers).then((result) => {
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
