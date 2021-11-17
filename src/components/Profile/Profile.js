import React from "react";
import './Profile.css';

export default function Profile() {
	return (
			<section className="profile">
				<form action="#" className="profile__form">
					<div>
						<h1 className="profile__title">
							Привет, Виталий!
						</h1>

						<ul className="profile__inputs">
							<li className="profile__inputs-item">
								<label htmlFor="name" className="profile__label">
									Имя
								</label>
								<input
									type="text"
									className="profile__input"
									placeholder="Виталий"
									id="name"
								/>
							</li>

							<li className="profile__inputs-item">
								<label htmlFor="email" className="profile__label">
									E-mail
								</label>
								<input
									type="email"
									className="profile__input"
									placeholder="pochta@yandex.ru"
									id="email"
								/>
							</li>
						</ul>
					</div>

					<div className="profile__links">
						<a href="#" className="profile__link">
							Редактировать
						</a>
						<a href="#" className="profile__link profile__link_color_red">
							Выйти из аккаунта
						</a>
					</div>
				</form>
			</section>
	);
}
