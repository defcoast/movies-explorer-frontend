import React from "react";
import './SavedMovies.css';
import '../../index.css';
import SearchForm from "../movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";
import {getSavedMovies} from "../../utils/MainApi";

export default function Movies(props) {
	/** Список всех фильмов полученных с сервера. */
	const [savedMoviesList, setSavedMoviesList] = React.useState([]);

	/** Нужно-ли отображать блок со списком фильтров. */
	const [needShowMoviesCardsList, setNeedShowMoviesCardsList] = React.useState(false);

	/** Нужно-ли отображать прелоудер. */
	const [needShowPreloader, setNeedShowPreloader] = React.useState(false);

	/** Нужно-ли отображать сообщение "Ничего не найдено". */
	const [needShowNotFoundMsg, setNeedShowNotFoundMsg] = React.useState(false);

	/** Нужно-ли отображать сообщение "Ошибка сервера". */
	const [needShowApiErrorMsg, setNeedShowApiErrorMsg] = React.useState(false);

	console.log(savedMoviesList)

	/** Подключения к API. Установка прелоудера. */
	React.useEffect(() => {
		async function fetchMoviesAPI() {
			if (needShowMoviesCardsList) {
				try{
					setNeedShowPreloader(true);
					const data = await getSavedMovies();
					console.log(data)

					if (data.length > 0) {
						setSavedMoviesList(data);
					}
					else  {
						setNeedShowNotFoundMsg(true);
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
		setNeedShowMoviesCardsList(true);
	}

	/** Обработчик рендера списка фильмов для пользователей, которые уже были на сайте ранее. */
	function handleVisitedUser(isVisitedUser) {
		setNeedShowMoviesCardsList(isVisitedUser);
	}

	/** Обработчик удаления сохраненной карточки. */
	function handleRemoveSavedMovieCard(sortedMoviesList) {
		setSavedMoviesList(sortedMoviesList)
	}

	return (
		<section className="movies">
			<Header
				loggedIn={props.loggedIn}
			/>
			<SearchForm
				onSubmit={handleSubmit}
			/>
			<SavedMoviesCardList
				moviesList={savedMoviesList}
				needShowMoviesCardsList={needShowMoviesCardsList}
				needShowPreloader={needShowPreloader}
				needShowNotFoundMsg={needShowNotFoundMsg}
				needShowApiErrorMsg={needShowApiErrorMsg}
				onVisitedUser={handleVisitedUser}
				onRemoveSavedMovieCard={handleRemoveSavedMovieCard}
			/>
			<Footer />
		</section>
	);
}
