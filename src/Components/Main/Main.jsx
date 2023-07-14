import React, {useEffect} from "react";
import css from "./Main.module.css";

import MainInfo from "./Main_Info/MainInfo";
import Advantages from "./Advantages/Advantages";
import Prices from "./Prices/Prices";
import image from "./Assets/main-img.svg";
import imageMobile from "../Main/Assets/main-img-mobile.svg";

function Main({ isLoggedIn, isMobile }) {

    useEffect(() => {
    }, [isMobile]);

    return (
        <main>
            <MainInfo isLoggedIn={isLoggedIn} />
            <Advantages />
            <div className={css.mainImg}>
                {isMobile ? <img src={imageMobile} alt="Поиск оптимального решения"></img> : 
                <img src={image} alt="Поиск оптимального решения"></img>}
            </div>
            <Prices isLoggedIn={isLoggedIn}/>
        </main>
    )
}

export default Main;