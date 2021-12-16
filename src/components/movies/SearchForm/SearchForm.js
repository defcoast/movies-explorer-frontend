import React, {useState} from "react";
import './SearchForm.css'
import CustomCheckbox from "../../others/CustomCheckbox/CustomCheckbox";

export default function SearchForm({changeSearchText}) {
	const [value, setValue] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		changeSearchText(value);
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
						value={value}
						onChange={event => setValue(event.target.value)}
					/>
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
