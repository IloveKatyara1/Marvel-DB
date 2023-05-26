import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelServices from '../../services/MarvelServices';

import './charList.scss';
import Spiner from '../spiner/Spinner';
import Error from '../errorGif/ErrorGif';
import { charListContext } from '../app/App';

const CharList = ({ onChangeCharSelect }) => {
    const { setCharList, charList } = useContext(charListContext);

    const [charEnded, setCharEnded] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [offset, setOffset] = useState(250 + charList.length);

    const itemsRef = useRef([]);

    const [charListComponent, setCharListComponent] = useState(
        charList.map((char, i) => (
            <li
                className="char__item"
                key={char.id}
                ref={(el) => (itemsRef.current[i] = el)}
                tabIndex={i + 8}
                onClick={() => {
                    onChangeCharSelect(char.id);
                    changeActiveChar(i);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        changeActiveChar(i);
                        onChangeCharSelect(char.id);
                    }
                }}>
                <img src={char.thumbnail} style={char.styleImg} alt={char.name} />
                <div className="char__name">{char.name.length >= 36 ? char.name.slice(1, 36) + '...' : char.name}</div>
            </li>
        ))
    );

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
            setCharEnded(res.length < 9);
            setBtnLoading(false);
            res.forEach((char, i) =>
                setTimeout(() => {
                    setCharListComponent((prevCharListComponent) => {
                        const updatedListComponent = [...prevCharListComponent];
                        updatedListComponent.push(
                            <CSSTransition timeout={500} classNames="char__item" key={char.id} in={true}>
                                <li
                                    className="char__item"
                                    key={char.id}
                                    ref={(el) => (itemsRef.current[prevCharListComponent.length] = el)}
                                    tabIndex={prevCharListComponent.length + 8}
                                    onClick={() => {
                                        onChangeCharSelect(char.id);
                                        changeActiveChar(prevCharListComponent.length);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            changeActiveChar(prevCharListComponent.length);
                                            onChangeCharSelect(char.id);
                                        }
                                    }}>
                                    <img src={char.thumbnail} style={char.styleImg} alt={char.name} />
                                    <div className="char__name">
                                        {char.name.length >= 36 ? char.name.slice(1, 36) + '...' : char.name}
                                    </div>
                                </li>
                            </CSSTransition>
                        );
                        return updatedListComponent;
                    });
                }, 100 * i)
            );
        });
    };

    const changeActiveChar = (num) => {
        itemsRef.current.forEach((el) => el.classList.remove('char__item_selected'));
        itemsRef.current[num].classList.add('char__item_selected');
    };

    const loadingComponent = loading && !charList.length ? <Spiner /> : null;
    const errorComponent = error ? <Error /> : null;

    return (
        <div className="char__list">
            <ul className="char__grid">
                {loadingComponent}
                {errorComponent}
                <TransitionGroup className="char__grid" component="ul">
                    {charListComponent}
                </TransitionGroup>
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
