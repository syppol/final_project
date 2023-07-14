import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { formatISO } from "date-fns/fp";
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './Search.module.css'
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const Search = ({ className }) => {
  const navigate = useNavigate();

  const initialValues = {
    inn: '7710137066',
    tonality: 'any',
    similarMode: "duplicates",
    limit: '5',
    sortType: "sourceInfluence",
    sortDirectionType: "desc ",
    maxFullness: false,
    inBusinessNews: false,
    onlyMainRole: false,
    onlyWithRiskFactors: false,
    includeTechNews: false,
    includeAnnouncements: false,
    includeDigests: false,
    startDate: new Date(),
    endDate: new Date(),
  };

  const validationSchema = Yup.object().shape({
    inn: Yup.string()
      .required('Обязательное поле')
      .matches(/^[0-9]+$/, "ИНН может содержать только цифры")
      .test('len', 'Должно быть 10 или 16 цифр', val => val.length === 10 || val.length === 16),
    limit: Yup.number()
      .required('Обязательное поле')
      .min(1, 'Минимальное значение 1')
      .max(1000, 'Максимальное значение 1000'),
    startDate: Yup.date()
      .required('Обязательное поле')
      .max(Yup.ref('endDate'), 'Дата начала не может быть позже даты окончания')
      .max(new Date(), 'Дата начала не может быть в будущем')
      .test('startDate', 'Дата окончания должна быть позже даты начала', function (value) {
        const { endDate } = this.parent;
        return endDate ? value <= endDate : true;
      }),
    endDate: Yup.date()
      .required('Обязательное поле')
      .min(Yup.ref('startDate'), 'Дата окончания не может быть раньше даты начала')
      .max(new Date(), 'Дата окончания не может быть в будущем'),
  });

  const handleOnSubmit = async (values, { setSubmitting }) => {
    try {
      let token = localStorage.getItem('accessToken');
      const request = {
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"],
        issueDateInterval: {
          startDate: formatISO(new Date(values.startDate)),
          endDate: formatISO(new Date(values.endDate)),
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [
              {
                type: "company",
                inn: values.inn,
                maxFullness: values.maxFullness === "true",
                inBusinessNews: values.inBusinessNews === "true" ? true : null,
              },
            ],
            onlyMainRole: values.onlyMainRole === "true",
            tonality: "any",
            onlyWithRiskFactors: values.onlyWithRiskFactors === "true",
          },
        },
        similarMode: "duplicates",
        limit: parseInt(values.limit),
        sortType: "sourceInfluence",
        sortDirectionType: "desc",
        attributeFilters: {
          excludeTechNews: values.includeTechNews === "false",
          excludeAnnouncements: values.includeAnnouncements === "false",
          excludeDigests: values.includeDigests === "false",
        },
      };
      let histoData, docsData, objectsData = [];

      const objects = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });

      if (objects.ok) {
        console.log('Objects submitted successfully');
        objectsData = await objects.json();
        localStorage.setItem('objects', JSON.stringify(objectsData))
      } else {
        console.log('Objects submission failed');
      }

      const histo = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });

      if (histo.ok) {
        console.log('Histo submitted successfully');
        histoData = await histo.json();
        localStorage.setItem('histograms', JSON.stringify(histoData))
      } else {
        console.log('Histo submission failed');
      }

      let requestDocs = {
        ids: []
      };

      objectsData.items.forEach(item => {
        requestDocs.ids.push(item.encodedId);
      });

      const docs = await fetch('https://gateway.scan-interfax.ru/api/v1/documents', {
        method: 'POST',
        body: JSON.stringify(requestDocs),
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });

      if (docs.ok) {
        console.log('Docs submitted successfully');
        docsData = await docs.json();
        localStorage.setItem('docs', JSON.stringify(docsData))
        console.log(docsData);
      } else {
        console.log('Docs submission failed');
      }
      navigate('/search/result');
    } catch (error) {
      console.error('An error occurred during histo submission:', error);
    }

    setSubmitting(false);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={validationSchema}>
      {({ dirty, isValid, isSubmitting, values, setFieldValue, handleChange, errors, touched }) => (
        <Form className={css.form}>
          <div className={css.searchLeftPartForm}>
            <div className={css.searchOptionBlock}>
              <label className={css.searchFormLabel} htmlFor="inn">ИНН компании *</label>
              <div>
                <Field
                  type="text"
                  id="inn"
                  name="inn"
                  placeholder="10 цифр"
                  value={values.inn}
                  onChange={handleChange}
                  className={errors.inn ? css.errorField : css.searchFormField}
                />
              </div>
              <ErrorMessage name="inn" component="div" className={css.errorMessage} />
            </div>
            <div className={css.searchOptionBlock}>
              <label className={css.searchFormLabel} htmlFor="tonality">Тональность: *</label>
              <Field name="tonality" as="select" className={css.select}>
                <option value="any" className={css.selectOption}>Любая</option>
                <option value="positive" className={css.selectOption}>Позитивная</option>
                <option value="negative" className={css.selectOption}>Негативная</option>
              </Field>
            </div>
            <div className={css.searchOptionBlock}>
              <label className={css.searchFormLabel} htmlFor="limit">Количество документов в выдаче *</label>
              <div>
                <Field type="text" id="limit" name="limit" placeholder="От 1 до 1000" value={values.limit} onChange={handleChange} className={errors.limit ? css.errorField : css.searchFormField} />
              </div>
              <ErrorMessage name="limit" component="div" className={css.errorMessage} />
            </div>
            <div className={css.searchOptionBlock}>
              <label className={css.searchFormLabel} htmlFor="startDate">Диапазон поиска *</label>
              <div className={css.dateFieldsBlock}>
                <div className={css.dateWrapper}>
                  <Field name="startDate">
                    {({ field, form }) => (
                      <div>
                        <DatePicker
                          id="startDate"
                          {...field}
                          selected={values.startDate}
                          onChange={(date) => setFieldValue('startDate', date)}
                          dateFormat="dd.MM.yyyy"
                          placeholderText="Выберите дату начала"
                          className={form.errors.startDate ? css.errorField : css.searchDateStart}
                        />
                        {form.errors.startDate && (
                          <div className={css.errorMessage}>{form.errors.startDate}</div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div className={css.dateWrapper}>
                  <Field name="endDate">
                    {({ field, form }) => (
                      <div>
                        <DatePicker
                          id="endDate"
                          {...field}
                          selected={values.endDate}
                          onChange={(date) => setFieldValue('endDate', date)}
                          dateFormat="dd.MM.yyyy"
                          placeholderText="Выберите дату окончания"
                          className={form.errors.endDate && form.touched.endDate ? css.errorField : css.searchDateEnd}
                        />
                        {form.errors.endDate && form.touched.endDate && (
                          <div className={css.errorMessage}>{form.errors.endDate}</div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
              </div>
            </div>
          </div>
          <div className={css.searchRightPartForm}>
            <div className={css.searchAddOptionsWrapper}>
              <div className={css.searchAddOptionsBlock}>
                <input type="checkbox" id="maxFullness" name="maxFullness" checked={values.maxFullness} onChange={() => setFieldValue('maxFullness', !values.maxFullness)} />
                <label className={css.searchFormLabel} htmlFor="maxFullness">Признак максимальной полноты</label>
              </div>
              <div className={css.searchAddOptionsBlock}>
                <input type="checkbox" id="inBusinessNews" name="inBusinessNews" checked={values.inBusinessNews} onChange={() => setFieldValue('inBusinessNews', !values.inBusinessNews)} />
                <label className={css.searchFormLabel} htmlFor="inBusinessNews">Упоминания в бизнес-контексте</label>
              </div>
              <div className={css.searchAddOptionsBlock}>
                <input type="checkbox" id="onlyMainRole" name="onlyMainRole" checked={values.onlyMainRole} onChange={() => setFieldValue('onlyMainRole', !values.onlyMainRole)} />
                <label className={css.searchFormLabel} htmlFor="onlyMainRole">Главная роль в публикации</label>
              </div>
              <div className={css.searchAddOptionsBlock}>
                <input type="checkbox" id="onlyWithRiskFactors" name="onlyWithRiskFactors" checked={values.onlyWithRiskFactors} onChange={() => setFieldValue('onlyWithRiskFactors', !values.onlyWithRiskFactors)} />
                <label className={css.searchFormLabel} htmlFor="onlyWithRiskFactors">Публикации только с риск-факторами</label>
              </div>
              <div className={css.searchAddOptionsBlock}>
                <input type="checkbox" id="includeTechNews" name="includeTechNews" checked={values.includeTechNews} onChange={() => setFieldValue('includeTechNews', !values.includeTechNews)} />
                <label className={css.searchFormLabel} htmlFor="includeTechNews">Включать технические новости рынков</label>
              </div>
              <div className={css.searchAddOptionsBlock}>
                <input type="checkbox" id="includeAnnouncements" name="includeAnnouncements" checked={values.includeAnnouncements} onChange={() => setFieldValue('includeAnnouncements', !values.includeAnnouncements)} />
                <label className={css.searchFormLabel} htmlFor="includeAnnouncements">Включать анонсы и календари</label>
              </div>
              <div className={css.searchAddOptionsBlock}>
                <input type="checkbox" id="includeDigests" name="includeDigests" checked={values.includeDigests} onChange={() => setFieldValue('includeDigests', !values.includeDigests)} />
                <label className={css.searchFormLabel} htmlFor="includeDigests">Включать сводки новостей</label>
              </div>
            </div>
            <div className={css.searchButtonWrapper}>
              <Button className={css.searchButton} type="submit" color="primary" disabled={!dirty || !isValid || isSubmitting}>Поиск</Button>
              <p className={css.promptMessage}>* Обязательные к заполнению поля</p>
            </div>
          </div>

        </Form>
      )}
    </Formik>
  );
};

export default Search;