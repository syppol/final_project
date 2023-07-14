import React from "react";
import classNames from "classnames/bind";

import   css from './Button.module.css';


const cx = classNames.bind(  css);

const openInNewTab = (url) => {
  window.open(url, "_blank", "noreferrer");
};

const Button = ({
  color,
  size,
  disabled,
  isLoading,
  href,
  type,
  className,
  children,
  onClick,
  newWindow,
}) => {
  const buttonClass = cx({
    button: true,
    [color]: color,
    [size]: size,
    [className]: className,
  });

  const ButtonTag = Boolean(href) ? "a" : "button";
  const buttonType = Boolean(type) ? { type } : {};

  const handleOnBlankClick = (e) => {
    e.preventDefault();

    openInNewTab(href);
  };

  return (
    <ButtonTag
      className={buttonClass}
      href={href}
      disabled={disabled}
      {...buttonType}
      onClick={newWindow ? handleOnBlankClick : onClick}
    >
      {children}
    </ButtonTag>
  );
};

export default Button;
