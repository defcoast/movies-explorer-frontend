import React from "react";
import './Login.css';
import Button from "../others/Button/Button";
import {Link} from "react-router-dom";
import Header from "../Header/Header";

export default function Login() {
	return (
			<>
				<Header
					showNavigation={false}
				/>
				<section className="login">
					<form action="#" className="login__form">
						<div>
							<h1 className="login__title">
								Рады видеть!
							</h1>

							<ul className="login__list">
								<li className="login__item">
									<label htmlFor="email" className="login__label">
										E-mail
									</label>
									<input type="mail" className="login__input" id="email" required />
								</li>

								<li className="login__item">
									<label htmlFor="password" className="login__label">
										Пароль
									</label>
									<input type="password" className="login__input" id="password" required />
								</li>
							</ul>
						</div>

						<div className="login__links">
							<Button
								color="black"
								className="login__button"
							>
								Войти
							</Button>
							<span className="login__text">
							Ещё не зарегистрированы?&nbsp;
								<Link to="/signup" className="login__link">
								Регистрация
							</Link>
						</span>
						</div>
					</form>
				</section></>
	);
}
