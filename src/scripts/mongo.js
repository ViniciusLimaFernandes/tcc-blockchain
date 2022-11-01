const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://tcc_bc_user:<password>@tcc-bc-cluster.7blyaqj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
