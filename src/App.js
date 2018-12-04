import React, { Component } from "react";
import axios from "axios";
import Collection from "./components/Collection";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stuff: [],
			selectedCard: null,
			selectedName: "",

			toggle: false
		};
	}

	componentDidMount() {}

	render() {
		const { stuff, favoritesList, selectedCard } = this.state;

		const style = {
			color: this.state.toggle ? "red" : "blue"
		};

		return (
			<div className="App">
				<header />
				<Collection />
			</div>
		);
	}
}

export default App;
