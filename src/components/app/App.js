import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spiner/Spinner';

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const Error404 = lazy(() => import('../pages/Error404'));
const SingleComicPage = lazy(() => import('../pages/singleComicPage/SingleComicPage'));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/comics" element={<ComicsPage />} />
                            <Route path="/comics/:comicId" element={<SingleComicPage />} />
                            <Route path="*" element={<Error404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
};

export default App;
