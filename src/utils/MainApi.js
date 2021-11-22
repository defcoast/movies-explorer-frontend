const baseURL = 'https://api.diplom.nomoredomains.rocks';
const token = localStorage.getItem('token');
console.log(token)

/** Сохранить выбранную карточку с фильмом. */
export async function saveMovieCard(movie) {
	const response = await fetch(baseURL + '/movies', {
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

	if (response.status === 201 || response.status === 200) {
		return response.json();
	}
}

/** Удалить сохраненную карточку с фильмом. */
export async function removeMovieCard(moviesId) {
	await fetch(baseURL + '/movies/' + moviesId, {
		method: 'DELETE',
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`,
		},
	})
}

/** Зарегистрировать нового пользователя. */
export async function registerUser(name, email, password) {
	const response = await fetch(baseURL + '/signup', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({name, email, password})
	});

	if (response.status === 201 || response.status === 200) {
		return response.json();
	}

	throw new Error('Ошибка регистрации');
}

/** Авторизовать пользователя. */
export async function loginUser(email, password) {
	const response = await fetch(baseURL + '/signin', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({email, password})
	});


	if (response.status === 201 || response.status === 200) {
		return response.json();
	}

	throw new Error('Ошибка авторизации');
}

/** Получить список сохраненных фильмов. */
export async function getSavedMovies() {
	const response = await fetch(baseURL + '/movies', {
		headers: {
			"Content-Type": "application/json",
			"Authorization" : `Bearer ${token}`,
		}
	});

	if (response.status === 201 || response.status === 200) {
		return response.json();
	}

	throw new Error('Ошибка загрузки фильмов');
}
