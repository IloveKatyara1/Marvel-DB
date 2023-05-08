import { useState, useEffect } from 'react';

import MarvelServices from '../../services/MarvelServices';
import Spiner from '../spiner/Spinner'
import Error from '../errorGif/ErrorGif';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = (props) => {
    const [char, setChar] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => getDataForRndChar(), [])

    const servic = new MarvelServices()
    
    const getDataForRndChar = () => {
        setLoading(true)

        servic
            .getOneCharacter(Math.floor(Math.random() * (1011400 - 1011000) + 1011000))
            .then((char) => setChar(char))
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }

    return (
        <div className="randomchar">
            {loading ? <Spiner /> : error ? <Error /> : (
                <div className="randomchar__block">
                    <img src={char.thumbnail} style={char.styleImg} alt={char.name} className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{char.name}</p>
                        <p className="randomchar__descr">
                            {char.descr}
                        </p>
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
            )}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                    onClick={getDataForRndChar}
                    tabIndex={5}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

export default RandomChar;