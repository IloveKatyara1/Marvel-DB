import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

import useMarvelServices from '../../../services/MarvelServices';

import AppBanner from '../../appBanner/AppBanner';
import Error from '../../errorGif/ErrorGif';
import Spinner from '../../spiner/Spinner';

import { singleChar } from '../../app/App';

import './SingleComicPage.scss';

const SingleComicPage = ({ isChar }) => {
    const { comicId, chartherName } = useParams();
    const [comic, setComic] = useState(null);
    const { loading, error, getOneElement, resetError, getCharByName } = useMarvelServices();

    const { dataSingleChar, setDataSingleChar } = useContext(singleChar);

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const updateComic = () => {
        resetError();
        if (isChar && !dataSingleChar.isFromSearch) {
            getCharByName(chartherName).then(onCharLoaded);
        } else if (!isChar && !dataSingleChar.isFromSearch) {
            getOneElement(comicId, 'comics').then(onComicLoaded);
        }
    };

    const onComicLoaded = (comic) => {
        setComic(comic);
    };

    const onCharLoaded = (char) => {
        setDataSingleChar(char);
    };

    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !(comic || dataSingleChar.name)) ? (
        <View comic={comic} isChar={isChar} dataSingleChar={dataSingleChar} />
    ) : null;

    // console.log(loading, error, comic, dataSingleChar, 'loading, error, comic, dataSingleChar');

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

const View = ({ comic, isChar, dataSingleChar }) => {
    const { name, descr, pageCount, thumbnail, price } = isChar ? dataSingleChar : comic;

    // console.log(name, descr, thumbnail, 'in View name, descr, thumbnail');

    return (
        <div className="single-comic">
            <img
                src={thumbnail}
                alt={name}
                className={`single-comic__img ${isChar ? 'single-comic__img_char' : null}`}
            />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{descr}</p>
                {!isChar && (
                    <>
                        <p className="single-comic__descr">{pageCount}</p>
                        <p className="single-comic__descr">Language: en-us</p>
                        <div className="single-comic__price">{price}</div>
                    </>
                )}
            </div>
            <Link to={!isChar ? '/comics' : '/'} className="single-comic__back">
                Back to all
            </Link>
        </div>
    );
};

export default SingleComicPage;
