import React from "react";
import './Login.css';
import Button from "../others/Button/Button";
import {Link} from "react-router-dom";
import Header from "../Header/Header";

export default function Login(props) {
	/** Email пользователя. */
	const [email, setEmail ] = React.useState('');

	/** Пароль пользователя. */
	const [password, setPassword ] = React.useState('');

	/** Коснулся-ли пользователь поля "Email". */
	const [emailDirty, setEmailDirty] = React.useState(false);

	/** Коснулся-ли пользователь поля "пароль". */
	const [passwordDirty, setPasswordDirty] = React.useState(false);

	/** Текст ошибки для поля "E-mail". */
	const [emailError, setEmailError] = React.useState('');

	/** Текст ошибки для поля "Пароль". */
	const [passwordError, setPasswordError] = React.useState('');

	/** Валидная-ли форма. */
	const [isValidForm, setIsValidForm] = React.useState(false);

	/** Валидная-ли форма. */
	React.useEffect(() => {
		if (!(emailDirty && passwordDirty)) {
			setIsValidForm(false);
		}
		else if (emailError || passwordError) {
			setIsValidForm(false);
		} else {
			setIsValidForm(true);
		}
	}, [emailError, passwordError, emailDirty, passwordDirty]);

	/** Обработчик изменения электронной почты пользователя. */
	function handleChangeEmail(e) {
		setEmailDirty(true);
		setEmail(e.target.value);

		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(String(e.target.value).toLowerCase())) {
			setEmailError('Некорректный email');
		} else {
			setEmailError('');
		}
	}

	/** Обработчик изменения пароля пользователя. */
	function handleChangePassword(e) {
		const targetPassword = e.target.value
		setPasswordDirty(true);
		setPassword(targetPassword);

		if (targetPassword.length < 1) {
			setPasswordError('Пароль обязателен для заполнения');
		}
	}

	/** Обработчик отправки формы на сервер. */
	function handleFormSubmit(e) {
		e.preventDefault();
		props.onLogin(email, password, true);
	}

	return (
		<>
			<Header
				showNavigation={false}
			/>
			<section className="login">
				<form
					action="#"
					className="login__form"
					onSubmit={handleFormSubmit}
				>
					<div>
						<h1 className="login__title">
							Добро пожаловать!
						</h1>

						<ul className="login__list">
							<li className="login__item">
								<label htmlFor="email" className="login__label">
									E-mail
								</label>
								<input
									type="mail"
									className="login__input"
									id="email"
									name="email"
									required
									onChange={handleChangeEmail}
								/>
								{(emailDirty && emailError) &&
								<div className="login__error-msg">
									{emailError}
								</div>
								}
							</li>

							<li className="login__item">
								<label htmlFor="password" className="login__label">
									Пароль
								</label>
								<input
									type="password"
									className="login__input"
									id="password"
									name="password"
									required
									onChange={handleChangePassword}
								/>
								{(passwordDirty && passwordError) &&
								<span className="login__error-msg">
										{passwordError}
									</span>
								}
							</li>
						</ul>
					</div>

					<div className="login__links">
							<span className="login__connect-err-msg">
								{props.loginErrorConnectApiMsg}
							</span>
						<Button
							disabled={!isValidForm}
							color="black"
							className={!isValidForm ? 'login__button button_disabled' : 'login__button'}
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
