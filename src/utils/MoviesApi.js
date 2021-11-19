const baseUrl = 'https://api.nomoreparties.co/beatfilm-movies';

export async function getFilms() {
	const data = await fetch(baseUrl);
	return  data.json();
}
