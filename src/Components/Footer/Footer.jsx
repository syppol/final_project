import React from "react";
import css from "./Footer.module.css";
import logo_footer from "./Assets/logo_footer.svg";
import logo_footer_mobile from "./Assets/logo_footer_mobile.svg";

function Footer() {
    return (
        <footer>
            <div className={css.logoWrapper}>
                <img className={css.logo_footer} src={logo_footer} alt="Лого СКАН для footer"></img>
                <img className={css.logo_footer_mobile}src={logo_footer_mobile} alt="Лого СКАН для footer"></img>
            </div>
            <div className={css.footerInfoWrapper}>
                <div className={css.contactInfo}>
                    <p>г. Москва, Цветной б-р, 40</p>
                    <p>+7 495 771 21 11</p>
                    <p>info@skan.ru</p>
                </div>
                <p className={css.rights}>Copyright. 2022</p>
            </div>
        </footer>
    )
}

export default Footer;