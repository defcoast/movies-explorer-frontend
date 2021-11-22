import React from "react";
import '../movies/MoviesCardList/MoviesCardList.css';
import MoviesCard from "../movies/MoviesCard/MoviesCard";
import Preloader from "../others/Preloader/Preloader";

export default function SavedMoviesCardList(props) {
	/** Список всех Фильмов. */
	const [moviesList, setMoviesList] = React.useState(props.moviesList);

	/** Количество отображаемых карточек. */
	const [totalMoviesCards, setTotalMoviesCards] = React.useState(null);

	/** Список карточек готовых к отрисовке. */
	const [moviesCardsList, setMoviesCardsList] = React.useState([]);

	/** Количество отображаемых карточек при клике на кнопку "Показать еще". */
	const [showCardsCountOnClickShowMore, setShowCardsCountOnClickShowMore] = React.useState(null);

	/** Нужно-ли отображать кнопку "Показать еще". */
	const [needShowMoreMoviesBtn, setNeedShowMoreMoviesBtn] = React.useState(false);

	/** Получить список всех карточек. */
	React.useEffect(() => {
		async function fetchMoviesList() {
			try {
				await setMoviesList(props.moviesList);
			} catch (err) {
				console.log(err);
			}
		}
		fetchMoviesList();
	}, [props.moviesList]);

	/** Настройка отрисовки карточек. */
	React.useEffect(() => {
		function handleWindowResize() {
			setTimeout(() => {
				setRenderMoviesCardRules();
			}, 100);
		}

		window.addEventListener('resize', handleWindowResize);
		setRenderMoviesCardRules();

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		}
	}, []);

	/** Генерация списка данных для рендеринга карточки фильма. */
	React.useEffect(() => {
		const localStorageItem = localStorage.getItem('total-movies-cards');

		if (localStorageItem) {
			props.onVisitedUser(true);
			setTotalMoviesCards(Number(localStorageItem));
		}

		setMoviesCardsList(moviesList.slice(0, totalMoviesCards));
	},[totalMoviesCards, moviesList, props]);

	/** Скрыть кнопку "Показать еще", если выведены все результаты запроса. */
	React.useEffect(() => {
		if (moviesCardsList.length > 3) {
			setNeedShowMoreMoviesBtn(true);
		}

		if (totalMoviesCards > moviesCardsList.length) {
			setNeedShowMoreMoviesBtn(false);
		}

	}, [totalMoviesCards, moviesCardsList]);

	/** Установить правила отрисовки карточек для различных экранов. */
	function setRenderMoviesCardRules() {
		if  (props.needShowMoviesCardsList) {
			setNeedShowMoreMoviesBtn(true);
		}

		if (window.innerWidth <= 768) {
			setTotalMoviesCards(5);
			setShowCardsCountOnClickShowMore(2);
		}
		else if (window.innerWidth > 768 && window.innerWidth < 1280) {
			setTotalMoviesCards(8);
			setShowCardsCountOnClickShowMore(2);
		}
		else if (window.innerWidth >= 1280) {
			setShowCardsCountOnClickShowMore(3);
			setTotalMoviesCards(12);
		}
	}

	/** Преобразование часов фильма в человекочитаемый формат. */
	function convertDuration(duration) {
		const hours = Math.round(duration / 60) + 'ч';
		const minutes = duration % 60 + 'м';

		return hours + ' ' + minutes;
	}

	/** Обработчик клика по кнопке "Показать еще". */
	function handleShowMoreBtnClick() {
		if (totalMoviesCards > moviesCardsList.length) {
			setNeedShowMoreMoviesBtn(false);
			return;
		}

		const currentMoviesCount = totalMoviesCards + showCardsCountOnClickShowMore;
		setTotalMoviesCards(currentMoviesCount);
		localStorage.setItem('total-movies-cards', currentMoviesCount);
	}


	return (
		<>
			{/* Прелоудер. */}
			{props.needShowPreloader &&
			<Preloader />
			}

			{/* ОШИБКА: Ничего не найдено. */}
			{props.needShowNotFoundMsg &&
			<p className="error-msg">
				Ничего не найдено
			</p>
			}

			{/* ОШИБКА: Проблема с соединением. */}
			{props.needShowApiErrorMsg &&
			<p className="error-msg">
				Во время запроса произошла ошибка.
				Возможно, проблема с соединением или сервер недоступен.
				Подождите немного и попробуйте ещё раз
			</p>
			}

			{/* Список карточек фильмов. */}
			<ul className="movies-list">
				{props.needShowMoviesCardsList &&
				moviesCardsList.map((movie) => (
					<a
						href={movie.trailerLink}
						key={'saved-movie_' + movie._id}
						className="movies-list__link"
					>
						<MoviesCard
							image={movie.image}
							title={movie.nameRU}
							duration={convertDuration(movie.duration)}
							movie={movie}
							savedMovies={true}
							moviesList={props.moviesList}
							onRemoveSavedMovieCard={props.onRemoveSavedMovieCard}
						/>
					</a>
				))
				}
			</ul>

			{/* Кнопка "Показать еще". */}
			{needShowMoreMoviesBtn &&
			<div className="movies-list__show-more-wrapper">
				<button
					className="movies-list__show-more-btn"
					onClick={handleShowMoreBtnClick}
				>
					Ещё
				</button>
			</div>
			}

		</>

	);
}
