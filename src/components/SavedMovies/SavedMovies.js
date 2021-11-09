import React from "react";
import './SavedMovies.css';
import SearchForm from "../movies/SearchForm/SearchForm";
import MoviesCardList from "../movies/MoviesCardList/MoviesCardList";

export default function SavedMovies() {
	return (
		<section className="saved-movies">
			<div className="container">
				<SearchForm />
				<MoviesCardList />
			</div>
		</section>
	);
}
