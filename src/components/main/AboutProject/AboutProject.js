import React from "react";
import './AboutProject.css';
import SectionHeader from "../SectionHeader/SectionHeader";

export default function AboutProject() {
	return (
		<section className="about-project">
			<SectionHeader title="О проекте" />
			<ul className="about-project__list">
				<li className="about-project__item">
					<h3 className="about-project__item-title">
						Дипломный проект включал 5 этапов
					</h3>
					<p className="about-project__item-description">
						Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
					</p>
				</li>
				<li className="about-project__item">
					<h3 className="about-project__item-title">
						На выполнение диплома ушло 5 недель
					</h3>
					<p className="about-project__item-description">
						У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
					</p>
				</li>
			</ul>
			<div className="about-project__timeline">
				<div className="about-project__timeline-half about-project__timeline-half_color_black">
					<span className="about-project__half-name">
						1 неделя
					</span>
					<span className="about-project__half-description">
						Back-end
					</span>
				</div>
				<div className="about-project__timeline-half about-project__timeline-half_color_grey">
					<span className="about-project__half-name">
						4 недели
					</span>
					<span className="about-project__half-description">
						Front-end
					</span>
				</div>
			</div>
		</section>
	);
}
