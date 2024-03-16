const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;

const fs = require("fs");
app.use(
  cors({
    origin:[ "https://priyanshu-food-app.netlify.app","http:/localhost:1234"]
    methods: ["GET"],
  })
);

const dbConnect = () =>
  mongoose
    .connect(
      "mongodb+srv://mishrapriyanshu793:v3ZvK45OTL7mKtsx@mycluster.7voxtp7.mongodb.net/ProductsDB"
    )
    .then(() => {
      console.log("Mongodb Connected Successfully");
    })
    .catch(() => {
      console.log("Error in Connecting to Mongodb Server");
    });

dbConnect();

app.get("/api/restaurants", (req, res) => {
  fs.readFile("./mockData.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const response = JSON.parse(data);
    res.status(200).json(response);
  });
});
app.get("/api/restaurants/:id", (req, res) => {
  const id = req.params.id;

  dbConnect().then(() => {
    const db = mongoose.connection.db;
    db.collection("products")
      .find({ "data.cards.0.card.card.info.id": id })
      .toArray()
      .then((data) => {
        res.json(data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  });
});

app.listen(port, () => console.log(`listening to the port ${port}`));
