import React, { useEffect } from "react";
import css from "./Prices.module.css";
import lamp from "../Assets/lamp-tariff.svg";
import purpose from "../Assets/target-tariff.svg";
import laptop from "../Assets/laptop-tariff.svg";

function Prices({ isLoggedIn }) {
    useEffect(() => {
    }, [isLoggedIn]);
    return (
        <section className={css.pricesSection}>
            <h2 className={css.titlePrices}>Наши тарифы</h2>
            <div className={css.pricesCards}>
                <div className={isLoggedIn ? css.pricesCardBeginnerActive : css.pricesCardBeginner}>
                    <div className={css.cardHeaderBeginner}>
                        <div className={css.cardHeaderWrapper}>
                            <div className={css.cardTitle}>Beginner</div>
                            <p className={css.cardText}>Для небольшого исследования</p>
                        </div>
                        <div className={css.cardImg}>
                            <img src={lamp} alt="Lamp icon" />
                        </div>
                    </div>
                    <div className={css.cardBody}>
                        {isLoggedIn ? <div className={css.cardTag}>Текущий тариф</div>
                            : <div style={{ display: "none" }}>Текущий тариф</div>}

                        <div className={css.cardPrice}>
                            <div className={css.priceWrapper}>
                                <div className={css.currentPrice}>799 <span>&#8381;</span></div>
                                <div className={css.oldPrice}>1 200 <span>&#8381;</span></div>
                            </div>
                            <div className={css.installmentPlan}>
                                или 150 ₽/мес. при рассрочке на 24 мес.
                            </div>
                        </div>
                        <div className={css.titlePriceIncludes}>
                            В тариф входит:
                        </div>
                        <ul className={css.listPriceIncludes}>
                            <li className={css.listOption}>Безлимитная история запросов</li>
                            <li className={css.listOption}>Безопасная сделка</li>
                            <li className={css.listOption}>Поддержка 24/7</li>
                        </ul>
                    </div>
                    <div className={css.cardFooter}>
                        {isLoggedIn ? <button className={css.cardButtonLogged}>Перейти в личный кабинет</button>
                            : <button className={css.cardButtonUnlogged}>Подробнее</button>}
                    </div>
                </div>

                <div className={css.pricesCardPro}>
                    <div className={css.cardHeaderPro}>
                        <div className={css.cardHeaderWrapper}>
                            <div className={css.cardTitle}>Pro</div>
                            <p className={css.cardText}>Для HR и фрилансеров</p>
                        </div>
                        <div className={css.cardImg}>
                            <img className={css.purposeIcon} src={purpose} alt="Purpose icon" />
                        </div>
                    </div>
                    <div className={css.cardBody}>
                        <div className={css.cardPrice}>
                            <div className={css.priceWrapper}>
                                <div className={css.currentPrice}>1 299 <span>&#8381;</span></div>
                                <div className={css.oldPrice}>2 600 <span>&#8381;</span></div>
                            </div>
                            <div className={css.installmentPlan}>
                                или 279 ₽/мес. при рассрочке на 24 мес.
                            </div>
                        </div>
                        <div className={css.titlePriceIncludes}>
                            В тариф входит:
                        </div>
                        <ul className={css.listPriceIncludes}>
                            <li className={css.listOption}>Все пункты тарифа Beginner</li>
                            <li className={css.listOption}>Экспорт истории</li>
                            <li className={css.listOption}>Рекомендации по приоритетам</li>
                        </ul>
                    </div>
                    <div className={css.cardFooter}>
                        <button className={css.cardButtonUnlogged}>Подробнее</button>
                    </div>
                </div>

                <div className={css.pricesCardBusiness}>
                    <div className={css.cardHeaderBusiness}>
                        <div className={css.cardHeaderWrapper}>
                            <div className={css.cardTitleBusiness}>Business</div>
                            <p className={css.cardTextBusiness}>Для корпоративных клиентов</p>
                        </div>
                        <div className={css.cardImg}>
                            <img src={laptop} alt="Laptop icon" />
                        </div>
                    </div>
                    <div className={css.cardBody}>
                        <div className={css.cardPrice}>
                            <div className={css.priceWrapper}>
                                <div className={css.currentPrice}>2 379 <span>&#8381;</span></div>
                                <div className={css.oldPrice}>3 700 <span>&#8381;</span></div>
                            </div>
                            <div className={css.installmentPlan} style={{visibility: "hidden"}}>
                                Рассрочка не предусмотрена
                            </div>
                        </div>
                        <div className={css.titlePriceIncludes}>
                            В тариф входит:
                        </div>
                        <ul className={css.listPriceIncludes}>
                            <li className={css.listOption}>Все пункты тарифа Pro</li>
                            <li className={css.listOption}>Безлимитное количество запросов</li>
                            <li className={css.listOption}>Приоритетная поддержка</li>
                        </ul>
                    </div>
                    <div className={css.cardFooter}>
                        <button className={css.cardButtonUnlogged}>Подробнее</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Prices;