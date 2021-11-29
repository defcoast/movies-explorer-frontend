import React from "react";
import './Movies.css';
import '../../../index.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import {getFilms} from "../../../utils/MoviesApi";

export default function Movies(props) {
	/** Список всех фильмов полученных с сервера. */
	const [moviesList, setMoviesList] = React.useState([]);

	/** Нужно-ли отображать блок со списком фильтров. */
	const [needShowMoviesCardsList, setNeedShowMoviesCardsList] = React.useState(false);

	/** Нужно-ли отображать прелоудер. */
	const [needShowPreloader, setNeedShowPreloader] = React.useState(false);

	/** Нужно-ли отображать сообщение "Ничего не найдено". */
	const [needShowNotFoundMsg, setNeedShowNotFoundMsg] = React.useState(false);

	/** Нужно-ли отображать сообщение "Ошибка сервера". */
	const [needShowApiErrorMsg, setNeedShowApiErrorMsg] = React.useState(false);

	const [searchText, setSearchText] = React.useState('');

	const [filteredMoviesList, setFilteredMoviesList] = React.useState('');

	const [isShortMovie, setIsShortMovie] = React.useState(false);

	React.useEffect(() => {
		let filteredData;
		setNeedShowNotFoundMsg(false);

		if (isShortMovie) {
			filteredData = moviesList.filter(el => (el.nameRU.toLowerCase().includes(searchText.toLowerCase()) && el.duration <= 40));
			setFilteredMoviesList(filteredData);
		} else {
			filteredData = moviesList.filter(el => el.nameRU.toLowerCase().includes(searchText.toLowerCase()));
			setFilteredMoviesList(filteredData);
		}

		if (filteredData.length === 0 && needShowMoviesCardsList) {
			setNeedShowNotFoundMsg(true);
		}
	}, [searchText, isShortMovie, needShowMoviesCardsList]);

	/** Подключения к API. Установка прелоудера. */
	React.useEffect(() => {
		async function fetchMoviesAPI() {
			if (needShowMoviesCardsList) {
				try{
					setNeedShowPreloader(true);
					setNeedShowNotFoundMsg(false);

					const data = await getFilms();

					if (data.length > 0) {
						setMoviesList(data);
					}
					setNeedShowPreloader(false);
				} catch (err) {
					setNeedShowPreloader(false);
					setNeedShowApiErrorMsg(true);
				}
			}
		}
		fetchMoviesAPI();
	},[needShowMoviesCardsList]);

	/** Обработчик формы поискового запроса фильмов. */
	function handleSubmit() {
		if (searchText) {
			setNeedShowMoviesCardsList(true);
		}
	}

	/** Обработчик рендера списка фильмов для пользователей, которые уже были на сайте ранее. */
	function handleVisitedUser(isVisitedUser) {
		setNeedShowMoviesCardsList(isVisitedUser);
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
			<MoviesCardList
				moviesList={moviesList}
				filteredMoviesList={filteredMoviesList}
				needShowMoviesCardsList={needShowMoviesCardsList}
				needShowPreloader={needShowPreloader}
				needShowNotFoundMsg={needShowNotFoundMsg}
				needShowApiErrorMsg={needShowApiErrorMsg}
				savedMoviesList={props.savedMoviesList}
				onVisitedUser={handleVisitedUser}
				searchText={searchText}
				onSaved={props.onSaved}
				onRemoveSavedMovieCard={props.onRemoveSavedMovieCard}

			/>
			<Footer />
		</section>
	);
}
