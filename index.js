const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = 3000;
const ipAddress = process.env.IP_ADDRESS;

app.use(bodyParser.json({ limit: "50mb" }));

app.post("/echo", (req, res) => {
  const data = req.body;

  // Generate a unique filename based on the current timestamp
  const timestamp = Date.now();
  const filename = `Saved/data_${timestamp}.txt`;
  const filePath = `${__dirname}/${filename}`;

  // Convert the data to a string
  const dataString = JSON.stringify(data);

  // Save the data to a text file
  fs.writeFile(filePath, dataString, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving data");
    } else {
      console.log(`Data saved successfully to ${filename}`);
      res.json(data);
    }
  });
});

app.listen(port, ipAddress, () => {
  console.log(`Server is running on ${ipAddress}:${port}`);
});
