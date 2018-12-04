import React, { Component } from "react";
import Favorites from "./components/Favorites";
import Collection from "./components/Collection";
import { Switch, NavLink, Route } from "react-router-dom";
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
					<Route exact path="/" component={Collection} />
					<Route path="/favorites" component={Favorites} />
				</Switch>
			</div>
		);
	}
}

export default App;
