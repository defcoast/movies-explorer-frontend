import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

import card1 from '../../../images/cards/card1.jpg';
import card2 from '../../../images/cards/card2.jpg';
import card3 from '../../../images/cards/card3.jpg';
import card4 from '../../../images/cards/card4.jpg';
import card5 from '../../../images/cards/card5.jpg';
import card6 from '../../../images/cards/card6.jpg';
import card7 from '../../../images/cards/card7.jpg';
import card8 from '../../../images/cards/card8.jpg';
import card9 from '../../../images/cards/card9.jpg';
import card10 from '../../../images/cards/card10.jpg';
import card11 from '../../../images/cards/card11.jpg';
import card12 from '../../../images/cards/card12.jpg';






export default function MoviesCardList() {
	return (
		<>
			<ul className="movies-list">
				<MoviesCard
					image={card1}
					title="33 слова о дизайне"
					duration="1ч 17м"
				/>

				<MoviesCard
					image={card2}
					title="Киноальманах «100 лет дизайна»"
					duration="1ч 17м"
				/>

				<MoviesCard
					image={card3}
					title="В погоне за Бенкси"
					duration="1ч 17м"
				/>

				<MoviesCard
					image={card4}
					title="Баския: Взрыв реальности"
					duration="1ч 17м"
				/>

				<MoviesCard
					image={card5}
					title="Бег это свобода"
					duration="1ч 17м"
				/>

				<MoviesCard
					image={card6}
					title="Книготорговцы"
					duration="1ч 17м"
				/>

				<MoviesCard
					image={card7}
					title="Когда я думаю о Германии ночью"
					duration="1ч 17м"
				/>

				<MoviesCard
					image={card8}
					title="Gimme Danger: История Игги и The Stooges"
					duration="1ч 17м"
				/>

				<MoviesCard
					image={card9}
					title="Дженис: Маленькая девочка грустит"
					duration="1ч 17м"
				/>

				<MoviesCard
					image={card10}
					title="Дженис: Соберись перед прыжком"
					duration="1ч 17м"
				/>

				<MoviesCard
					image={card11}
					title="Пи Джей Харви: A dog called money"
					duration="1ч 17м"
				/>

				<MoviesCard
					image={card12}
					title="По волнам: Искусство звука в кино"
					duration="1ч 17м"
				/>
			</ul>
			<div className="movies-list__show-more-wrapper">
				<button className="movies-list__show-more-btn">
					Ещё
				</button>
			</div>
		</>

	);
}
