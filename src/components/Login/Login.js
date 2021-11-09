import React from "react";
import './Login.css';
import Button from "../others/Button/Button";

export default function Login() {
	return (
		<div className="container">
			<section className="login">
				<form action="#" className="login__form">
					<h1 className="login__title">
						Рады видеть!
					</h1>

					<ul className="login__list">
						<li className="login__item">
							<label htmlFor="email" className="login__label">
								E-mail
							</label>
							<input type="mail" className="login__input" id="email"/>
						</li>

						<li className="login__item">
							<label htmlFor="password" className="login__label">
								Пароль
							</label>
							<input type="password" className="login__input" id="password"/>
						</li>
					</ul>

					<div className="login__links">
						<Button
							color="black"
							className="login__button"
						>
							Войти
						</Button>
						<span className="login__text">
							Ещё не зарегистрированы?&nbsp;
							<a href="" className="login__link">
								Регистрация
							</a>
						</span>
					</div>
				</form>
			</section>
		</div>
	);
}
