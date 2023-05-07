import { Component } from 'react';

import MarvelServices from '../../services/MarvelServices';
import Spiner from '../spiner/Spinner'
import Error from '../errorGif/ErrorGif';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false,
    }

    componentDidMount() {
        this.getDataForRndChar()
    }

    servic = new MarvelServices()
    
    getDataForRndChar = () => {
        this.setState({loading: true})
        this.servic
            .getOneCharacter(Math.floor(Math.random() * (1011400 - 1011000) + 1011000))
            .then(this.updataChar)
            .catch(() => this.setState({loading: false, error: true}))
    }

    updataChar = (char) => {
        this.setState({char, loading: false})
    }

    render() {
        const {char: {name, descr, thumbnail, detail, wiki, styleImg}, loading, error} = this.state

        return (
            <div className="randomchar">
                {loading ? <Spiner /> : error ? <Error /> : (
                    <div className="randomchar__block">
                        <img src={thumbnail} style={styleImg} alt={name} className="randomchar__img"/>
                        <div className="randomchar__info">
                            <p className="randomchar__name">{name}</p>
                            <p className="randomchar__descr">
                                {descr}
                            </p>
                            <div className="randomchar__btns">
                                <a href={detail} className="button button__main" tabIndex={3}>
                                    <div className="inner">homepage</div>
                                </a>
                                <a href={wiki} className="button button__secondary" tabIndex={4}>
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
                        onClick={this.getDataForRndChar}
                        tabIndex={5}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

export default RandomChar;