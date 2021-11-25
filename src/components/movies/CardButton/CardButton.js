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

	// const [isSavedMovies, setIsSavedMovies] = React.useState(false);


	/** Обработчик клика по кнопке "Сохранить фильм". */
	async function handleSaveBtnClick(e) {
		e.preventDefault();

		// Отправляем запрос на сохранение фильма.
		const result = await saveMovieCard(props.movie);
		setButtonType(ButtonsTypesList.saved);
		props.onSaved(result);
	}

	/** Обработчик клика по кнопке "Фильм сохранен". */
	async function handleSavedBtnClick(e) {
		e.preventDefault();
		setButtonType(ButtonsTypesList.save);
		// removeMovieCard(props.savedMoviesList._id);
		if (props.movie._id) {
			try {
				await removeMovieCard(props.movie._id);
				props.onRemoveSavedMovieCard(props.movieList.filter(updateCard => updateCard._id !==  props.movie._id));

			} catch (err) {
				setButtonType(ButtonsTypesList.save);
			}

		}
		else if (props.movie.id) {
			props.savedMoviesList.forEach((savedItem) => {
				if (Number(savedItem.movieId) === props.movie.id) {
					removeMovieCard(savedItem._id);
					// const index = props.savedMoviesList.indexOf(savedItem);
					// const updatedList = props.savedMoviesList.splice(index, 1)
					// props.onRemoveSavedMovieCard(updatedList);
				}
			});
		}
	}

	/** Обработчик клика по кнопке "Удалить сохраненный фильм". */
	async function handleRemoveBtnClick(e) {
		e.preventDefault();
		setButtonType(ButtonsTypesList.save);

		// Отправляем запрос на удаление сохраненного фильма
		if (props.movie._id) {
			try {
				await removeMovieCard(props.movie._id);
				props.onRemoveSavedMovieCard(props.movieList.filter(updateCard => updateCard._id !==  props.movie._id));

			} catch (err) {
				setButtonType(ButtonsTypesList.save);
			}

		}
		else if (props.movie.id) {
			for (const savedItem of props.savedMoviesList) {
				if (Number(savedItem.movieId) === props.movie.id) {
					const data = await removeMovieCard(savedItem._id);
					if (data) {
						setButtonType(ButtonsTypesList.save);
					}
					// const index = props.savedMoviesList.indexOf(savedItem);
					// const updatedList = props.savedMoviesList.splice(index, 1)
					// props.onRemoveSavedMovieCard(updatedList);
				}
			}
		}
	}

	return (
		<>
			{(buttonType === ButtonsTypesList.save && !props.isSavedMovies) &&
			<form action="#" onClick={handleSaveBtnClick}>
				<button
					className={props.className + ' ' + ButtonsTypesList.save}
				>
					Сохранить
				</button>
			</form>
			}

			{(buttonType === ButtonsTypesList.saved || props.isSavedMovies) &&
			<form action="" onClick={handleSavedBtnClick}>
				<button
					className={props.className + ' ' + ButtonsTypesList.saved}
				/>
			</form>
			}

			{(buttonType === ButtonsTypesList.remove || props.isSavedMovies) &&
			<form action="#" onClick={handleRemoveBtnClick}>
				<button
					className={props.className + ' ' + ButtonsTypesList.remove}
				/>
			</form>
			}
		</>
	);
}
