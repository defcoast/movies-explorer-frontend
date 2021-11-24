import React from "react";
import './SavedMovies.css';
import '../../index.css';
import SearchForm from "../movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";

export default function Movies(props) {

	const [searchText, setSearchText] = React.useState('');

	const [filteredMoviesList, setFilteredMoviesList] = React.useState('');

	const [isShortMovie, setIsShortMovie] = React.useState(false);

	React.useEffect(() => {
		if (isShortMovie) {
			setFilteredMoviesList(props.savedMoviesList.filter(el => (el.nameRU.includes(searchText) && el.duration <= 40)));
		} else {
			setFilteredMoviesList(props.savedMoviesList.filter(el => el.nameRU.includes(searchText)));
		}
		console.log('search')
	}, [searchText, isShortMovie]);

	/** Обработчик формы поискового запроса фильмов. */
	function handleSubmit() {
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
				moviesList={props.savedMoviesList}
				filteredMoviesList={filteredMoviesList}
				needShowPreloader={props.needShowPreloader}
				needShowNotFoundMsg={props.needShowNotFoundMsg}
				needShowApiErrorMsg={props.needShowApiErrorMsg}
				onRemoveSavedMovieCard={props.onRemoveSavedMovieCard}
				searchText={searchText}

			/>
			<Footer />
		</section>
	);
}
