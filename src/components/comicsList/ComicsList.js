import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useMarvelServices from '../../services/MarvelServices';
import { setComponentForList } from '../../utils/setComponent';

import SingleComic from './SingleComic';

import './comicsList.scss';

import { comicsListContext } from '../app/App';

const ComicsList = () => {
    const { setComicsList, comicsList } = useContext(comicsListContext);

    const [comicsEnded, setComicsEnded] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [offset, setOffset] = useState(250 + comicsList.length);
    const [comicsListComponent, setComicsListComponent] = useState([...comicsList]);

    const { state, setState, getAllCharacterOrComics } = useMarvelServices();

    let wasMount;

    useEffect(() => {
        if (!wasMount && !comicsList.length) {
            wasMount = true;
            getAllComics();
        }
    }, []);

    const getAllComics = () => {
        setBtnLoading(true);

        getAllCharacterOrComics('comics', offset, 8)
            .then((res) => {
                setOffset((offset) => offset + 8);
                setBtnLoading(false);
                if (res < 8) setComicsEnded(true);

                const newComics = res.map((comic, i) => {
                    return (
                        <SingleComic
                            key={comicsListComponent.length + i}
                            comicsListComponent={comicsListComponent}
                            i={i}
                            comic={comic}
                        />
                    );
                });

                setComicsList((comicsList) => [
                    ...comicsList,
                    res.map((comic, i) => {
                        return (
                            <SingleComic
                                key={comicsListComponent.length + i}
                                comicsListComponent={comicsListComponent}
                                i={i}
                                comic={comic}
                                whithoutEffect={true}
                            />
                        );
                    }),
                ]);

                setComicsListComponent((comicsListComponent) => [...comicsListComponent, ...newComics]);
            })
            .then(() => setState('success'));
    };

    return (
        <div className="comics__list">
            <ul className="comics__grid">{setComponentForList(state, comicsListComponent)}</ul>
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
