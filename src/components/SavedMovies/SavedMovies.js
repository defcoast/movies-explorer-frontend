import React from "react";
import './SavedMovies.css';
import '../../index.css';
import SearchForm from "../movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";

export default function Movies(props) {

	/** Обработчик формы поискового запроса фильмов. */
	function handleSubmit() {
	}

	return (
		<section className="movies">
			<Header
				loggedIn={props.loggedIn}
			/>
			<SearchForm
				onSubmit={handleSubmit}
			/>
			<SavedMoviesCardList
				moviesList={props.savedMoviesList}
				needShowPreloader={props.needShowPreloader}
				needShowNotFoundMsg={props.needShowNotFoundMsg}
				needShowApiErrorMsg={props.needShowApiErrorMsg}
				onRemoveSavedMovieCard={props.onRemoveSavedMovieCard}
			/>
			<Footer />
		</section>
	);
}
