import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../others/Preloader/Preloader";

export default function MoviesCardList(props) {
	/** Количество отображаемых карточек. */
	const [cardCount, setCardCount] = React.useState(Number(localStorage.getItem('card-count')));
	console.log('cardCount наверху', cardCount)
	console.log('local storage', Number(localStorage.getItem('card-count')));

	/** Нужно-ли отображать кнопку "Показать еще". */
	const [needShowMoreMoviesBtn, setNeedShowMoreMoviesBtn] = React.useState(false);

	/** Ширина экрана устройства. */
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

	/** Количество отображаемых карточек при клике на кнопку "Показать еще". */
	const [showCardsCountOnClickShowMore, setShowCardsCountOnClickShowMore] = React.useState(null);


	/** Отобразить кнопку "Показать еще", если приходит больше 3-ех карточек фильма. */
	React.useEffect(() => {
		if (props.cards.length > 3) {
			setNeedShowMoreMoviesBtn(true);
		}
	}, [props.cards]);

	/** Установка слушателя ширины экрана устройства. */
	React.useEffect(() => {
		function handleWindowResize() {
			setTimeout(() => {
				setWindowWidth(window.innerWidth);
			},1000);
		}

		window.addEventListener('resize', handleWindowResize);
			calcStartCardsCount();

		return () => {
			window.addEventListener('resize', handleWindowResize);
		}
	}, [window.innerWidth]);

	/** Скрыть кнопку "Показать еще", если выведены все результаты запроса. */
	React.useEffect(() => {
		if (cardCount > props.cards.length) {
			setNeedShowMoreMoviesBtn(false);
		}
	}, [cardCount]);

	function calcStartCardsCount() {

		if (windowWidth <= 768) {
			setCardCount(5);
			localStorage.setItem('card-count', '5');
			setShowCardsCountOnClickShowMore(2);
		}
		else if (windowWidth > 768 && windowWidth < 1280) {
			setCardCount(8);
			localStorage.setItem('card-count', '8');
			setShowCardsCountOnClickShowMore(2);
		}
		else if (windowWidth >= 1280) {
			setCardCount(12);
			localStorage.setItem('card-count', '12');
			setShowCardsCountOnClickShowMore(3);
		}
	}

	/** Обработчик клика по кнопке "Показать еще". */
	function handleClickShowMoreBtn() {
		if (cardCount >= props.cards.length) {
			setNeedShowMoreMoviesBtn(false);
			return;
		}
		setCardCount(cardCount + showCardsCountOnClickShowMore);
		localStorage.setItem('card-count', String(cardCount + showCardsCountOnClickShowMore));

	}
	/** Преобразование часов фильма в человекочитаемый формат. */
	function convertDuration(duration) {
		const hours = Math.round(duration / 60) + 'ч';
		const minutes = duration % 60 + 'м';

		return hours + ' ' + minutes;
	}

	/**
	 * Сколько карточек нужно отображать при отрисовке страницы (на разной ширине окна).
	 * Сколько карточек нужно отображать при нажатии на кнопу "Показать еще".
	 */


	return (
		<div className={!props.needShowMoviesCards ? 'movies-card-list movies-card-list_empty' : ''}>
			{props.needShowPreloader &&
				<Preloader />
			}

			{props.needShowErrorMsg &&
				<p>ERROR</p>
			}

			{props.needShowMoviesCards &&
			<>
				<ul className="movies-list">
					{
						props.cards.slice(0, cardCount).map((film) => (
							<MoviesCard
								image={'https://api.nomoreparties.co' + film.image.url}
								key={film.id}
								title={film.nameRU}
								duration={convertDuration(film.duration)}
							/>
						))
					}
				</ul>

				{needShowMoreMoviesBtn &&
				<div className="movies-list__show-more-wrapper">
					<button
						className="movies-list__show-more-btn"
						onClick={handleClickShowMoreBtn}
					>
						Ещё
					</button>
				</div>
				}
			</>
			}
		</div>

	);
}
