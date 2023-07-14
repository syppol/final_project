import React, { useEffect } from "react";
import css from "./Header.module.css";
import { Link } from "react-router-dom";
import logo_header from "./Assets/logo_header.svg";
import logo_header_mobile from "./Assets/logo_header_mobile.svg";
import Account from "./Account/Account";
import MobileMenu from "./Menu/MobileMenu"

function Header({ isLoggedIn}) {
  const isMobile = window.innerWidth <= 500;

  useEffect(() => {
  }, [isMobile]);

  return (
    <header>
      <img src={logo_header} className={css.logo_header} alt="Header лого" />
      <img src={logo_header_mobile} className={css.logo_header_mobile} alt="Header лого mobile" />
      <nav className={css.navMenu}>
        <Link className={css.navLink} to="/">
          Главная
        </Link>
        <Link className={css.navLink} to="/notFound">
          Тарифы
        </Link>
        <Link className={css.navLink} to="/notFound">
          FAQ
        </Link>
      </nav>
      <Account isLoggedIn={isLoggedIn} />
      {isMobile && <MobileMenu className={css.headerMenu} isLoggedIn={isLoggedIn} />}
    </header>
  );
}

export default Header;
