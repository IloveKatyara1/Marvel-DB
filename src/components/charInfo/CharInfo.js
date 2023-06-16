import { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

import useMarvelServices from '../../services/MarvelServices';
import { setComponent } from '../../utils/setComponent';

import './charInfo.scss';

const CharInfo = memo((props) => {
    const [char, setChar] = useState(null);
    const [loadedComics, setLoadedComics] = useState(false);

    const { getOneElement, state, setState } = useMarvelServices();

    const getCharData = () => {
        if (!props.charSelect) return;

        getOneElement(props.charSelect)
            .then((char) => setChar(char))
            .then(() => setState('success'));
    };

    useEffect(() => {
        getCharData();
    }, [props.charSelect]);

    const toogleLoadedComics = () => setLoadedComics((loadedComics) => !loadedComics);

    return (
        <div className="char__info">
            {setComponent(
                state,
                () => (
                    <Component char={char} loadedComics={loadedComics} toogleLoadedComics={toogleLoadedComics} />
                ),
                'charInfo'
            )}
        </div>
    );
});

const Component = ({ char, loadedComics, toogleLoadedComics }) => {
    return (
        <>
            <div className="char__basics">
                <img src={char.thumbnail} style={char.styleImg} alt={char.name} />
                <div>
                    <div className="char__info-name">{char.name}</div>
                    <div className="char__btns">
                        <a href={char.detail} className="button button__main" tabIndex={6}>
                            <div className="inner">homepage</div>
                        </a>
                        <a href={char.wiki} className="button button__secondary" tabIndex={7}>
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{char.descr}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {char.comics.map((item, i) => {
                    // eslint-disable-next-line
                    if (i >= 10 && !loadedComics) return;

                    return (
                        <li className="char__comics-item" key={i}>
                            {item.name}
                        </li>
                    );
                })}
                {char.comics.length >= 10 && (
                    <button onClick={toogleLoadedComics} className="load_more" tabIndex={8}>
                        {!loadedComics ? 'show more...' : 'hide'}
                    </button>
                )}
                {char.comics.length === 0 && <h3>here is no comics</h3>}
            </ul>
        </>
    );
};

CharInfo.propTypes = {
    charSelect: PropTypes.number,
};

export default CharInfo;
