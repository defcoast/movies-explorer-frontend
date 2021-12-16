import React, {useState, useEffect} from "react";
import './MoviesCard.css';
import CardButton from "../CardButton/CardButton";

export default function MoviesCard(props) {
	const btnTypeList = {
		save   : 'save',
		saved  : 'saved',
		remove : 'remove',
	};

	const [currentBtnType, setCurrentBtnType] = useState(btnTypeList.save);

	useEffect(() => {
		if (window.location.href.includes('saved-movies')) {
			setCurrentBtnType(btnTypeList.saved);
		}

		if (props.movie.id) {
			console.log(props.savedMoviesList)
			for (const savedItem of props.savedMoviesList) {
				if (Number(savedItem.movieId) === props.movie.id) {
					setCurrentBtnType(btnTypeList.saved);
				}
			}
		}
	}, [props.movie.id]);

	return (
		<a href={props.link} className="card__link">
			<li className="card">
				<CardButton
					className="card__button"
		            type={currentBtnType}
					setCurrentBtnType={setCurrentBtnType}
					movie={props.movie}
					setSavedMoviesList={props.setSavedMoviesList}
					savedMoviesList={props.savedMoviesList}
					index={props.index}
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
		</a>
	);
}
