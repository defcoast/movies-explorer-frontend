import React from "react";
import './AboutMe.css'
import SectionHeader from "../SectionHeader/SectionHeader";
import photoWithMe from '../../../images/me.jpeg';
import linkArrow from '../../../images/icons/link-arrow.svg';

export default function AboutMe() {
	return (
		<section className="about">
			<SectionHeader title="Студент" />
			<div className="about__me">
				<div className="about__info">
					<h3 className="about__title">
						Александр
					</h3>
					<h4 className="about__subtitle">
						Фронтенд-разработчик, 25 лет
					</h4>
					<p className="about__description">
						Я родился и живу в г Владивосток, закончил факультет информационных технологий ВГУЭС.
						Я люблю слушать музыку, а ещё увлекаюсь пивом. Недавно начал кодить. С 2021 года работаю в компании «DNS-Технологии». После того, как прошёл курс по веб-разработке, начал  также заниматься фриланс-заказами.
					</p>
					<ul className="about__social-link-list">
						<li className="about__social-link-item">
							<a className="about__social-link" href="https://t.me/Rozhkov2222">
								Telegram
							</a>
						</li>
						<li className="about__social-link-item">
							<a className="about__social-link" href="https://github.com/defcoast/">
								Github
							</a>
						</li>
					</ul>
				</div>

				<img src={photoWithMe} alt="Моё фото" className="about__image"/>
			</div>

			<div className="about__portfolio">
				<h3 className="about__portfolio-title">
					Портфолио
				</h3>

				<ul className="about__list">
					<a href="https://defcoast.github.io/how-to-learn/" className="about__link">
						<li className="about__item">
						<span className="about__item-name">
							Статичный сайт
						</span>
							<img src={linkArrow} alt="Ссылка" className="about__item-image"/>
						</li>
					</a>

					<a href="https://defcoast.github.io/russian-travel/" className="about__link">
						<li className="about__item">
						<span className="about__item-name">
							Адаптивный сайт
						</span>
							<img src={linkArrow} alt="Ссылка" className="about__item-image"/>
						</li>
					</a>

					<a href="https://defcoast.github.io/mesto/" className="about__link">
						<li className="about__item">
						<span className="about__item-name">
							Одностраничное приложение
						</span>
							<img src={linkArrow} alt="Ссылка" className="about__item-image"/>
						</li>
					</a>
				</ul>
			</div>
		</section>
	);
}
