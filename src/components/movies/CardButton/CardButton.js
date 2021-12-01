import React from "react";
import './CardButton.css';
import {loginUser, saveMovieCard} from "../../../utils/MainApi";
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

	React.useEffect(() => {
		setButtonType(props.type);
		if (props.movie.id) {
			for (const savedItem of props.savedMoviesList) {
				if (Number(savedItem.movieId) === props.movie.id) {
					setButtonType(ButtonsTypesList.saved);
				}
			}
		}
	}, [])


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

		if (props.movie.id) {
			for (const savedItem of props.savedMoviesList) {
				if (Number(savedItem.movieId) === props.movie.id) {

					try {
						const data = await removeMovieCard(savedItem._id);

						if (data) {
							const updatedList = props.savedMoviesList.filter(updateCard => updateCard._id !== savedItem._id)
							props.onRemoveSavedMovieCard(updatedList);
						}
					} catch (err) {
						setButtonType(ButtonsTypesList.save);
					}
				}
			}
		}
	}

	/** Обработчик клика по кнопке "Удалить сохраненный фильм". */
	async function handleRemoveBtnClick(e) {
		e.preventDefault();
		setButtonType(ButtonsTypesList.save);

		// Отправляем запрос на удаление сохраненного фильма
		if (props.movie._id) {
			try {
				const data = await removeMovieCard(props.movie._id);
				if (data) {
					props.onRemoveSavedMovieCard(props.movieList.filter(updateCard => updateCard._id !==  props.movie._id));
				}
			} catch (err) {
				setButtonType(ButtonsTypesList.save);
			}
		}

	}

	return (
		<>
			{(buttonType === ButtonsTypesList.save) &&
			<form action="#" onClick={handleSaveBtnClick}>
				<button
					className={props.className + ' ' + ButtonsTypesList.save}
				>
					Сохранить
				</button>
			</form>
			}

			{(buttonType === ButtonsTypesList.saved) &&
			<form action="" onClick={handleSavedBtnClick}>
				<button
					className={props.className + ' ' + ButtonsTypesList.saved}
				/>
			</form>
			}

			{(buttonType === ButtonsTypesList.remove) &&
			<form action="#" onClick={handleRemoveBtnClick}>
				<button
					className={props.className + ' ' + ButtonsTypesList.remove}
				/>
			</form>
			}
		</>
	);
}
