import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './singleComicPage.scss';

const SingleComicPage = ({ item }) => {
  const { title, description, pageCount, thumbnail, language, price } = item;

  return (
    <div className="single-comic single-page">
      <Helmet>
        <meta name="description" content={`${title} comics book`} />
        <title>{title}</title>
      </Helmet>
      <img src={thumbnail} alt={title} className="single-comic__img single-img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name single-name">{title}</h2>
        <p className="single-comic__descr single-descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back single-back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
