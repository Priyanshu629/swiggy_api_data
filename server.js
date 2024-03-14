const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;

const fs = require("fs");

app.use(
  cors({
    origin: "http://localhost:1234",
    methods: ["GET"],
  })
);

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

app.listen(port, () => console.log(`listening to the port ${port}`));
