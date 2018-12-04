import React, { Component } from "react";
import axios from "axios";

export default class Collection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stuff: [],
			selectedCard: null,
			selectedName: ""
		};
		this.getDataFromUrl = this.getDataFromUrl.bind(this);
		this.postUserCardToTheServer = this.postUserCardToTheServer.bind(this);
	}

	componentDidMount() {
		this.getDataFromUrl();
	}

	getDataFromUrl() {
		axios.get("https://api.pokemontcg.io/v1/cards").then((response) => {
			this.setState({
				stuff: response.data.cards
			});
		});
	}
	setCard(card) {
		this.setState({
			selectedCard: card.imageUrl,
			selectedName: card.name,
			success: ""
		});
	}

	postUserCardToTheServer() {
		const savedCard = {
			imageUrl: this.state.selectedCard,
			name: this.state.selectedName
		};
		axios.post("/api/favorites", savedCard).then((response) => {
			this.setState({
				favoritesList: response.data,
				selectedCard: "",
				selectedName: "",
				success: "Posted Successfully"
			});
		});
	}

	render() {
		const { stuff, selectedCard } = this.state;

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

		return (
			<div>
				<section>
					<div className="card-collection-container">{myCards}</div>
				</section>

				<div className="selected-card-container">
					{this.state.success ? (
						this.state.success
					) : (
						<img src={selectedCard} />
					)}
					<button onClick={() => this.postUserCardToTheServer()}>
						ADD
					</button>
				</div>
			</div>
		);
	}
}
