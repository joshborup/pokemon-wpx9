import React, { Component } from "react";
import axios from "axios";

export default class Favorites extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favoritesList: [],
			searchTerm: "",
			toggle: false
		};

		this.getFavoritesFromServer = this.getFavoritesFromServer.bind(this);
	}

	componentDidMount() {
		this.getFavoritesFromServer();
	}

	getFavoritesFromServer() {
		axios.get("/api/favorites").then((response) => {
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
		const { favoritesList } = this.state;

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
				</div>
			);
		});

		return (
			<div>
				<div className="search-container">
					<span>search</span>
					<input
						value={this.state.searchTerm}
						onChange={(e) => {
							this.search(e.target.value);
						}}
					/>
				</div>

				<div className="favorites-container">{myFavorites}</div>
			</div>
		);
	}
}
