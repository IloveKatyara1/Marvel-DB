import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useMarvelServices from '../../../services/MarvelServices';

import AppBanner from '../../appBanner/AppBanner';
import Error from '../../errorGif/ErrorGif';
import Spinner from '../../spiner/Spinner';

import './SingleComicPage.scss';
import xMen from '../../../resources/img/x-men.png';

const SingleComicPage = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState(null);
    const { loading, error, getOneElement, resetError } = useMarvelServices();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const updateComic = () => {
        resetError();
        getOneElement(comicId, 'comics').then(onComicLoaded);
    };

    const onComicLoaded = (comic) => {
        setComic(comic);
    };

    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

const View = ({ comic }) => {
    const { name, descr, pageCount, thumbnail, price } = comic;

    return (
        <div className="single-comic">
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
