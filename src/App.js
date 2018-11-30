import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stuff: [],
			selectedCard: null,
			selectedName: "",
			favoritesList: [],
			searchTerm: "",
			toggle: false
		};
		this.getDataFromUrl = this.getDataFromUrl.bind(this);
		this.postUserCardToTheServer = this.postUserCardToTheServer.bind(this);
		this.getFavoritesFromServer = this.getFavoritesFromServer.bind(this);
	}

	componentDidMount() {
		this.getDataFromUrl();
		this.getFavoritesFromServer();
	}

	setCard(card) {
		this.setState({
			selectedCard: card.imageUrl,
			selectedName: card.name
		});
	}

	getDataFromUrl() {
		axios.get("https://api.pokemontcg.io/v1/cards").then((response) => {
			this.setState({
				stuff: response.data.cards
			});
		});
	}

	getFavoritesFromServer() {
		axios.get("/api/favorites").then((response) => {
			this.setState({
				favoritesList: response.data
			});
		});
	}

	postUserCardToTheServer() {
		const savedCard = {
			imageUrl: this.state.selectedCard,
			name: this.state.selectedName
		};
		axios.post("/api/favorites", savedCard).then((response) => {
			this.setState({
				favoritesList: response.data
			});
		});
	}

	updateFavorite(id) {
		const updatedCard = {
			imageUrl: this.state.selectedCard,
			name: this.state.selectedName
		};
		axios.put(`/api/favorites/${id}`, updatedCard).then((response) => {
			this.setState({
				favoritesList: response.data
			});
		});
	}

	deleteCardFromServer(id) {
		axios.delete(`/api/favorites/${id}`).then((response) => {
			this.setState({
				favoritesList: response.data
			});
		});
	}

	search(value) {
		axios.get(`/api/search?name=${value}`).then((response) => {
			this.setState({
				favoritesList: response.data,
				searchTerm: value
			});
		});
	}

	render() {
		const { stuff, favoritesList, selectedCard } = this.state;

		const myCards = stuff.length ? (
			stuff.map((card) => {
				return (
					<img
						key={card.name}
						onClick={() => {
							this.setCard(card);
						}}
						src={card.imageUrl}
					/>
				);
			})
		) : (
			<img src="https://media1.giphy.com/media/jM4bWFBKpSFeo/giphy.gif?cid=3640f6095bfed28252686834774bbc44" />
		);

		const myFavorites = favoritesList.map((card) => {
			return (
				<div key={card.id} className="card">
					<img src={card.imageUrl} />
					<button onClick={() => this.updateFavorite(card.id)}>
						Update With Selected
					</button>
					<button
						className="delete"
						onClick={() => this.deleteCardFromServer(card.id)}>
						X
					</button>

					{/* <select
						onChange={(e) => {
							let { value } = e.target;
							if (value === "delete") {
								this.deleteCardFromServer(card.id);
							} else if (value === "update") {
								this.updateFavorite(card.id);
							}
						}}>
						<option value="not selected" />
						<option value="delete">delete</option>
						<option value="update">update</option>
					</select> */}
				</div>
			);
		});

		const style = {
			color: this.state.toggle ? "red" : "blue"
		};

		return (
			<div className="App">
				<header>
					<div className="search-container">
						<span
							onClick={() =>
								this.setState({ toggle: !this.state.toggle })
							}
							style={style}>
							search
						</span>
						<input
							value={this.state.searchTerm}
							onChange={(e) => {
								this.search(e.target.value);
							}}
						/>
					</div>

					<div className="favorites-container">{myFavorites}</div>
				</header>

				<section>
					<div className="card-collection-container">{myCards}</div>
				</section>

				<div className="selected-card-container">
					<img src={selectedCard} />
					<button onClick={() => this.postUserCardToTheServer()}>
						ADD
					</button>
				</div>
			</div>
		);
	}
}

export default App;
