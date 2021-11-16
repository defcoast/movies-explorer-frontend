import React from "react";
import './CardButton.css';

export default function CardButton(props) {
	const typeBtn = {
		save   : 'save',
		saved  : 'saved',
		remove : 'remove',
	};

	return (
		<>
			{props.type === typeBtn.save &&
				<button className={props.className + ' ' + typeBtn.save}>
					Сохранить
				</button>
			}

			{props.type === typeBtn.saved &&
				<button className={props.className + ' ' + typeBtn.saved} />
			}

			{props.type === typeBtn.remove &&
				<button className={props.className + ' ' + typeBtn.remove} />
			}
		</>
	);
}
