import './charSearch.scss';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharSearch = () => {
  const { process, getCharacterByName, clearError, setProcess } = useMarvelService();
  const [data, setData] = useState(null);

  const onCharLoaded = (data) => {
    setData(data);
  };

  const updateChar = (name) => {
    clearError();
    getCharacterByName(name)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'));
  };

  const errorMessage =
    process === 'error' ? (
      <div className="message message_error">
        <ErrorMessage />
      </div>
    ) : null;

  const results = !data ? null : data.name.length > 0 ? (
    <div className="char__search-active">
      <div className="message message_active ">{`There is! Visit ${data.name} page?`}</div>
      <Link className="button button__secondary" to={`/char/${data.id}`}>
        <div className="inner">Page</div>
      </Link>
    </div>
  ) : (
    <div className="message message_error">
      The character was not found. Check the name and try again
    </div>
  );

  return (
    <div className="char__search">
      <div className="char__search-description">Or find a character by name:</div>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('This field is required'),
        })}
        onSubmit={({ name }) => {
          updateChar(name);
        }}
      >
        <Form className="char__search-form">
          <Field type="text" name="name" className="char__search-field" placeholder="Enter name" />
          <button type="submit" className="button button__main" disabled={process === 'loading'}>
            <div className="inner">Find</div>
          </button>
          <FormikErrorMessage name="name" component="div" className=" message message_error" />
        </Form>
      </Formik>
      {results}
      {errorMessage}
    </div>
  );
};

export default CharSearch;
