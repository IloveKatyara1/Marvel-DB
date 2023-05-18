import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spiner/Spinner';

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const Error404 = lazy(() => import('../pages/Error404'));
const SingleComicPage = lazy(() => import('../pages/singleComicPage/SingleComicPage'));

const App = () => {
    const [comicsList, setComicsList] = useState([]);
    const [charList, setCharList] = useState([]);
    const [offsetComics, setOffsetComics] = useState(120);
    const [offsetChars, setOffsetChars] = useState(250);

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <MainPage
                                        charList={charList}
                                        setCharList={setCharList}
                                        offset={offsetChars}
                                        setOffset={setOffsetChars}
                                    />
                                }
                            />
                            <Route
                                path="/comics"
                                element={
                                    <ComicsPage
                                        comicsList={comicsList}
                                        setComicsList={setComicsList}
                                        offset={offsetComics}
                                        setOffset={setOffsetComics}
                                    />
                                }
                            />
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
