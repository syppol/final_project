import React from "react";

import css from "./Result.module.css";
import Histo from "./Content/Histo/Histo"
import Docksview from "./Content/Docs/Docsview"

import { ReactComponent as WomanWithLupaSVG } from "../../Assets/woman-with-lupa.svg";
const Result = () => {
  document.title = "Результаты поиска публикаций о компании по его ИНН — СКАН";
  const totalHistoResults = JSON.parse(localStorage.getItem('histograms'));
  const totalResults = totalHistoResults.data[0].data;
  let sum = 0;
  totalResults.map(({ value }) => sum += value);

  return (
    <>
      <section className={css.hero}>
        <div className={css.container}>
          <h1 className={css.hero__title}>Ищем. Скоро будут результаты</h1>

          <p className={css.hero__desc}>
            Поиск может занять некоторое время, <br />
            просим сохранять терпение.
          </p>
        </div>

        <WomanWithLupaSVG className={css.hero__img} />
      </section>
      <section className={css.histograms}>
        <div className={css.summaryBlock}>
          <h2 className={css.subtitleResult}>Общая сводка</h2>
          <p className={css.resultNumText}>Найдено {sum} вариантов</p>
        </div>
        <Histo />
      </section>
      <section className={css.results}>
        <div className={css.summaryBlock}>
          <h2 style={{marginBottom: '60px'}} className={css.subtitleResult}>Список документов</h2>
        </div>
        <Docksview />
      </section>
    </>
  );
};

export default Result;
