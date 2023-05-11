import { useState } from 'react';

import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [charSelect, setCharSelect] = useState(null);

    const onChangeCharSelect = (id) => setCharSelect(id);

    return (
        <div className="app">
            <AppHeader />
            <main>
                <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onChangeCharSelect={onChangeCharSelect} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charSelect={charSelect} />
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    );
};

export default App;
