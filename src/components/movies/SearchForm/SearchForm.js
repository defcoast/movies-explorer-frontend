import React from "react";
import './SearchForm.css'

export default function SearchForm() {
	return (
		<form action="#" className="search">
			<div className="search__left-wrapper">
				<span className="search__placeholder-icon" />
				<input type="text" placeholder="Фильм" className="search__input" />
				<button type="submit" className="search__submit-btn" />
			</div>
			<div className="search__right-wrapper">
				<input type="checkbox" className="search__checkbox" />
				Короткометражки
			</div>
		</form>
	);
}
