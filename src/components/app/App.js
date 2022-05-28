import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SinglePageWithComic = lazy(() => import('../pages/SinglePages/SingleComicPage.js'));
const SinglePageWithChar = lazy(() => import('../pages/SinglePages/SingleCharPage.js'));
const SinglePage = lazy(() => import('../pages/SinglePage'));

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <div className="app">
          <AppHeader />
          <main>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route
                path="/comics/:comicId"
                element={<SinglePage BaseComponent={SinglePageWithComic} urlData={'comicId'} />}
              />
              <Route
                path="/char/:charId"
                element={<SinglePage BaseComponent={SinglePageWithChar} urlData={'charId'} />}
              />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Suspense>
  );
};

export default App;
