import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';

const SinglePage = ({ BaseComponent, urlData }) => {
  const params = useParams();
  const [data, setData] = useState(null);

  const { getComic, getCharacter, clearError, process, setProcess } = useMarvelService();

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params[urlData]]);

  const updateData = () => {
    clearError();
    if (urlData === 'comicId') {
      getComic(params[urlData])
        .then(onDataLoaded)
        .then(() => setProcess('confirmed'));
    } else if (urlData === 'charId') {
      getCharacter(params[urlData])
        .then(onDataLoaded)
        .then(() => setProcess('confirmed'));
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  return (
    <>
      <AppBanner />
      {setContent(process, BaseComponent, data)}
    </>
  );
};

export default SinglePage;
