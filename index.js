import express from "express";
const app = express();

app.get('/', (req, res) => {
    res.send("Hello world... me is here... how is you?... no thank you... you are potato... yayyyy");
})

app.listen(3000, () => {
    console.log("listening...");
})