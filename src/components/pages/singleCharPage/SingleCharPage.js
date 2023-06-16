import { Link, useParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';

import useMarvelServices from '../../../services/MarvelServices';
import { setComponent } from '../../../utils/setComponent';

import AppBanner from '../../appBanner/AppBanner';

import { singleChar } from '../../app/App';

import './singleCharPage.scss';

const SingleComicPage = () => {
    const { chartherName } = useParams();
    const { state, setState, resetError, getCharByName } = useMarvelServices();

    const { dataSingleChar, setDataSingleChar } = useContext(singleChar);

    useEffect(() => {
        updataChar();
    }, []);

    const updataChar = () => {
        resetError();
        if (!dataSingleChar.isFromSearch) {
            getCharByName(chartherName)
                .then(onCharLoaded)
                .then(() => setState('success'));
        } else {
            setState('success');
        }
    };

    const onCharLoaded = (char) => {
        setDataSingleChar(char);
    };

    return (
        <>
            <AppBanner />
            {setComponent(state, () => (
                <View dataSingleChar={dataSingleChar} />
            ))}
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
