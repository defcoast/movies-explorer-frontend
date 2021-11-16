import React from "react";
import './Header.css'
import headerLogo from '../../images/header-logo.svg';
import {Link} from "react-router-dom";
import Navigation from "../Navigation/Navigation";

Header.defaultProps = {
	showNavigation: true,
};

export default function Header(props) {
	console.log(props.showNavigation)

	return (
		<header className={props.showNavigation ? 'header' : ' header header_type_without-nav'}>
			<Link to="/">
				<img className='header__logo' src={headerLogo} alt="Логотип сайта" />
			</Link>

			{props.showNavigation &&
				<Navigation />
			}
		</header>
	);
}
