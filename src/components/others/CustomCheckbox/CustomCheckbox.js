import React from "react";
import './CustomCheckbox.css';

export default function CustomCheckbox(props) {
	return (
		<label className="checkbox">
			<input onChange={props.onChange} type="checkbox" className="checkbox__input"/>
			<div className="checkbox__box" />
		</label>
	);
}
