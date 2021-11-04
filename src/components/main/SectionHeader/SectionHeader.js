import React from "react";
import './SectionHeader.css'

export default function SectionHeader(props) {
	return (
		<h2 className="section-header__title">
			{props.title}
		</h2>
	);
}
