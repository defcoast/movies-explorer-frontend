import React from "react";
import './SearchForm.css'
import CustomCheckbox from "../../others/CustomCheckbox/CustomCheckbox";

export default function SearchForm(props) {
	const [searchText, setSearchText] = React.useState('');

	/** Обработчик кнопки отправки поискового запроса. */
	function handleSubmit(e) {
		e.preventDefault();

		props.onSubmit(true);
		props.searchRequest(searchText);
	}

	/** Обработчик изменения текста в поисковой строке. */
	function handleSearchTextChange(e) {
		e.preventDefault();
		setSearchText(e.target.value);
	}

	function handleChangeCheckbox(e) {
		props.isShortMovie(e.target.checked);
	}

	return (
		<div className="search">
			<form
				action="#"
				className="search__form"
				onSubmit={handleSubmit}
			>
				<div className="search__left-wrapper">
					<span className="search__placeholder-icon" />
					<input
						type="text"
						placeholder="Фильм"
						className="search__input"
						required
						onChange={handleSearchTextChange}
					/>
					<button
						type="submit"
						className="search__submit-btn"
					/>
				</div>
				<div className="search__right-wrapper">
					<CustomCheckbox
						onChange={handleChangeCheckbox}
					/>
					Короткометражки
				</div>
			</form>
		</div>
	);
}
