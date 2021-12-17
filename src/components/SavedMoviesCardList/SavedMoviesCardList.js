import React from "react";
import './SavedMoviesCardList.css'
import MoviesCard from "../movies/MoviesCard/MoviesCard";

export default function SavedMoviesCardList({savedMoviesList, setSavedMoviesList, needDisplayNotFoundError}) {
	function convertDuration(duration) {
		const hours = Math.floor(duration / 60) + 'ч';
		const minutes = duration % 60 + 'м';

		return hours + ' ' + minutes;
	}

	return(
		<>
			{needDisplayNotFoundError &&
				<p className="message">
					Ничего не найдено
				</p>
			}
			<ul className="movies-list">
				{savedMoviesList.map((movie, index) => (
					<MoviesCard
						key={movie._id}
						image={movie.image}
						title={movie.nameRU}
						duration={convertDuration(movie.duration)}
						link={movie.trailerLink}
						movie={movie}
						setSavedMoviesList={setSavedMoviesList}
						savedMoviesList={savedMoviesList}
						index={index}
					/>
				))}
			</ul>
		</>
	);
}
