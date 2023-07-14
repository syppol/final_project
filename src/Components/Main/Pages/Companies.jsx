import React from "react";
import css from './Companies.module.css'
import Search from '../Search/Search'

import rocketMan from "../Assets/man-with-rocket.svg";
import docImg from "../Assets/Document.svg";
import foldersImg from "../Assets/Folders.svg";


const GetCompaniesInfo = () => {
  document.title = "Найти публикации о компании по ее ИНН — СКАН";

  return (
    <section className={css.companiesSearchForm}>
      <div className={css.searchLeftPart}>
        <div className={css.docImg}>
          <img src={docImg} alt="Документ" />
        </div>
        <div className={css.foldersImg}>
          <img src={foldersImg} alt="Папки" />
        </div>
        <div className={css.searchTextPart}>
          <h1 className={css.searchTitle}>
            Найдите необходимые данные в пару кликов.
          </h1>
          <p className={css.searchText}>
            Задайте параметры поиска. <br />
            Чем больше заполните, тем точнее поиск
          </p>
        </div>

        <Search className={css.searchForm} />
      </div>
      <div className={css.searchRightPart}>
        <img src={rocketMan} alt="Мужчина изобретает ракету"></img>
      </div>
    </section>
  );
};

export default GetCompaniesInfo;