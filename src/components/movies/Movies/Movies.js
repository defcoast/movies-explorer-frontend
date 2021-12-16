import React, {useState, useEffect} from "react";
import './Movies.css';
import '../../../index.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import {getMoviesList} from "../../../utils/MoviesApi";

export default function Movies({savedMoviesList, setSavedMoviesList, loggedIn}) {
	const [allMovies, setAllMovies] = useState([]);
	const [filteredMoviesList, setFilteredMoviesList] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [totalCardsQuantity, setTotalCardsQuantity] = useState(2)
	const [needDisplayMoviesList, setNeedDisplayMoviesList] = useState(false);
	const [needDisplayPreloader, setNeedDisplayPreloader] = useState(false);
	const [needDisplayApiErrorMsg, setNeedDisplayApiErrorMsg] = useState(false);
	const [needDisplayNotFoundError, setNeedDisplayNotFoundError] = useState(false);
	const [needDisplayShowMoreBtn, setNeedDisplayShowMoreBtn] = useState(false);
	const [isShortMovie, setIsShortMovie] = useState(false);

	const MOVIES_LIST_STORAGE_KEY = 'filtered-movies-list';
	const IS_SHORT_MOVIE_STORAGE_KEY = 'is-short-movies'


	useEffect(() => {
		if (localStorage.getItem(MOVIES_LIST_STORAGE_KEY)) {
			setNeedDisplayMoviesList(true);
			setFilteredMoviesList(JSON.parse(localStorage.getItem(MOVIES_LIST_STORAGE_KEY)));
		}
		if (localStorage.getItem(IS_SHORT_MOVIE_STORAGE_KEY)) {
			setIsShortMovie(JSON.parse(localStorage.getItem(IS_SHORT_MOVIE_STORAGE_KEY)));
		}
	}, [savedMoviesList, isShortMovie]);

	useEffect(() => {
			let filteredData;
			setNeedDisplayMoviesList(true);

			if (isShortMovie) {
				filteredData = allMovies.filter(el => (el.nameRU.toLowerCase().includes(searchText.toLowerCase()) && el.duration <= 40));
				setFilteredMoviesList(filteredData);
				if (filteredData.length > 0) {
					localStorage.setItem(MOVIES_LIST_STORAGE_KEY, JSON.stringify(filteredData));
				}
			}
			else {
				filteredData = allMovies.filter(el => el.nameRU.toLowerCase().includes(searchText.toLowerCase()));
				setFilteredMoviesList(filteredData);
				if (searchText) {
					localStorage.setItem(MOVIES_LIST_STORAGE_KEY, JSON.stringify(filteredData));
				}
			}

			if (filteredData.length === 0 && allMovies.length > 0) {
				setNeedDisplayNotFoundError(true);
			} else {
				setNeedDisplayNotFoundError(false);
			}
	}, [searchText, allMovies, isShortMovie]);

	useEffect(() => {
		if (filteredMoviesList.length > 3) {
			setNeedDisplayShowMoreBtn(true);
		}
		if (totalCardsQuantity >= filteredMoviesList.length) {
			setNeedDisplayShowMoreBtn(false);
		}
	}, [totalCardsQuantity, filteredMoviesList]);

	async function loadAllCards() {
		try {
			setNeedDisplayApiErrorMsg(false);
			setNeedDisplayPreloader(true);
			const data = await getMoviesList();

			if (data.length > 0) {
				setAllMovies(data);
			}

			setNeedDisplayPreloader(false);
		} catch (err) {
			setNeedDisplayPreloader(false);
			setNeedDisplayApiErrorMsg(true);
			console.log(err);
		}
	}

	async function changeSearchText(text) {
		setSearchText(text);

		if (allMovies.length === 0) {
			await loadAllCards();
		}
	}

	function handleIsShortMovie(e) {
		setIsShortMovie(e.target.checked);
		localStorage.setItem(IS_SHORT_MOVIE_STORAGE_KEY, JSON.stringify(e.target.checked));
	}

	return (
		<section className="movies">
			<Header
				loggedIn={loggedIn}
			/>

			<SearchForm
				changeSearchText={changeSearchText}
				isShortMovie={handleIsShortMovie}
			/>

			<MoviesCardList
				filteredMoviesList={filteredMoviesList}
				totalCardsQuantity={totalCardsQuantity}
				setTotalCardsQuantity={setTotalCardsQuantity}
				needDisplayMoviesList={needDisplayMoviesList}
				needDisplayPreloader={needDisplayPreloader}
				needDisplayApiErrorMsg={needDisplayApiErrorMsg}
				needDisplayNotFoundError={needDisplayNotFoundError}
				needDisplayShowMoreBtn={needDisplayShowMoreBtn}
				savedMoviesList={savedMoviesList}
				setSavedMoviesList={setSavedMoviesList}
			/>
			<Footer />
		</section>
	);
}
