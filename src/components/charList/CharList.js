import React, { useState, useRef, useEffect, useContext } from 'react';

import PropTypes from 'prop-types';

import useMarvelServices from '../../services/MarvelServices';
import { setComponentForList } from '../../utils/setComponent';

import SingleChar from './SingleChar';

import './charList.scss';

import { charListContext } from '../app/App';

const CharList = ({ onChangeCharSelect }) => {
    const { setCharList, charList } = useContext(charListContext);

    const [charEnded, setCharEnded] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [offset, setOffset] = useState(250 + charList.length);

    const itemsRef = useRef([]);

    const [charListComponent, setCharListComponent] = useState([...charList]);

    const { getAllCharacterOrComics, setState, state } = useMarvelServices();
    let wasMount = false;

    useEffect(() => {
        if (!wasMount && !charList.length) {
            wasMount = true;
            addNewChar();
        }
    }, []);

    const addNewChar = async () => {
        setBtnLoading(true);

        getAllCharacterOrComics('characters', offset)
            .then((res) => {
                setOffset((offset) => offset + 9);
                setCharEnded(res.length < 9);
                setBtnLoading(false);

                const newChars = res.map((char, i) => (
                    <SingleChar
                        charListComponent={charListComponent}
                        itemsRef={itemsRef}
                        char={char}
                        i={i}
                        onChangeCharSelect={onChangeCharSelect}
                        changeActiveChar={changeActiveChar}
                        key={char.id}
                    />
                ));

                setCharList((charList) => [
                    ...charList,
                    ...res.map((char, i) => (
                        <SingleChar
                            charListComponent={charListComponent}
                            itemsRef={itemsRef}
                            char={char}
                            i={i}
                            onChangeCharSelect={onChangeCharSelect}
                            changeActiveChar={changeActiveChar}
                            key={char.id}
                            whithoutEffect={true}
                        />
                    )),
                ]);
                setCharListComponent((charListComponent) => [...charListComponent, ...newChars]);
            })
            .then(() => setState('success'));
    };

    const changeActiveChar = (num) => {
        itemsRef.current.forEach((el) => el.classList.remove('char__item_selected'));
        itemsRef.current[num].classList.add('char__item_selected');
    };

    return (
        <div className="char__list">
            <ul className="char__grid">{setComponentForList(state, charListComponent)}</ul>
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
