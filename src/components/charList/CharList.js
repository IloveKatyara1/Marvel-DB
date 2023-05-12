import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelServices from '../../services/MarvelServices';

import './charList.scss';
import Spiner from '../spiner/Spinner';
import Error from '../errorGif/ErrorGif';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [offset, setOffset] = useState(250);
    const [charEnded, setCharEnded] = useState(false);
    const [btnLoading, setBtnLoading] = useState(true);

    const { getAllCharacterOrComics, error, loading } = useMarvelServices();
    let wasMount = false;

    useEffect(() => {
        if (!wasMount && !charList.length) {
            wasMount = true;
            addNewChar();
        }
    }, []);

    const addNewChar = async () => {
        setBtnLoading(true);

        getAllCharacterOrComics('characters', offset).then((res) => {
            setCharList((charList) => [...charList, ...res]);
            setOffset((offset) => offset + 9);
            console.log(res);
            setCharEnded(res.length < 9);
            setBtnLoading(false);
        });
    };

    let [lastActiveChar, setLastActiveChar] = useState();
    const itemsRef = useRef([]);

    const changeActiveChar = (num) => {
        itemsRef.current[num].classList.add('char__item_selected');
        if (lastActiveChar) itemsRef.current[lastActiveChar].classList.remove('char__item_selected');
        setLastActiveChar(num);
    };

    const loadingComponent = loading && !charList.length ? <Spiner /> : null;
    const errorComponent = error ? <Error /> : null;
    const charListComponent = charList.map((char, i) => (
        <li
            className="char__item"
            key={char.id}
            ref={(el) => (itemsRef.current[i] = el)}
            tabIndex={i + 8}
            onClick={() => {
                props.onChangeCharSelect(char.id);
                changeActiveChar(i);
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    changeActiveChar(i);
                    props.onChangeCharSelect(char.id);
                }
            }}>
            <img src={char.thumbnail} style={char.styleImg} alt={char.name} />
            <div className="char__name">{char.name.length >= 36 ? char.name.slice(1, 36) + '...' : char.name}</div>
        </li>
    ));

    return (
        <div className="char__list">
            <ul className="char__grid">
                {loadingComponent}
                {errorComponent}
                {charListComponent}
            </ul>
            <button
                className="button button__main button__long"
                onClick={addNewChar}
                disabled={btnLoading}
                style={{ display: charEnded ? 'none' : 'block' }}>
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

CharList.propTypes = {
    onChangeCharSelect: PropTypes.func,
};

export default CharList;
