import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import css from "./MainInfo.module.css";
import mainInfoImg from "../Assets/main-info-img2.svg";
import mainInfoImgMobile from "../Assets/main-info-img-mobile.svg";

function MainInfo({isLoggedIn}) {
    const isMobile = window.innerWidth <= 500;

    useEffect(() => {
    }, [isMobile]);

    useEffect(() => {
    }, [isLoggedIn]);
    return (
        <section className={css.mainInfoSection}>
            <div className={css.mainInfoWrapper}>
                <div className={css.infoRightSection}>
                    <h1 className={css.mainTitle}>
                        Cервис по поиску <br />публикаций <br />о компании <br />по его ИНН
                    </h1>
                    <p className={css.mainText}>
                        Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
                    </p>
                    {<Link to= {isLoggedIn ? "/search": "/auth"} ><button className={css.mainButton}> {isLoggedIn ? "Запросить данные" : "Войти"} </button> </Link>}
                </div>
                <div className={css.imgLeftMain}>
                    {isMobile ? <img className={css.mainInfoImgMobile} src={mainInfoImgMobile} alt="Мужчина запрашивает данные" /> : 
                    <img className={css.mainInfoImg} src={mainInfoImg} alt="Мужчина запрашивает данные" />}
                </div>
            </div>
        </section>
    );
}

export default MainInfo;