import React from "react";
import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css"

export default function NotFoundPage() {
    return (
        <section className={css.notFoundSection}>
            <h1 className={css.notFoundTitle}>Уважаемый пользователь, <br/>данная страница сейчас находится в разработке</h1>
            <Link to="/" className={css.notFoundLink}>Вернуться на главную</Link>
        </section>
    )
}