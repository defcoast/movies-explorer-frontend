import React from "react";
import './CardButton.css';
import {saveMovie} from "../../../utils/MainApi";


export default function CardButton({type, className, setCurrentBtnType, movie}) {
	const ButtonsTypesList = {
		save   : 'save',
		saved  : 'saved',
		remove : 'remove',
	};

	async function handleSaveBtn() {
		try {
			await saveMovie(movie);
			setCurrentBtnType(ButtonsTypesList.saved);
		} catch (err) {
			console.log(err)
		}
	}

	function handleSavedBtn() {
		setCurrentBtnType(ButtonsTypesList.save);
	}

	return (
		<>
			{(type === ButtonsTypesList.save) &&
				<form action="#">
					<button
						className={className + ' ' + ButtonsTypesList.save}
						onClick={handleSaveBtn}
					>
						Сохранить
					</button>
				</form>
			}

			{(type === ButtonsTypesList.saved) &&
				<form action="#">
					<button
						className={className + ' ' + ButtonsTypesList.saved}
						onClick={handleSavedBtn}
					/>
				</form>
			}

			{(type === ButtonsTypesList.remove) &&
				<form action="#">
					<button
						className={className + ' ' + ButtonsTypesList.remove}
					/>
				</form>
			}
		</>
	);
}
