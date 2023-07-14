import React, { useRef } from 'react';
import { ReactComponent as LeftArrow } from '../../../../Assets/arrow-left.svg';
import { ReactComponent as RightArrow } from '../../../../Assets/arrow-right.svg';
import css from './Histo.module.css';

const Histo = () => {

  const carouselRef = useRef(null);
  const histogramData = JSON.parse(localStorage.getItem('histograms'));

  if (!histogramData.data || histogramData.data.length === 0) {
    return <div className={css.noDataMessage}>НИЧЕГО НЕ НАЙДЕНО</div>;
  }

  const dates = histogramData.data[0].data.map(({ date }) => new Date(date).toLocaleDateString());
  const totalDocuments = histogramData.data[0].data.map(({ value }) => value);
  const riskFactors = histogramData.data[1].data.map(({ value }) => value);

  const handleScrollLeft = () => {
    carouselRef.current.scrollLeft -= 100;
  };

  const handleScrollRight = () => {
    carouselRef.current.scrollLeft += 100;
  };

  return (
    <div className={css.tableWrapper}>
      <div className={css.scrollButtonLeft} onClick={handleScrollLeft}>
        <LeftArrow />
      </div>
      <div className={css.carouselContainer} ref={carouselRef}>
        <table className={css.table}>
          <thead>
            <tr>
              <th>Период</th>
              {dates.map((date, index) => (
                <th key={index}>{date}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{'Всего'}</td>
              {totalDocuments.map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
            <tr>
              <td>Риски</td>
              {riskFactors.map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className={css.scrollButtonRight} onClick={handleScrollRight}>
        <RightArrow />
      </div>
    </div>
  );
};

export default Histo;
