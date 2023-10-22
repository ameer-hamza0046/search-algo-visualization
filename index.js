import express from "express";
import path from "path";
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.resolve() + "/public/index.html");
});

app.listen(3000, () => {
  console.log("listening...");
});
