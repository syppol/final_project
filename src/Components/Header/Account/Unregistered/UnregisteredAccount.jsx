import React from "react";
import css from "./UnregisteredAccount.module.css";
import { Link } from "react-router-dom";

function UnregisteredAccount() {
  return (
    <div className={css.unregAccWrapper}>
      <Link className={css.signUp} to="/notFound">Зарегистрироваться</Link>
      <div className={css.line}></div>
      <Link to="/auth"><button className={css.signIn}>Войти</button></Link>
    </div>
  );
};

export default UnregisteredAccount;