import React from "react";
import './Header.css'
import headerLogo from '../../images/header-logo.svg';
import {Link} from "react-router-dom";
import Navigation from "../Navigation/Navigation";


export default function Header() {
	return (
		<header className='header' >
			<Link to="/">
				<img className='header__logo' src={headerLogo} alt="Логотип сайта" />
			</Link>

			<Navigation />
		</header>
	);
}
