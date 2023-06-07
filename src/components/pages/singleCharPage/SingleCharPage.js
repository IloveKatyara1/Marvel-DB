import { Link, useParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';

import useMarvelServices from '../../../services/MarvelServices';

import AppBanner from '../../appBanner/AppBanner';
import Error from '../../errorGif/ErrorGif';
import Spinner from '../../spiner/Spinner';

import { singleChar } from '../../app/App';

import './singleCharPage.scss';

const SingleComicPage = () => {
    const { chartherName } = useParams();
    const { loading, error, resetError, getCharByName } = useMarvelServices();

    const { dataSingleChar, setDataSingleChar } = useContext(singleChar);

    useEffect(() => {
        updataChar();
    }, []);

    const updataChar = () => {
        resetError();
        if (!dataSingleChar.isFromSearch) {
            getCharByName(chartherName).then(onCharLoaded);
        }
    };

    const onCharLoaded = (char) => {
        setDataSingleChar(char);
    };

    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !dataSingleChar.name) ? <View dataSingleChar={dataSingleChar} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

const View = ({ dataSingleChar }) => {
    const { name, descr, pageCount, thumbnail } = dataSingleChar;

    return (
        <div className="single-comic">
            <Helmet>
                <title>{name}</title>
            </Helmet>

            <img src={thumbnail} alt={name} className="single-comic__img single-comic__img_char" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{descr}</p>
            </div>
            <Link to="/" className="single-comic__back">
                Back to all
            </Link>
        </div>
    );
};

export default SingleComicPage;
