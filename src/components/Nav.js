import React, { useEffect, useState } from 'react'
import "./Nav.css";

export default function Nav() {
	
	const [show, setShow] = useState(false);
	// scroll을 내렸을때 배경색을 변경
	useEffect(() => {
		window.addEventListener('scroll', () => {
			// console.log(window.scrollY);
			if(window.scrollY > 50) {
				setShow(true);
			} else {
				setShow(false);
			}
		});

		return () => {
			window.removeEventListener('scroll', () => {});
		};
	}, []);

	return (		
		// <nav className={show ? "nav nav__black" : "nav"}> 둘다 가능
		<nav className={`nav ${show && "nav__black"}`}>
			<img 
				alt='Netflix logo' 
				src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png'
				className='nav__logo'
				onClick={() => window.location.reload()}
			/>
			<img
				alt='User logged'
				src='https://occ-0-993-3996.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e'
				className='nav__avatar'
			/>
		</nav>
	)
}
