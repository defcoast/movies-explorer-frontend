import React from "react";
import './Register.css';
import Button from "../others/Button/Button";
import {Link} from "react-router-dom";
import Header from "../Header/Header";

export default function Register(props) {
	/** Имя пользователя. */
	const [name, setName] = React.useState('');

	/** Email пользователя. */
	const [email, setEmail ] = React.useState('');

	/** Пароль пользователя. */
	const [password, setPassword ] = React.useState('');

	/** Обработчик изменения имени пользователя. */
	function handleChangeName(e) {
		setName(e.target.value);
	}

	/** Обработчик изменения электронной почты пользователя. */
	function handleChangeEmail(e) {
		setEmail(e.target.value);
	}

	/** Обработчик изменения пароля пользователя. */
	function handleChangePassword(e) {
		setPassword(e.target.value);
	}

	/** Обработчик отправки формы на сервер. */
	function handleFormSubmit(e) {
		e.preventDefault();
		props.onRegister(name, email, password);
	}

	return (
			<>
				<Header
					showNavigation={false}
				/>
				<section className="register">
					<form
						action="#"
						className="register__form"
						onSubmit={handleFormSubmit}
					>
						<div>
							<h1 className="register__title">
								Добро пожаловать!
							</h1>

							<ul className="register__list">
								<li className="register__item">
									<label htmlFor="name" className="register__label">
										Имя
									</label>
									<input
										type="text"
										className="register__input"
										id="name"
										required
										onChange={handleChangeName}
									/>
								</li>

								<li className="register__item">
									<label htmlFor="email" className="register__label">
										E-mail
									</label>
									<input
										type="mail"
										className="register__input"
										id="email"
										required
										onChange={handleChangeEmail}
									/>
								</li>

								<li className="register__item">
									<label htmlFor="password" className="register__label">
										Пароль
									</label>
									<input
										type="password"
										className="register__input"
										id="password"
										required
										onChange={handleChangePassword}
									/>
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
