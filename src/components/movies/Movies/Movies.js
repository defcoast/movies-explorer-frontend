import React from "react";
import './Movies.css';
import '../../../index.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";

export default function Movies(props) {
	function handleSubmit() {
		props.onSubmit(true);
	}

	return (
		<section className="movies">
			<Header />
			<SearchForm
				onSubmit={handleSubmit}
			/>
			<MoviesCardList
				needShowMoviesCards={props.needShowMoviesCards}
				needShowPreloader={props.needShowPreloader}
				needShowErrorMsg={props.needShowErrorMsg}
				cards={props.cards}
				onSubmit={props.onSubmit}
			/>
			<Footer />
		</section>
	);
}
