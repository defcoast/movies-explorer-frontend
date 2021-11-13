import React from "react";
import './CustomCheckbox.css';

export default function CustomCheckbox() {
	return (
		<label className="checkbox">
			<input type="checkbox" className="checkbox__input"/>
			<div className="checkbox__box" />
		</label>
	);
}
