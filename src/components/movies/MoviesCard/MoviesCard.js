import React from "react";
import './MoviesCard.css';
import CardButton from "../CardButton/CardButton";

export default function MoviesCard(props) {
	return (
		<li className="card">
			<CardButton
				className="card__button"
				movie={props.movie}
				savedMovies={props.savedMovies}
				movieList={props.moviesList}
				onRemoveSavedMovieCard={props.onRemoveSavedMovieCard}
				savedMoviesList={props.savedMoviesList}
				isSavedMovies={props.isSavedMovies}
				onSaved={props.onSaved}
				type={props.type}
			/>
			<img
				src={props.image}
				alt="Момент из фильма"
				className="card__image"
			/>
			<div className="card__info">
				<span className="card__title">
					{props.title}
				</span>
				<span className="card__duration">
					{props.duration}
				</span>
			</div>
		</li>
	);
}
