import React from "react";
import './Header.css'
import headerLogo from '../../images/header-logo.svg';
import Button from "../others/Button/Button";


export default function Header() {
	return (
		<header className='header' >
			<a href="#">
				<img className='header__logo' src={headerLogo} alt="Логотип сайта" />
			</a>

			<nav className="header__menu">
				<ul className="header__menu-list">
					<li className="header__menu-item">
						Фильмы
					</li>
					<li className="header__menu-item">
						Сохраненные фильмы
					</li>
				</ul>

				<div className="header__auth-buttons">
					<Button
						color={'black'}
					>
						Войти
					</Button>
				</div>
			</nav>


		</header>
	);
}
