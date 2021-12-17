import React from "react";
import './BurgerMenu.css';

export default function BurgerMenu(props) {

	const [needShowMobileNav, setNeedShowMobileNav] = React.useState(false);


	function handleClickOpenBurgerMenu() {
		setNeedShowMobileNav(true);
	}

	function handleClickClosBtn() {
		setNeedShowMobileNav(false);
	}

	return (
		<div className="mobile-menu">
			<span
				className="mobile-menu__trigger"
				onClick={handleClickOpenBurgerMenu}
			/>
			{needShowMobileNav &&
				<div className="mobile-menu__cover">
					<span
						className="mobile-menu__close-icon"
						onClick={handleClickClosBtn}
					/>
					{props.children}
				</div>
			}
		</div>
	);
}
