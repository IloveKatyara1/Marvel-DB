import { useState, useEffect } from 'react';

import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import SearchChar from '../searchChar/SearchChar';

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [charSelect, setCharSelect] = useState(null);

    const onChangeCharSelect = (id) => setCharSelect(id);

    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onChangeCharSelect={onChangeCharSelect} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo charSelect={charSelect} />
                    </ErrorBoundary>
                    <SearchChar />
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
};

export default MainPage;
