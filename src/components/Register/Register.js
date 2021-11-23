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

	/** Коснулся-ли пользователь поля "Имя". */
	const [nameDirty, setNameDirty] = React.useState(false);

	/** Коснулся-ли пользователь поля "Email". */
	const [emailDirty, setEmailDirty] = React.useState(false);

	/** Коснулся-ли пользователь поля "пароль". */
	const [passwordDirty, setPasswordDirty] = React.useState(false);

	/** Текст ошибки для поля "Имя". */
	const [nameError, setNameError] = React.useState('');

	/** Текст ошибки для поля "E-mail". */
	const [emailError, setEmailError] = React.useState('');

	/** Текст ошибки для поля "Пароль". */
	const [passwordError, setPasswordError] = React.useState('');

	/** Валидная-ли форма. */
	const [isValidForm, setIsValidForm] = React.useState(false);

	/** Валидная-ли форма. */
	React.useEffect(() => {
		if (!(nameDirty && emailDirty && passwordDirty)) {
			setIsValidForm(false);
		}
		else if (nameError || emailError || passwordError) {
			setIsValidForm(false);
		} else {
			setIsValidForm(true);
		}
	}, [nameError, emailError, passwordError, nameDirty, emailDirty, passwordDirty]);

	/** Обработчик изменения имени пользователя. */
	function handleChangeName(e) {
		const targetName = e.target.value
		setNameDirty(true);
		setName(targetName);

		const re = /^[a-zа-яё\s\-]+$/;
		if (targetName.length < 2 || targetName.length > 30) {
			setNameError('Имя не может быть меньше 2-х и больше 30 символов');
		}
		else if (!re.test(String(targetName).toLowerCase())) {
			setNameError('Некорректное имя');
		} else {
			setNameError('');
		}
	}

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
		props.onRegister(name, email, password, true);
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
										name="name"
										required
										onChange={handleChangeName}
									/>
									{(nameDirty && nameError) &&
										<div className="register__error-msg">
											{nameError}
										</div>
									}
								</li>

								<li className="register__item">
									<label htmlFor="email" className="register__label">
										E-mail
									</label>
									<input
										type="mail"
										className="register__input"
										id="email"
										name="email"
										required
										onChange={handleChangeEmail}
									/>
									{(emailDirty && emailError) &&
									<div className="register__error-msg">
										{emailError}
									</div>
									}
								</li>

								<li className="register__item">
									<label htmlFor="password" className="register__label">
										Пароль
									</label>
									<input
										type="password"
										className="register__input"
										id="password"
										name="password"
										required
										onChange={handleChangePassword}
									/>
									{(passwordDirty && passwordError) &&
									<span className="register__error-msg">
										{passwordError}
									</span>
									}
								</li>
							</ul>
						</div>

						<div className="register__links">
							<span className="register__connect-err-msg">
								{props.registerErrorConnectApiMsg}
							</span>
							<Button
								disabled={!isValidForm}
								color="black"
								className={!isValidForm ? 'register__button button_disabled' : 'register__button'}
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
