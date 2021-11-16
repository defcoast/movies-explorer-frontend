import React from "react";
import './Register.css';
import Button from "../others/Button/Button";
import {Link} from "react-router-dom";
import Header from "../Header/Header";

export default function Register() {
	return (
			<>
				<Header
					showNavigation={false}
				/>
				<section className="register">
					<form action="#" className="register__form">
						<div>
							<h1 className="register__title">
								Добро пожаловать!
							</h1>

							<ul className="register__list">
								<li className="register__item">
									<label htmlFor="name" className="register__label">
										Имя
									</label>
									<input type="text" className="register__input" id="name" required/>
								</li>

								<li className="register__item">
									<label htmlFor="email" className="register__label">
										E-mail
									</label>
									<input type="mail" className="register__input" id="email" required />
								</li>

								<li className="register__item">
									<label htmlFor="password" className="register__label">
										Пароль
									</label>
									<input type="password" className="register__input" id="password" required />
								</li>
							</ul>
						</div>

						<div className="register__links">
							<Button
								color="black"
								className="register__button"
							>
								Зарегистрироваться
							</Button>
							<span className="register__text">
							Уже зарегистрированы?&nbsp;
								<Link to="/signin" className="register__link">
								Войти
							</Link>
						</span>
						</div>
					</form>
				</section></>
	);
}
