import React from "react";
import './SavedMovies.css';
import SearchForm from "../movies/SearchForm/SearchForm";
import MoviesCardList from "../movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export default function SavedMovies() {
	return (
		<section className="saved-movies">
			<Header />
			<SearchForm />
			<MoviesCardList />
			<Footer />
		</section>
	);
}
