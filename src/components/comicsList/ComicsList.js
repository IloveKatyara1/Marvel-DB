import { useEffect, useState } from 'react';

import useMarvelServices from '../../services/MarvelServices';

import './comicsList.scss';

import Spiner from '../spiner/Spinner';
import Error from '../errorGif/ErrorGif';

const ComicsList = () => {
    const [offset, setOffset] = useState(0);
    const [comicsList, setComicsList] = useState([]);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [btnLoading, setBtnLoading] = useState(true);

    const { error, loading, getAllCharacterOrComics } = useMarvelServices();

    let wasMount;

    useEffect(() => {
        if (!wasMount) {
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
            if (res < 8) setComicsEnded(true);
        });
    };

    const errorComponent = error ? <Error /> : null;
    const loadingComponent = loading && !comicsList.length ? <Spiner /> : null;
    const comicsListComponent = comicsList.map((comic, i) => {
        return (
            <li className="comics__item" key={i} tabIndex={4 + i}>
                <a href="#">
                    <img src={comic.thumbnail} alt={comic.name} className="comics__item-img" />
                    <div className="comics__item-name">{comic.name}</div>
                    <div className="comics__item-price">{comic.price}</div>
                </a>
            </li>
        );
    });

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {errorComponent}
                {loadingComponent}
                {comicsListComponent}
            </ul>
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
