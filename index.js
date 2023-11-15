import express from "express";
import path from "path";
const app = express();
const __dirname = path.resolve();

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
  console.log("The server is running at port 3000...");
});
