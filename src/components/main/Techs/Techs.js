import React from "react";
import './Techs.css'
import SectionHeader from "../SectionHeader/SectionHeader";

export default function Techs() {
	return (
		<section className="techs">
			<SectionHeader title="Технологии" />
			<h2 className="techs__title">
				7 технологий
			</h2>
			<p className="techs__description">
				На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
			</p>
			<div className="techs__plates">
				<div className="techs__plate">
					HTML
				</div>

				<div className="techs__plate">
					CSS
				</div>

				<div className="techs__plate">
					JS
				</div>

				<div className="techs__plate">
					React
				</div>

				<div className="techs__plate">
					Git
				</div>

				<div className="techs__plate">
					Express.js
				</div>

				<div className="techs__plate">
					mongoDB
				</div>
			</div>
		</section>
	);
}
