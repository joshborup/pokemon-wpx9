import React, { Component } from "react";
import { Switch, NavLink, Route } from "react-router-dom";
import Favorites from "./components/Favorites";
import Collection from "./components/Collection";
import "./App.css";

class App extends Component {
	render() {
		return (
			<div className="App">
				<header>
					<NavLink exact to="/">
						Home
					</NavLink>
					<NavLink to="/favorites">Favorites</NavLink>
				</header>
				<Switch>
					<Route path="/favorites" component={Favorites} />
					<Route path="/" component={Collection} />
				</Switch>
			</div>
		);
	}
}

export default App;
