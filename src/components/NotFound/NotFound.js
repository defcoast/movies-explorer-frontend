import React from "react";
import './NotFound.css';
import {Link} from "react-router-dom";

export default function NotFound() {
	return (
		<section className="not-found">
			<div>
				<h1 className="not-found__title">
					404
				</h1>
				<span className="not-found__subtitle">
					Страница не найдена
				</span>
			</div>
			<Link to="/" className="not-found__link">
				Назад
			</Link>
		</section>
	);
}
