import React from "react";
import css from "./Advantages.module.css";
import CustomSlider from "../Slider/Slider";
import clock from "../Assets/clock-advantages.svg";
import magnifier from "../Assets/magnifier-advantages.svg";
import shield from "../Assets/shield-advantages.svg";

function Advantages() {

    const data = [
        {
            img: clock,
            text: "Высокая и оперативная скорость обработки заявки"
        },

        {
            img: magnifier,
            text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос"
        },

        {
            img: shield,
            text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству"
        },

        {
            img: clock,
            text: "Высокая и оперативная скорость обработки заявки"
        }
    ]

    return (
        <section className={css.advantages}>
            <h2 className={css.titleAdvantages}>Почему именно мы</h2>
            <CustomSlider slides={data}/>
        </section>
    );
};

export default Advantages;