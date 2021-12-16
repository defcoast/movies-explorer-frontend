import React, {useState, useEffect} from "react";
import './SavedMovies.css';
import SearchForm from "../movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";

export default function SavedMovies({savedMoviesList, setSavedMoviesList, loggedIn}) {


	return (
		<section className="saved-movies">
			<Header
				loggedIn={loggedIn}
			/>
			<SearchForm />
			<SavedMoviesCardList
				savedMoviesList={savedMoviesList}
				setSavedMoviesList={setSavedMoviesList}
			/>
			<Footer />
		</section>
	);
}
