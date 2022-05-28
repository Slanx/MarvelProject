import './charSearch.scss';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import useMarvelService from '../../services/MarvelService';

const CharSearch = () => {
  const { error, getCharacterByName, clearError } = useMarvelService();
  const [char, setChar] = useState(null);

  return (
    <div className="char__search">
      <div className="char__search-description">Or find a character by name:</div>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('This field is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          clearError();
          getCharacterByName(values.name).then(setChar);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="char__search-form">
            <Field
              type="text"
              name="name"
              className="char__search-field"
              placeholder="Enter name"
            />
            <button type="submit" className="button button__main" disabled={isSubmitting}>
              <div className="inner">Find</div>
            </button>
            <ErrorMessage name="name" component="div" className=" message message_error" />
          </Form>
        )}
      </Formik>
      {char ? (
        <div className="char__search-active">
          <div className="message message_active ">{`There is! Visit ${char.name} page?`}</div>
          <Link className="button button__secondary" to={`/char/${char.id}`}>
            <div className="inner">Page</div>
          </Link>
        </div>
      ) : null}
      {error ? (
        <div className="message message_error">
          The character was not found. Check the name and try again
        </div>
      ) : null}
    </div>
  );
};

export default CharSearch;
