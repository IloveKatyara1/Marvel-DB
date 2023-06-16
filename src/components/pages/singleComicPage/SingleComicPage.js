import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import useMarvelServices from '../../../services/MarvelServices';
import { setComponent } from '../../../utils/setComponent';

import AppBanner from '../../appBanner/AppBanner';

import './SingleComicPage.scss';

const SingleComicPage = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState(null);
    const { getOneElement, resetError, state, setState } = useMarvelServices();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const updateComic = () => {
        resetError();
        getOneElement(comicId, 'comics')
            .then(onComicLoaded)
            .then(() => setState('success'));
    };

    const onComicLoaded = (comic) => {
        setComic(comic);
    };

    return (
        <>
            <AppBanner />
            {setComponent(state, () => (
                <View comic={comic} />
            ))}
        </>
    );
};

const View = ({ comic }) => {
    const { name, descr, pageCount, thumbnail, price } = comic;

    return (
        <div className="single-comic">
            <Helmet>
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{descr}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">
                Back to all
            </Link>
        </div>
    );
};

export default SingleComicPage;
