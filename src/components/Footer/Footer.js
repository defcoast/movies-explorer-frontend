import React from "react";
import './Footer.css';

export default function Footer() {
	return (
		<footer className="footer">
			<h2 className="footer__title">
				Учебный проект Яндекс.Практикум х BeatFilm.
			</h2>
			<div className="footer__bottom-block">
				<span className="footer__copyright">
					© 2020
				</span>
				<nav className="footer__menu">
					<ul className="footer__list">
						<li className="footer__item">
							<a href="#" className="footer__link">
								Яндекс.Практикум
							</a>
						</li>

						<li className="footer__item">
							<a href="#" className="footer__link">
								Github
							</a>
						</li>

						<li className="footer__item">
							<a href="#" className="footer__link">
								Facebook
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</footer>
	);
}
