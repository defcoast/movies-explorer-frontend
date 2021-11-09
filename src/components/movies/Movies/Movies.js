import React from "react";
import './Movies.css';
import '../../../index.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Movies() {
	return (
		<section className="movies">
			<div className="container">
				<SearchForm />
				<MoviesCardList />
			</div>
		</section>
	);
}
