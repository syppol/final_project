import React, { useRef } from "react";
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import login from "../../../Functions/login";
import css from "./LoginPage.module.css";
import lock from "../Assets/lock.svg";

const LoginPage = () => {

  const errorForm = useRef(false)
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Обязательное поле').test('name', 'Введите корректные данные', (value) => {
      const isPhoneNumberValid = /^\+?[0-9]{1,3}-[0-9()+\-.\s]{8,}$/.test(value);
      const isUsernameValid = /^[a-zA-Z0-9_]+$/.test(value);
      return isPhoneNumberValid || isUsernameValid;
    }),
    password: Yup.string().required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await login(values.name, values.password);
      errorForm.current = !!!localStorage.getItem('accessToken');
      if (!errorForm.current) window.location.href = "/";

    },
  });

  return (
    <form className={css.loginForm} onSubmit={formik.handleSubmit}>
      <img className={css.lockImg} src={lock} alt="Замок" />
      <div className={css.tabs}>
        <button className={css.formActive}><Link to= "/auth">Войти</Link></button>
        <button className={css.formInactive}><Link to= "/notFound">Зарегистрироваться</Link></button>
      </div>
      <div className={css.formField}>
        <label htmlFor="name" className={css.formLabel}>Логин или номер телефона:</label>
        <input
          id="name"
          name="name"
          type="text"
          className={(formik.touched.name && formik.errors.name) ? css.errorField : css.input}
          {...formik.getFieldProps('name')}
        />
        {formik.touched.name && formik.errors.name && <div className={css.errorMessage}>{formik.errors.name}</div>}
      </div>
      <div className={css.formField}>
        <label htmlFor="password_auth" className={css.formLabel}>Пароль:</label>
        <input
          id="password_auth"
          name="password"
          type="password"
          className={errorForm.current ? css.errorField : css.input}
          {...formik.getFieldProps('password')}
        />
        {errorForm.current && <div className={css.errorMessage}>Неверный пароль</div>}
        {formik.touched.password && formik.errors.password && <div className={css.errorMessage}>{formik.errors.password}</div>}
      </div>
      <div className={css.submitWrapper}>
        <button
          className={!formik.isValid || formik.isSubmitting ? css.btnAuthSubmitInactive : css.btnAuthSubmit}
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Войти
        </button>
        <Link className={css.repairPsw} to= "/notFound">Восстановить пароль</Link>
      </div>
      <div className={css.formSMWrapper}>
        <div className={css.formSMText}>Войти через:</div>
        <a href="" className={css.google}></a>
        <a href="" className={css.facebook}></a>
        <a href="" className={css.yandex}></a>
      </div>
    </form>
  );
}

export default LoginPage;
