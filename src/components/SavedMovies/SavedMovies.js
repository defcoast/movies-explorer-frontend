import React, {useState} from "react";
import './SavedMovies.css';
import SearchForm from "../movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";

export default function SavedMovies({savedMoviesList, setSavedMoviesList, loggedIn}) {

	const [searchText, setSearchText] = useState('');
	const [filteredMoviesList, setFilteredMoviesList] = useState([]);
	const [needDisplayNotFoundError, setNeedDisplayNotFoundError] = useState(false);
	const [isShortMovie, setIsShortMovie] = useState(false);


	React.useEffect(() => {
		setFilteredMoviesList(savedMoviesList);
	}, [savedMoviesList]);

	React.useEffect(() => {
		let filteredData;

		if (isShortMovie) {
			filteredData = savedMoviesList.filter(el => (el.nameRU.toLowerCase().includes(searchText.toLowerCase()) && el.duration <= 40));
			setFilteredMoviesList(filteredData);
		}
		else {
			filteredData = savedMoviesList.filter(el => el.nameRU.toLowerCase().includes(searchText.toLowerCase()));
			setFilteredMoviesList(filteredData);
		}

		if (filteredData.length === 0 && savedMoviesList.length > 0) {
			setNeedDisplayNotFoundError(true);
		} else {
			setNeedDisplayNotFoundError(false);
		}
	}, [searchText, savedMoviesList, isShortMovie]);

	function handleIsShortMovie(e) {
		setIsShortMovie(e.target.checked);
	}

	async function changeSearchText(text) {
		setSearchText(text);
	}

	return (
		<section className="saved-movies">
			<Header
				loggedIn={loggedIn}
			/>

			<SearchForm
				changeSearchText={changeSearchText}
				isShortMovie={handleIsShortMovie}
			/>

			<SavedMoviesCardList
				savedMoviesList={filteredMoviesList}
				setSavedMoviesList={setSavedMoviesList}
				needDisplayNotFoundError={needDisplayNotFoundError}
			/>
			<Footer />
		</section>
	);
}
