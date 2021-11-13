import React from "react";
import './SearchForm.css'
import CustomCheckbox from "../../others/CustomCheckbox/CustomCheckbox";

export default function SearchForm() {
	return (
		<div className="search">
			<form action="#" className="search__form">
				<div className="search__left-wrapper">
					<span className="search__placeholder-icon" />
					<input type="text" placeholder="Фильм" className="search__input" />
					<button type="submit" className="search__submit-btn" />
				</div>
				<div className="search__right-wrapper">
					<CustomCheckbox />
					Короткометражки
				</div>
			</form>
		</div>
	);
}
