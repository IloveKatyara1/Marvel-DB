import { useState, useEffect } from 'react';

import useMarvelServices from '../../services/MarvelServices';
import { setComponent } from '../../utils/setComponent';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = (props) => {
    const [char, setChar] = useState({});

    useEffect(() => getDataForRndChar(), []);

    const { getOneElement, state, setState, resetError } = useMarvelServices();

    const getDataForRndChar = () => {
        getOneElement(Math.floor(Math.random() * (1011400 - 1011000) + 1011000))
            .then(setChar)
            .then(() => setState('success'));
    };

    return (
        <div className="randomchar">
            {setComponent(state, () => (
                <View char={char} />
            ))}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!
                    <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button
                    className="button button__main"
                    onClick={() => {
                        resetError();
                        getDataForRndChar();
                    }}
                    tabIndex={5}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    );
};

const View = ({ char }) => {
    return (
        <div className="randomchar__block">
            <img src={char.thumbnail} style={char.styleImg} alt={char.name} className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{char.name}</p>
                <p className="randomchar__descr">{char.descr}</p>
                <div className="randomchar__btns">
                    <a href={char.detail} className="button button__main" tabIndex={3}>
                        <div className="inner">homepage</div>
                    </a>
                    <a href={char.wiki} className="button button__secondary" tabIndex={4}>
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;
