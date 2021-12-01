const baseUrl = 'https://api.nomoreparties.co/beatfilm-movies';

export async function getFilms() {
	const data = await fetch(baseUrl);

	if (data.ok) {
		return  data.json();
	}

	throw new Error('Server Error');
}
