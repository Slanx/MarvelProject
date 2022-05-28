import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';

import './singlePage.scss';

const SinglePage = ({ BaseComponent, urlData }) => {
  const params = useParams();
  const [item, setItem] = useState(null);

  const { loading, error, getComic, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateData();
  }, [params[urlData]]);

  const updateData = () => {
    clearError();
    if (urlData === 'comicId') {
      getComic(params[urlData]).then(onItemLoaded);
    } else if (urlData === 'charId') {
      console.log(params[urlData]);
      getCharacter(params[urlData]).then(onItemLoaded);
    }
  };

  const onItemLoaded = (item) => {
    setItem(item);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !item) ? <BaseComponent item={item} /> : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

export default SinglePage;
