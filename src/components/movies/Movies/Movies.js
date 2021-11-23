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

	/** Подключения к API. Установка прелоудера. */
	React.useEffect(() => {
		async function fetchMoviesAPI() {
			if (needShowMoviesCardsList) {
				try{
					setNeedShowPreloader(true);
					const data = await getFilms();

					if (data.length > 0) {
						setMoviesList(data);
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

	return (
		<section className="movies">
			<Header
				loggedIn={props.loggedIn}
			/>
			<SearchForm
				onSubmit={handleSubmit}
			/>
			<MoviesCardList
				moviesList={moviesList}
				needShowMoviesCardsList={needShowMoviesCardsList}
				needShowPreloader={needShowPreloader}
				needShowNotFoundMsg={needShowNotFoundMsg}
				needShowApiErrorMsg={needShowApiErrorMsg}
				onVisitedUser={handleVisitedUser}
			/>
			<Footer />
		</section>
	);
}
