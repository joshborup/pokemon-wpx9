const express = require("express");
const app = express();
const bodyParser = require("body-parser");
<<<<<<< HEAD
const controller = require("./controller.js");
app.use(bodyParser.json());

app.get("/api/favorites", controller.readFavorites);

app.post("/api/favorites", controller.postToFavorites);

app.put("/api/favorites/:id", controller.updateFavorites);

app.delete("/api/favorites/:id", controller.deleteFromFavorites);

app.get("/api/search", controller.searchOnServer);

const PORT = 4000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
=======

app.use(bodyParser.json());

let favorites = [];
let id = 0;

app.get("/api/favorites", (req, res) => {
	res.status(200).send(favorites);
});

app.post("/api/favorites", (req, res) => {
	const { imageUrl, name } = req.body;
	const newFavorite = {
		id: id,
		imageUrl: imageUrl,
		name: name.toLowerCase()
	};

	if (favorites.length < 6) {
		favorites.push(newFavorite);
		id++;
		console.log(favorites);
		res.status(200).send(favorites);
	} else {
		res.status(403).send(
			"You cant add anymore cards, try deleting one first"
		);
	}
});

app.put("/api/favorites/:id", (req, res) => {
	const { imageUrl, name } = req.body;
	const { id } = req.params;

	favorites.forEach((card) => {
		if (card.id === parseInt(id)) {
			card.imageUrl = imageUrl;
			card.name = name.toLowerCase();
		}
	});

	res.status(200).send(favorites);
});

app.delete("/api/favorites/:id", (req, res) => {
	const { id } = req.params;
	favorites = favorites.filter((card) => {
		// console.log("line 51", card.id !== +id);
		return card.id !== parseInt(id);
	});

	console.log(favorites);
	res.status(200).send(favorites);
});

app.get("/api/search", (req, res) => {
	const { name } = req.query;
	let searched = name.toLowerCase();
	let filteredList = favorites.filter((card) => {
		console.log(
			"card.name.includes(searched);",
			card.name.includes(searched)
		);
		console.log("card.name", card.name, name);
		return card.name.includes(searched);
	});

	if (name) {
		res.status(200).send(filteredList);
	} else {
		res.status(200).send(favorites);
	}
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
>>>>>>> solution
