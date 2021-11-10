import React from "react";
import './Header.css'
import headerLogo from '../../images/header-logo.svg';
import Button from "../others/Button/Button";
import {NavLink, Link} from "react-router-dom";


export default function Header() {
	return (
		<header className='header' >
			<Link to="/">
				<img className='header__logo' src={headerLogo} alt="Логотип сайта" />
			</Link>

			<nav className="header__menu">
				<ul className="header__menu-list">
					<li className="header__menu-item">
						<NavLink
							className="header__link"
							to="/movies"
							activeClassName="header__link_active"
						>
							Фильмы
						</NavLink>
					</li>
					<li className="header__menu-item">
						<NavLink
							className="header__link"
							to="/saved-movies"
							activeClassName="header__link_active"
						>
							Сохраненные фильмы
						</NavLink>
					</li>
				</ul>

				<div className="header__auth-buttons">
					<Link className="header__signin-btn" to="/signin">
						<Button
							color={'black'}
						>
							Войти
						</Button>
					</Link>
				</div>
			</nav>


		</header>
	);
}
