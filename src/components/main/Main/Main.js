import React from "react";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";

export default function Main(props) {
	return (
		<>
			<main className="main">
				<Header
					loggedIn={props.loggedIn}
				/>
				<Promo />
				<AboutProject />
				<Techs />
				<AboutMe />
				<Footer />
			</main>
		</>
	);
}
