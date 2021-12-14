import React, {useEffect} from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../UI/Preloader/Preloader";
import {notFoundError, serverError} from "../../../utils/constants";

export default function MoviesCardList({
	needDisplayMoviesList,
    needDisplayPreloader,
    needDisplayApiErrorMsg,
    filteredMoviesList,
    needDisplayNotFoundError,
    totalCardsQuantity,
    setTotalCardsQuantity,
    needDisplayShowMoreBtn,
}) {

	useEffect(() => {
		handleResize();
	}, []);

	useEffect(() => {
		window.addEventListener('resize', handleResize);

		setTimeout(() => {
			handleResize();
		}, 5000);

		return () => {
			window.removeEventListener('resize', handleResize);
		}
	});

	function handleResize() {
		if (window.innerWidth < 768) {
			setTotalCardsQuantity(5);
		}
		else if (window.innerWidth >= 768 && window.innerWidth <= 1280) {
			setTotalCardsQuantity(8);
		}
		else if (window.innerWidth > 1280) {
			setTotalCardsQuantity(12);
		}
	}

	function handleShowMoreClick() {
		setTotalCardsQuantity(totalCardsQuantity + 3);

		if (window.innerWidth <= 768) {
			setTotalCardsQuantity(totalCardsQuantity + 2);

		}
		else if (window.innerWidth > 768 && window.innerWidth < 1280) {
			setTotalCardsQuantity(totalCardsQuantity + 2);

		}
		else if (window.innerWidth >= 1280) {
			setTotalCardsQuantity(totalCardsQuantity + 3);
		}
	}

	function convertDuration(duration) {
		const hours = Math.round(duration / 60) + 'ч';
		const minutes = duration % 60 + 'м';

		return hours + ' ' + minutes;
	}

	return (
		<>
			{needDisplayPreloader &&
				<Preloader />
			}

			{needDisplayApiErrorMsg &&
				<p className="message">
					{serverError}
				</p>
			}

			{needDisplayNotFoundError &&
				<p className="message">
					{notFoundError}
				</p>
			}

			{needDisplayMoviesList &&
				<>
					<ul className="movies-list">
					{filteredMoviesList.slice(0, totalCardsQuantity).map((movie) => (
						<MoviesCard
							key={movie.id}
							image={'https://api.nomoreparties.co' + movie.image.url}
							title={movie.nameRU}
							duration={convertDuration(movie.duration)}
							link={movie.trailerLink}
							movie={movie}
						/>
					))}
					</ul>

					{needDisplayShowMoreBtn &&
						<div className="movies-list__show-more-wrapper">
							<button
								className="movies-list__show-more-btn"
								onClick={handleShowMoreClick}
							>
								Ещё
							</button>
						</div>
					}
				</>
			}
		</>
	);
}
