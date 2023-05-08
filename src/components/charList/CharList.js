import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import MarvelServices from '../../services/MarvelServices';

import './charList.scss';
import Spiner from '../spiner/Spinner'
import Error from '../errorGif/ErrorGif';

const CharList = (props) => {
    const [charList, setCharList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [offset, setOffset] = useState(250)
    const [charEnded, setCharEnded] = useState(false)
    const [btnLoading, setBtnLoading] = useState(true)

    const servic = new MarvelServices() 
    let wasMount = false

    useEffect(() => {
        window.addEventListener('scroll', eventListenerScroll)

        if(!wasMount && !charList.length) {
            wasMount = true
            setLoading(true)
            addNewChar();
        }

        return window.removeEventListener('scroll', eventListenerScroll)
    }, [])
    
    const eventListenerScroll = () => {
        console.log(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1)
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1 && !btnLoading){
            addNewChar();
        }
    }
    
    const addNewChar = () => {
        setBtnLoading(true)

        servic.getAllCharacter(offset)
        .then((res) => {
            setCharList(charList => [...charList, ...res])
            setOffset(offset => offset + 9)
            setCharEnded(res.length < 9)
            setBtnLoading(false)
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false))
    }

    let [lastActiveChar, setLastActiveChar] = useState()
    const itemsRef = useRef([])

    const changeActiveChar = (num) => {
        itemsRef.current[num].classList.add('char__item_selected')
        if(lastActiveChar) itemsRef.current[lastActiveChar].classList.remove('char__item_selected')
        setLastActiveChar(num)
    } 
      
    return (
        <div className="char__list">
            <ul className="char__grid">
                {loading ? <Spiner /> : error ? <Error /> : charList.map((char, i) => (
                    <li className='char__item'
                        key={char.id}
                        ref={el => itemsRef.current[i] = el}
                        tabIndex={i + 8}
                        onClick={() => {
                            props.onChangeCharSelect(char.id)
                            changeActiveChar(i)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                changeActiveChar(i);
                                props.onChangeCharSelect(char.id);
                            }
                        }}
                    >
                        <img src={char.thumbnail} style={char.styleImg}  alt={char.name}/>
                        <div className="char__name">{char.name.length >= 36 ? char.name.slice(1, 36) + '...' : char.name}</div>
                    </li> 
                ))}
            </ul>
            <button 
                className='button button__main button__long'
                onClick={addNewChar}
                disabled={btnLoading}
                style={{display: charEnded ? 'none' : 'block'}}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onChangeCharSelect: PropTypes.func
}

export default CharList;