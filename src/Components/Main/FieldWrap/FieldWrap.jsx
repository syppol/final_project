import React from "react";
import classNames from "classnames";

import css from "./FieldWrap.module.css";

const FieldWrap = ({ className, options, children }) => {
  const { label, field, meta } = options;
  const hasError = meta.touched && meta.error;

  const groupClass = classNames(css.fieldWrap, className, {
    [`${css.error}`]: hasError,
  });

  return (
    <div className={groupClass}>
      <label className={css.label} htmlFor={field.id || field.name}>
        {label}
      </label>

      {children}

      {hasError && <div className={css.message}>{meta.error}</div>}
    </div>
  );
};

export default FieldWrap;
