const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const controller = require("./controller.js");
app.use(bodyParser.json());

app.get("/api/favorites", controller.readFavorites);

app.post("/api/favorites", controller.postToFavorites);

app.put("/api/favorites/:id", controller.updateFavorites);

const PORT = 4000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
