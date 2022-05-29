import './singleCharPage.scss';

import { Helmet } from 'react-helmet';

const SingleCharPage = ({ item }) => {
  const { name, description, thumbnail } = item;

  return (
    <div className="single-char single-page">
      <Helmet>
        <meta name="description" content={`${name} page`} />
        <title>{`${name} page`}</title>
      </Helmet>
      <img src={thumbnail} alt={name} className="single-char__img" />
      <div className="single-char__info">
        <h2 className="single-char__name">{name}</h2>
        <p className="single-char__descr">{description}</p>
      </div>
    </div>
  );
};

export default SingleCharPage;
