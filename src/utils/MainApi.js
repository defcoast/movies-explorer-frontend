import {serverError} from "./constants";

const BASE_URL = 'https://api.diplom.nomoredomains.rocks/';
const token = localStorage.getItem('token');

const endpoints = {
	movies: 'movies',
}

export async function saveMovie(movie) {
	const response = await fetch(BASE_URL + endpoints.movies, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`,
		},
		body: JSON.stringify({
			country: movie.country,
			director: movie.director,
			duration: movie.duration,
			year: movie.year,
			description: movie.description,
			image: 'https://api.nomoreparties.co' + movie.image.url,
			trailer: movie.trailerLink,
			nameRU: movie.nameRU,
			nameEN: movie.nameEN,
			thumbnail: 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url,
			movieId: String(movie.id),
		}),
	});

	if (response.ok) {
		return response.json();
	}

	throw new Error(serverError)
}

export async function registerUser(name, email, password) {
	const response = await fetch(BASE_URL + 'signup', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({name, email, password})
	});

	if (response.ok) {
		return response.json();
	}

	throw new Error('Ошибка регистрации');
}

export async function loginUser(email, password) {
	const response = await fetch(BASE_URL + 'signin', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({email, password})
	});


	if (response.ok) {
		return response.json();
	}

	throw new Error('Ошибка авторизации');
}

export async function getCurrentUser(jwt) {
	const response = await fetch(BASE_URL + 'users/me', {
		headers: {
			"Content-Type": "application/json",
			"Authorization" : `Bearer ${jwt}`,
		}
	});

	if (response.ok) {
		return response.json();
	}

	throw new Error('Ошибка загрузки пользовательских данных');
}

export async function updateProfile(name, email, jwt) {
	const response = await fetch(BASE_URL + 'users/me',{
		method: 'PATCH',
		headers: {
			"Content-Type": "application/json",
			"Authorization" : `Bearer ${jwt}`,
		},
		body: JSON.stringify({
			name: name,
			email: email,
		})
	});

	if (response.ok) {
		return response.json();
	}

	throw new Error('Ошибка обновления пользовательских данных');
}

export async function removeMovieCard(moviesId) {
	const response = await fetch(BASE_URL + 'movies/' + moviesId, {
		method: 'DELETE',
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`,
		},
	});

	if (response.ok) {
		return response.json();
	}

	throw new Error('Ошибка регистрации');
}

export async function getSavedMovies() {
	const response = await fetch(BASE_URL + 'movies', {
		headers: {
			"Content-Type": "application/json",
			"Authorization" : `Bearer ${token}`,
		}
	});

	if (response.ok) {
		return response.json();
	}

	throw new Error('Ошибка загрузки фильмов');
}
