import React from "react";
import './CardButton.css';
import {removeMovieCard, saveMovie} from "../../../utils/MainApi";


export default function CardButton({type,
	                                   className,
	                                   setCurrentBtnType,
	                                   movie,
	                                   setSavedMoviesList,
	                                   savedMoviesList,
	                                   index}) {
	const ButtonsTypesList = {
		save   : 'save',
		saved  : 'saved',
		remove : 'remove',
	};

	async function handleSaveBtn() {
		try {
			const data = await saveMovie(movie);
			if (data) {
				setCurrentBtnType(ButtonsTypesList.saved);
				setSavedMoviesList([...savedMoviesList, data]);
			}
		} catch (err) {
			console.log(err)
		}
	}

	async function handleSavedBtn() {
		if (movie._id) {
			try {
				const data = await removeMovieCard(movie._id);
				if (data) {
					setCurrentBtnType(ButtonsTypesList.save);
					setSavedMoviesList([...savedMoviesList.slice(0, index), ...savedMoviesList.slice(index + 1)]);
				}
			} catch (err) {
				console.log(err);
			}
		}
		else {
			const savedEl = savedMoviesList.find(item => Number(item.movieId) === movie.id)
			try {
				const data = await removeMovieCard(savedEl._id);

				if (data) {
					const filteredData = savedMoviesList.filter(item => item !== savedEl)
					setSavedMoviesList(filteredData);
					setCurrentBtnType(ButtonsTypesList.save);
				}
			} catch (err) {
				console.log(err);
			}
		}
	}

		return (
		<>
			{(type === ButtonsTypesList.save) &&
				<form action="#" onSubmit={e => e.preventDefault()}>
					<button
						className={className + ' ' + ButtonsTypesList.save}
						onClick={handleSaveBtn}
					>
						Сохранить
					</button>
				</form>
			}

			{(type === ButtonsTypesList.saved) &&
				<form action="#" onSubmit={e => e.preventDefault()}>
					<button
						className={className + ' ' + ButtonsTypesList.saved}
						onClick={handleSavedBtn}
					/>
				</form>
			}

			{(type === ButtonsTypesList.remove) &&
				<form action="#" onSubmit={e => e.preventDefault()}>
					<button
						className={className + ' ' + ButtonsTypesList.remove}
					/>
				</form>
			}
		</>
	);
}
