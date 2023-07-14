import React, { useState, useEffect } from "react";
import css from "./MobileMenu.module.css";
import { Link } from "react-router-dom";
import scan from '../../Footer/Assets/logo_footer_mobile.svg';
import mobileCloseButton from "../Assets/close_button_mobile.svg";
import avatar from "../../Main/Assets/user-icon-mobile.svg";

function MobileMenu({ isLoggedIn }) {

    const [isOpened, setIsOpened] = useState(false);
    const login = isLoggedIn ? localStorage.getItem('login') : '';
    const isMobile = window.innerWidth <= 500;

    useEffect(() => {
    }, [isMobile]);

    return (
        <div className={css.mobileOpenedBurgerMenu} onClick={() => setIsOpened(true)}>
            {isOpened ? (
                <div className={css.burgerMenuWrapper}>
                    <div className={css.burgerMenuHeader}>
                        <img className={css.burgerMenuLogo} src={scan} alt="" />
                        <button
                            className={css.closeButtonMobileMenu}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpened(false);
                            }}>
                            <img src={mobileCloseButton} alt="Close button in mobile version"></img>
                        </button>
                    </div>
                    <nav className={css.mobileMenuNav}>
                        <Link className={css.mobileMenuNavOption}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpened(false);
                            }} to="/">Главная</Link>
                        <Link className={css.mobileMenuNavOption}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpened(false);
                            }}
                            to="/notFound">Тарифы</Link>
                        <Link className={css.mobileMenuNavOption}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpened(false);
                            }}
                            to="/notFound">FAQ</Link>
                    </nav>

                    {isLoggedIn ?
                        <div className={css.mobileUserInfo}>
                            <span className={css.mobileUserName}>{login}</span>
                            <img className={css.mobileUserAvatar} src={avatar} alt="User photo" />
                            <button
                                className={css.logout}
                                onClick={() => {
                                    localStorage.clear();
                                    window.dispatchEvent(new StorageEvent("storage", {
                                    }));
                                }}>
                                <Link className={css.signOut}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpened(false);
                                        localStorage.clear();
                                        window.dispatchEvent(new StorageEvent("storage", {
                                        }));
                                    }}
                                    to="/">Выйти</Link>
                            </button>
                        </div>
                        :
                        <div className={css.mobileUserUnreg}>
                            <Link className={css.mobileUserSignUp}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpened(false);
                                }}
                                to="/notFound">Зарегистрироваться</Link>
                            <Link className={css.mobileUserSignIn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpened(false);
                                }}
                                to="/auth">Войти</Link>
                        </div>}
                </div>) : (<></>)}

        </div>
    )
}

export default MobileMenu;