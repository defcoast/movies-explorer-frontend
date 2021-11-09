import React from "react";
import './Button.css'

export default function Button(props) {
	return (
		<button className={props.className +' button button_color_' + props.color}>
			{props.children}
		</button>
	);
}
