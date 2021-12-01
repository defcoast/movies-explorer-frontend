import React from "react";
import './SavedMovies.css';
import '../../index.css';
import SearchForm from "../movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";

export default function Movies(props) {

	const [searchText, setSearchText] = React.useState('');

	const [isShortMovie, setIsShortMovie] = React.useState(false);

	const [needShowNotFoundMsg, setNeedShowNotFoundMsg] = React.useState(false);

	const [filteredMovieList, setFilteredMovieList] = React.useState(props.savedMoviesList);

	const [currentSearchText, setCurrentSearchText] = React.useState('');


	React.useEffect(() => {
		setFilteredMovieList(props.savedMoviesList);

	}, [props.savedMoviesList]);


	React.useEffect(() => {
		setNeedShowNotFoundMsg(false);

		setCurrentSearchText(searchText);
		if (!(searchText === currentSearchText)) {
			let filteredData;

			if (isShortMovie) {
				filteredData = props.savedMoviesList.filter(el => (el.nameRU.toLowerCase().includes(searchText.toLowerCase()) && el.duration <= 40));
				if (filteredData.length === 0) {
					setNeedShowNotFoundMsg(true);
					setFilteredMovieList([]);
				} else {
					setFilteredMovieList(filteredData);
				}
			} else {
				filteredData = props.savedMoviesList.filter(el => el.nameRU.toLowerCase().includes(searchText.toLowerCase()));

				if (filteredData.length === 0) {
					setNeedShowNotFoundMsg(true);
					setFilteredMovieList([]);
				} else {
					setFilteredMovieList(filteredData);
				}
			}
		}
	}, [searchText, isShortMovie]);


	/** Обработчик формы поискового запроса фильмов. */
	function handleSubmit() {
		setCurrentSearchText(searchText);
		if (!(searchText === currentSearchText)) {
			let filteredData;
			setNeedShowNotFoundMsg(false);

			if (isShortMovie) {
				filteredData = props.savedMoviesList.filter(el => (el.nameRU.includes(searchText) && el.duration <= 40));
				if (filteredData.length === 0) {
					setNeedShowNotFoundMsg(true);
				} else {
					setFilteredMovieList(filteredData);
				}

			} else {
				filteredData = props.savedMoviesList.filter(el => el.nameRU.includes(searchText));
				if (filteredData.length === 0) {
					setNeedShowNotFoundMsg(true);
				} else {
					setFilteredMovieList(filteredData);
				}
			}
		}
	}

	/** Обработчик текста запроса. */
	function handleSearchRequest(text) {
		setSearchText(text);
	}

	function handleIsShortMovie(isShortMovie) {
		setIsShortMovie(isShortMovie);
	}


	return (
		<section className="movies">
			<Header
				loggedIn={props.loggedIn}
			/>
			<SearchForm
				onSubmit={handleSubmit}
				searchRequest={handleSearchRequest}
				isShortMovie={handleIsShortMovie}
			/>
			<SavedMoviesCardList
				moviesList={filteredMovieList}
				needShowPreloader={props.needShowPreloader}
				needShowNotFoundMsg={needShowNotFoundMsg}
				needShowApiErrorMsg={props.needShowApiErrorMsg}
				onRemoveSavedMovieCard={props.onRemoveSavedMovieCard}
				searchText={searchText}
				onChangeSearchSubmit={props.onChangeSearchSubmit}
			/>
			<Footer />
		</section>
	);
}
