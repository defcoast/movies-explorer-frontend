import React, {useRef, useState} from "react";
import './SearchForm.css'
import CustomCheckbox from "../../others/CustomCheckbox/CustomCheckbox";

export default function SearchForm({changeSearchText, isShortMovie}) {
	const [value, setValue] = useState('');
	const SEARCH_TEXT__STORAGE_KEY = 'search-text';
	const searchInput = useRef();

	function handleSubmit(e) {
		e.preventDefault();
		changeSearchText(value);
	}

	function handleChange() {
		setValue(searchInput.current.value)
		localStorage.setItem(SEARCH_TEXT__STORAGE_KEY, JSON.stringify(searchInput.current.value));
	}


	return (
		<div className="search">
			<form action="#" className="search__form" onSubmit={handleSubmit}>
				<div className="search__left-wrapper">
					<span className="search__placeholder-icon" />
					<input
						type="text"
						placeholder="Фильм"
						className="search__input"
						required
						defaultValue={JSON.parse(localStorage.getItem(SEARCH_TEXT__STORAGE_KEY))}
						ref={searchInput}
						onChange={handleChange}
					/>
					<button type="submit" className="search__submit-btn" />
				</div>

				<div className="search__right-wrapper">
					<CustomCheckbox
						isShortMovie={isShortMovie}
					/>
					Короткометражки
				</div>
			</form>
		</div>
	);
}
