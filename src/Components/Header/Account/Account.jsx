import React, { useEffect } from "react";
import css from "./Account.module.css";
import UnregisteredAccount from "./Unregistered/UnregisteredAccount";
import UserAccount from "./UserAccount/UserAccount";

function Account({ isLoggedIn }) {
  useEffect(() => {
  }, [isLoggedIn]);
  return (
    <div className={css.accountWrapper}>
      {isLoggedIn ? (
        <UserAccount />
      ) : (
        <UnregisteredAccount />
      )}
    </div>
  );
}

export default Account;
