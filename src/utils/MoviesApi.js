import {serverError} from './constants';

const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export async function getMoviesList() {
	const response = await fetch(BASE_URL);

	if (response.ok) {
		return response.json();
	}

	throw new Error(serverError);

}
