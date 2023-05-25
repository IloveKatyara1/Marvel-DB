import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelServices from '../../services/MarvelServices';

import './comicsList.scss';

import Spiner from '../spiner/Spinner';
import Error from '../errorGif/ErrorGif';
import { comicsListContext } from '../app/App';

const ComicsList = () => {
    const { setComicsList, comicsList } = useContext(comicsListContext);

    const [comicsEnded, setComicsEnded] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [offset, setOffset] = useState(120 + comicsList.length);
    const [comicsListComponent, setComicsListComponent] = useState(
        comicsList.map((comic, i) => {
            return (
                <li className="comics__item" key={i} tabIndex={4 + i}>
                    <Link to={`${comic.id}`}>
                        <img src={comic.thumbnail} alt={comic.name} className="comics__item-img" />
                        <div className="comics__item-name">{comic.name}</div>
                        <div className="comics__item-price">{comic.price}</div>
                    </Link>
                </li>
            );
        })
    );

    const { error, loading, getAllCharacterOrComics } = useMarvelServices();

    let wasMount;

    useEffect(() => {
        if (!wasMount && !comicsList.length) {
            wasMount = true;
            getAllComics();
        }
    }, []);

    const getAllComics = () => {
        setBtnLoading(true);

        getAllCharacterOrComics('comics', offset, 8).then((res) => {
            setComicsList((comicsList) => [...comicsList, ...res]);
            setOffset((offset) => offset + 8);
            setBtnLoading(false);
            res.forEach((comic, i) =>
                setTimeout(() => {
                    setComicsListComponent((prevComicsListComponent) => {
                        const updataComicsListComponent = [...prevComicsListComponent];

                        updataComicsListComponent.push(
                            <CSSTransition
                                timeout={500}
                                classNames="comics__item"
                                key={updataComicsListComponent.length}
                                in={true}>
                                <li
                                    className="comics__item"
                                    key={updataComicsListComponent.length}
                                    tabIndex={4 + updataComicsListComponent.length}>
                                    <Link to={`${comic.id}`}>
                                        <img src={comic.thumbnail} alt={comic.name} className="comics__item-img" />
                                        <div className="comics__item-name">{comic.name}</div>
                                        <div className="comics__item-price">{comic.price}</div>
                                    </Link>
                                </li>
                            </CSSTransition>
                        );

                        return updataComicsListComponent;
                    });
                }, 100 * i)
            );
            if (res < 8) setComicsEnded(true);
        });
    };

    const errorComponent = error ? <Error /> : null;
    const loadingComponent = loading && !comicsList.length ? <Spiner /> : null;

    return (
        <div className="comics__list">
            {errorComponent}
            {loadingComponent}
            <TransitionGroup className="comics__grid" component="ul">
                {comicsListComponent}
            </TransitionGroup>
            <button
                className="button button__main button__long"
                disabled={btnLoading}
                onClick={getAllComics}
                style={{ display: comicsEnded ? 'none' : 'block' }}
                tabIndex={comicsList.length + 4}>
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
