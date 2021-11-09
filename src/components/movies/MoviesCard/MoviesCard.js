import React from "react";
import './MoviesCard.css';

export default function MoviesCard(props) {
	return (
		<li className="card">
			<img src={props.image} alt="Момент из фильма" className="card__image"/>
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
