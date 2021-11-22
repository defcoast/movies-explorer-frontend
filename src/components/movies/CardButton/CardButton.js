import React from "react";
import './CardButton.css';
import {saveMovieCard} from "../../../utils/MainApi";
import {removeMovieCard} from "../../../utils/MainApi";

export default function CardButton(props) {
	const ButtonsTypesList = {
		save   : 'save',
		saved  : 'saved',
		remove : 'remove',
	};

	/** Текущий тип кнопки кнопки. */
	const [buttonType, setButtonType] = React.useState(ButtonsTypesList.save);

	const [savedMoviesList, setSavedMoviesList] = React.useState([]);

	/** Обработчик клика по кнопке "Сохранить фильм". */
	async function handleSaveBtnClick(e) {
		e.preventDefault();

		// Отправляем запрос на сохранение фильма.
		const result = await saveMovieCard(props.movie);
		setSavedMoviesList(result)
		console.log(result);
		setButtonType(ButtonsTypesList.saved);
	}

	/** Обработчик клика по кнопке "Фильм сохранен". */
	function handleSavedBtnClick(e) {
		e.preventDefault();
		setButtonType(ButtonsTypesList.save);
		removeMovieCard(savedMoviesList._id);
	}

	/** Обработчик клика по кнопке "Удалить сохраненный фильм". */
	function handleRemoveBtnClick(e) {
		e.preventDefault();

		// Отправляем запрос на удаление сохраненного фильма
		removeMovieCard(props.movie._id);
		props.onRemoveSavedMovieCard(props.movieList.filter(updateCard => updateCard._id !==  props.movie._id));
	}

	return (
		<>
			{(buttonType === ButtonsTypesList.save && !props.savedMovies) &&
			<form action="#" onClick={handleSaveBtnClick}>
				<button
					className={props.className + ' ' + ButtonsTypesList.save}
				>
					Сохранить
				</button>
			</form>
			}

			{(buttonType === ButtonsTypesList.saved || props.savedMovies) &&
			<form action="" onClick={handleSavedBtnClick}>
				<button
					className={props.className + ' ' + ButtonsTypesList.saved}
				/>
			</form>
			}

			{(buttonType === ButtonsTypesList.remove || props.savedMovies) &&
			<form action="#" onClick={handleRemoveBtnClick}>
				<button
					className={props.className + ' ' + ButtonsTypesList.remove}
				/>
			</form>
			}
		</>
	);
}
