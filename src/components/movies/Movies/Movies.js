import React from "react";
import './Movies.css';
import '../../../index.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";

export default function Movies() {
	return (
		<section className="movies">
			<Header />
			<SearchForm />
			<MoviesCardList />
			<Footer />
		</section>
	);
}
