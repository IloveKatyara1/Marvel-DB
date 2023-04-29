import { Component } from 'react';
import PropTypes from 'prop-types';

import Skeleton from '../skeleton/Skeleton'
import Error from '../errorGif/ErrorGif'
import Spinner from '../spiner/Spinner';
import MarvelServices from '../../services/MarvelServices';

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
        loadedComics: false
    }

    componentDidUpdate(prevProp) {
        if(prevProp.charSelect !== this.props.charSelect) {
            this.setState({loadedComics: false})
            this.getCharData()
        }
    }

    getCharData = () => {
        if(!this.props.charSelect) return

        const servic = new MarvelServices()

        this.setState({loading: true})
        servic
            .getOneCharacter(this.props.charSelect)
            .then((char) => this.setState({char, loading: false}))
            .catch(() => this.setState({loading: false, error: true}))
    }

    toogleLoadedComics = () => this.setState(({loadedComics}) => ({
        loadedComics: !loadedComics
    })) 

    render() {
        const {error, loading, char, loadedComics} = this.state

        const skeleton = error || loading || char ? null : <Skeleton />
        const errorMasege = error ? <Error /> : null
        const spiner = loading ? <Spinner /> : null
        const content = (!error && !loading && char) ? true : null

        return (
            <div className="char__info">
                {skeleton}
                {errorMasege}
                {spiner}
                {content && (
                    <>
                        <div className="char__basics">
                            <img src={char.thumbnail} style={char.styleImg} alt={char.name}/>
                            <div>
                                <div className="char__info-name">{char.name}</div>
                                <div className="char__btns">
                                    <a href={char.detail} className="button button__main">
                                        <div className="inner">homepage</div>
                                    </a>
                                    <a href={char.wiki} className="button button__secondary">
                                        <div className="inner">Wiki</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="char__descr">
                            {char.descr}
                        </div>
                        <div className="char__comics">Comics:</div>
                        <ul className="char__comics-list">
                            {char.comics.map((item, i) => {
                                // eslint-disable-next-line
                                if(i >= 10 && !loadedComics) return
                                
                                return (
                                    <li className="char__comics-item" key={i}>
                                        {item.name}
                                    </li>
                                )
                            })} {
                                char.comics.length >= 10 
                                && (<button onClick={this.toogleLoadedComics} 
                                        className='load_more'
                                    >
                                        {!loadedComics ? 'show more...' : 'hide'}
                                    </button>)
                            } {
                                char.comics.length === 0 && (<h3>here is no comics</h3>)
                            }
                        </ul>
                    </>
                )}
            </div>
        )
    }
}

CharInfo.propTypes = {
    charSelect: PropTypes.number
}

export default CharInfo;