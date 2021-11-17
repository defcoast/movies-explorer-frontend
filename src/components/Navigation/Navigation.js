import React from "react";
import './Navigation.css';
import {Link, NavLink} from "react-router-dom";
import Button from "../others/Button/Button";
import BurgerMenu from "../others/BurgerMenu/BurgerMenu";

export default function Navigation() {
	return (
		<>
			{}
			<div className="navigation">
				<nav className="navigation__menu">
					<ul className="navigation__menu-list">
						<li className="navigation__menu-item">
							<NavLink
								className="navigation__link"
								to="/movies"
								activeClassName="navigation__link_active"
							>
								Фильмы
							</NavLink>
						</li>
						<li className="navigation__menu-item">
							<NavLink
								className="navigation__link"
								to="/saved-movies"
								activeClassName="navigation__link_active"
							>
								Сохраненные фильмы
							</NavLink>
						</li>
					</ul>

					<div className="navigation__auth-buttons">
						<Link className="navigation__signin-btn" to="/signin">
							<Button
								color={'black'}
							>
								Войти
							</Button>
						</Link>
					</div>
				</nav>
			</div>

			<div className="navigation-mobile">
				<BurgerMenu>
					<nav className="navigation__menu">
						<ul className="navigation__menu-list">
							<li className="navigation__menu-item">
								<NavLink
									className="navigation__link"
									to="/"
									exact
									activeClassName="navigation__link_active"
								>
									Главная
								</NavLink>
							</li>

							<li className="navigation__menu-item">
								<NavLink
									className="navigation__link"
									to="/movies"
									activeClassName="navigation__link_active"
								>
									Фильмы
								</NavLink>
							</li>

							<li className="navigation__menu-item">
								<NavLink
									className="navigation__link"
									to="/saved-movies"
									activeClassName="navigation__link_active"
								>
									Сохраненные фильмы
								</NavLink>
							</li>
						</ul>

						<div className="navigation__auth-buttons">
							<Link className="navigation__signin-btn" to="/signin">
								<Button
									color={'black'}
								>
									Войти
								</Button>
							</Link>
						</div>
					</nav>
				</BurgerMenu>
			</div>
		</>
	);
}
