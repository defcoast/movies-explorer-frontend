import React from "react";
import './CustomCheckbox.css';

export default function CustomCheckbox(props) {
	const IS_SHORT_MOVIE_STORAGE_KEY = 'is-short-movies';

	return (
		<label className="checkbox">
			<input
				onChange={props.isShortMovie}
				defaultChecked={JSON.parse(localStorage.getItem(IS_SHORT_MOVIE_STORAGE_KEY))}
				type="checkbox"
				className="checkbox__input"/>
			<div className="checkbox__box" />
		</label>
	);
}
