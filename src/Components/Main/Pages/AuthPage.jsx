import React, { useState } from "react";
import LoginPage from "./LoginPage";
import css from "./AuthPage.module.css";
import key from "../Assets/key.svg";

function AuthPage() {

  return (
    <section className={css.auth}>
      <div className={css.authWrapper}>
        <h1 className={css.authTitle}>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
        <img className={css.authImg} src={key} alt="key" />
      </div>
      <div className={css.authInner}>
        <LoginPage />
      </div>
    </section>
  );
}

export default AuthPage;
