import { createContext, lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spiner/Spinner';

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const Error404 = lazy(() => import('../pages/Error404'));
const SingleComicPage = lazy(() => import('../pages/singleComicPage/SingleComicPage'));

export const charListContext = createContext();
export const comicsListContext = createContext();

const App = () => {
    const [comicsList, setComicsList] = useState([]);
    const [charList, setCharList] = useState([]);

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
                                    <charListContext.Provider value={{ charList, setCharList }}>
                                        <MainPage />
                                    </charListContext.Provider>
                                }
                            />
                            <Route
                                path="/comics"
                                element={
                                    <comicsListContext.Provider value={{ comicsList, setComicsList }}>
                                        <ComicsPage />
                                    </comicsListContext.Provider>
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
