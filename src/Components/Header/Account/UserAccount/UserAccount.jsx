import React, { useEffect } from "react";
import css from "./UserAccount.module.css";

import avatar from './Assets/user-icon.svg'
import { Link } from "react-router-dom";

const UserAccount = (() => {
  const login = localStorage.getItem('login');

  return (
    <div className={css.signedAccountHeader}>
      <div className={css.companiesHeaderWrapper}>
        <p className={css.companiesInfo}>Использовано компаний
          <span className={css.companiesNumber}>{localStorage.getItem('usedCompany')}</span>
        </p>
        <p className={css.companiesInfo}>Лимит по компаниям
          <span className={css.companiesNumberLimit}>{localStorage.getItem('limitCompany')}</span>
        </p>
      </div>
      <div className={css.userInfoHeaderWrapper}>
        <span className={css.userName}>{login}</span>
        <button
          className={css.logout}
          onClick={() => {
            localStorage.clear();
            window.dispatchEvent(new StorageEvent("storage", {
            }));
          }}>
          <Link className={css.signOut} to="/">Выйти</Link>
        </button>
      </div>
      <img className={css.userAvatar} src={avatar} alt="User photo" />
    </div>
  );
});

export default UserAccount;