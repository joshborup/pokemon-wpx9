const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

let favorites = [];
let id = 0;

app.get("/api/favorites", (req, res) => {
	res.status(200).send(favorites);
});

app.post("/api/favorites", (req, res) => {
	const { imageUrl, name } = req.body;
	const newFavorite = {
		imageUrl: imageUrl,
		name: name,
		id: id
	};
	favorites.push(newFavorite);
	id++;
	res.status(200).send(favorites);
});

app.put("/api/favorites/:id", (req, res) => {
	const { id } = req.params;
	const { imageUrl, name } = req.body;
	favorites.forEach((card) => {
		if (card.id === +id) {
			card.imageUrl = imageUrl;
			card.name = name;
		}
	});
	res.status(200).send(favorites);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
