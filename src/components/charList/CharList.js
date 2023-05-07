import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelServices from '../../services/MarvelServices';

import './charList.scss';
import Spiner from '../spiner/Spinner'
import Error from '../errorGif/ErrorGif';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        offset: 250,
        charEnded: false,
        btnLoading: true
    }

    wasMount = false

    servic = new MarvelServices() 

    componentDidMount() {
        if(!this.wasMount && !this.state.charList.length) {
            this.wasMount = true
            this.setState({loading: true, btnLoading: true})
            this.addNewChar();
        }

        window.addEventListener('scroll', this.eventListenerScroll)
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.eventListenerScroll)
    }
    
    eventListenerScroll = () => {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1 && !this.state.btnLoading){
            this.addNewChar();
        }
    }
    
    addNewChar = () => {
        this.setState({btnLoading: true})

        this.servic.getAllCharacter(this.state.offset)
        .then((res) => this.setState(({charList, offset}) => ({
            charList: [...charList, ...res],
            loading: false,
            offset: offset + 9,
            charEnded: res.length < 9,
            btnLoading: false
        })))
        .catch(() => this.setState({error: true, loading: false}))
    }

    lastActiveChar
    itemsRef = []

    setRef = (ref) => {
        this.itemsRef.push(ref)
    }

    changeActiveChar = (num) => {
        this.itemsRef[num].classList.add('char__item_selected')
        if(this.lastActiveChar) this.itemsRef[this.lastActiveChar].classList.remove('char__item_selected')
        this.lastActiveChar = num
    }    

    render() {
        const {charList, loading, error, charEnded, btnLoading} = this.state

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {loading ? <Spiner /> : error ? <Error /> : charList.map((char, i) => (
                        <li className='char__item'
                            key={char.id}
                            ref={this.setRef}
                            tabIndex={i + 8}
                            onClick={() => {
                                this.props.onChangeCharSelect(char.id)
                                this.changeActiveChar(i)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    this.changeActiveChar(i);
                                    this.props.onChangeCharSelect(char.id);
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
                    onClick={this.addNewChar}
                    disabled={btnLoading}
                    style={{display: charEnded ? 'none' : 'block'}}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onChangeCharSelect: PropTypes.func
}

export default CharList;