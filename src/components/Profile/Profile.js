import React, {useRef} from "react";
import './Profile.css';
import Header from "../Header/Header";
import {CurrentUserContext} from "../../utils/CurrentUserContext";
import {Link} from "react-router-dom";

export default function Profile(props) {
	const currentUser = React.useContext(CurrentUserContext);

	/** Имя пользователя. */
	const [name, setName] = React.useState('');

	/** Email пользователя. */
	const [email, setEmail ] = React.useState('');

	/** Коснулся-ли пользователь поля "Имя". */
	const [nameDirty, setNameDirty] = React.useState(false);

	/** Коснулся-ли пользователь поля "Email". */
	const [emailDirty, setEmailDirty] = React.useState(false);

	/** Текст ошибки для поля "Имя". */
	const [nameError, setNameError] = React.useState('');

	/** Текст ошибки для поля "E-mail". */
	const [emailError, setEmailError] = React.useState('');

	/** Валидная-ли форма. */
	const [isValidForm, setIsValidForm] = React.useState(false);

	const [updateUserName, setUpdateUserName] = React.useState(currentUser.name);

	const [updateUserEmail, setUpdateUserEmail] = React.useState(currentUser.email);

	const nameInput = useRef('');

	const emailInput = useRef('');

	React.useEffect(() => {
		if (currentUser) {
			setName(currentUser.name);
			setEmail(currentUser.email);
		}
	});

	React.useEffect(() => {
		if (name === updateUserName || email === updateUserEmail) {
			setIsValidForm(false);
		}
	},[name, email, updateUserName, updateUserEmail])

	/** Валидная-ли форма. */
	React.useEffect(() => {
		if (!(nameDirty || emailDirty)) {
			setIsValidForm(false);
		} else if (nameError || emailError ) {
			setIsValidForm(false);
		} else {
			setIsValidForm(true);
		}
	}, [nameError, emailError, nameDirty, emailDirty, name, email]);

	/** Обработчик изменения имени пользователя. */
	function handleChangeName(e) {
		const targetName = e.target.value
		setNameDirty(true);
		setName(targetName);

		const re = /^[a-zа-яё\s-]+$/;
		if (targetName.length < 2 || targetName.length > 30) {
			setNameError('Имя не может быть меньше 2-х и больше 30 символов');
		}
		else if (!re.test(String(targetName).toLowerCase())) {
			setNameError('Некорректное имя');
		}
		else if (targetName === currentUser.name) {
			setNameError('Это имя уже используется вами сейчас');
		}
		else {
			setNameError('');
		}
	}

	/** Обработчик изменения электронной почты пользователя. */
	function handleChangeEmail(e) {
		const targetName = e.target.value

		setEmailDirty(true);
		setEmail(targetName);

		const re =  /\S+@\S+\.\S+/;
		if (!re.test(String(targetName).toLowerCase())) {
			setEmailError('Некорректный email');
		}
		else if (targetName === currentUser.email) {
			setEmailError('Этот E-mail уже используется вами сейчас');
		}
		else {
			setEmailError('');
		}
	}

	/** Обработчик отправки формы на сервер. */
	function handleFormSubmit(e) {
		e.preventDefault();

		props.updateProfile(nameInput.current.value, emailInput.current.value)
		setUpdateUserName(nameInput.current.value);
		setUpdateUserEmail(emailInput.current.value);
	}

	return (
		<>
			<Header
				loggedIn={props.loggedIn}
			/>
			<section className="profile">
				<form
					action="#"
					className="profile__form"
					onSubmit={handleFormSubmit}
				>
					<div>
						<h1 className="profile__title">
							{`Привет, ${currentUser.name}!`}
						</h1>

						<ul className="profile__inputs">
							<li className="profile__inputs-item">
								<label htmlFor="name" className="profile__label">
									Имя
								</label>
								<input
									type="text"
									className="profile__input"
									placeholder="Стас Басов"
									defaultValue={name}
									ref={nameInput}
									id="name"
									onChange={handleChangeName}
								/>
								{(nameDirty && nameError) &&
									<div className="register__error-msg">
										{nameError}
									</div>
								}
							</li>

							<li className="profile__inputs-item">
								<label htmlFor="email" className="profile__label">
									E-mail
								</label>
								<input
									type="email"
									className="profile__input"
									placeholder="basovstas@yandex.ru"
									defaultValue={email}
									ref={emailInput}
									id="email"
									onChange={handleChangeEmail}
								/>
								{(emailDirty && emailError) &&
									<div className="register__error-msg">
										{emailError}
									</div>
								}
							</li>
						</ul>
					</div>

					<div className="profile__links">
						{props.successfullyUpdateProfileMsg &&
							<span>
								{props.successfullyUpdateProfileMsg}
							</span>
						}
						<button
							type="submit"
							disabled={!isValidForm}
							className={!isValidForm ? 'profile__submit-btn profile__submit-btn_disabled' : 'profile__submit-btn'}
						>
							Редактировать
						</button>
						<Link to='/' className="profile__link profile__link_color_red"  onClick={props.logOut}>
							Выйти из аккаунта
						</Link>
					</div>
				</form>
			</section>
		</>
	);
}
