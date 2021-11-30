import React from "react";
import '../movies/MoviesCardList/MoviesCardList.css';
import MoviesCard from "../movies/MoviesCard/MoviesCard";
import Preloader from "../others/Preloader/Preloader";

export default function SavedMoviesCardList(props) {

	//
	// React.useEffect(() => {
	// 	if (props.filteredMoviesList) {
	// 		props.onChangeSearchSubmit(props.filteredMoviesList);
	// 		console.log('list',props.filteredMoviesList)
	// 	}
	// }, [props.filteredMoviesList, props.moviesList]);

	console.log(props.moviesList)

	/** Преобразование часов фильма в человекочитаемый формат. */
	function convertDuration(duration) {
		const hours = Math.round(duration / 60) + 'ч';
		const minutes = duration % 60 + 'м';

		return hours + ' ' + minutes;
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
				{props.moviesList.map((movie) => (
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
							isSavedMovies={true}
							moviesList={props.moviesList}
							onRemoveSavedMovieCard={props.onRemoveSavedMovieCard}
							savedMoviesList={props.savedMoviesList}
						/>
					</a>
				))}
			</ul>
		</>

	);
}
