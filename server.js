const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const cilent = new MongoClient(url);

app.listen(5100, function (req, res) {
  console.log("Marvellous Server is started succesfully");
});

// handing cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with,Content-type,Accept"
  );
  next();
});

app.get("/getBatches", MarvellousGetBatches);

function MarvellousGetBatches(req, res) {
  res.json({ data });
}

async function Connection() {
  let result = await cilent.connect();
  let db = result.db("Marvellous");
  return db.collection("Batches");
}

// async function readData() {
//   data = await Connection();
//   data = await data.find().toArray();
//   console.log("data form Marvellous Database is: ");
//   console.log(data);
// }
async function readData() {
  data = await Connection();
  data = await data.find({ Batch: "PPA" }).toArray();
  console.log("data form Marvellous Database is: ");
  console.log(data);
}

async function deleteData() {
  let data = await getConnection();
  let result = await data.deleteOne({ Batch: "angular" });
  if (result.acknowledged) {
    console.log("Delete operation is performed succesfully");
  }
}
async function insertData() {
  let data = await getConnection();
  let result = await data.insertOne({ Batch: "Logic building", FESS: "14000" });
  if (result.acknowledged) {
    console.log("insert operation is performed succesfully");
  }
}
async function updateData() {
  let data = await getConnection();
  let result = await data.updateOne(
    { Batch: "Logic building" },
    { $set: { FEES: "12000" } }
  );
  if (result.acknowledged) {
    console.log("update operation is successfully ");
  }
}

function main() {
  readData();
  //deleteData();
  // insertData();
  // updateData();
}
main();
