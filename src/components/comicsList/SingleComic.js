import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import classNames from 'classnames';

const SingleComic = ({ comicsListComponent, comic, i, whithoutEffect }) => {
    const [addClass, setAddClass] = useState(false);

    useEffect(() => {
        const timeount = setTimeout(() => {
            if (!whithoutEffect) {
                setAddClass(true);
            }
        }, 150 * i);

        return () => {
            clearInterval(timeount);
        };
    });

    return (
        <li
            className={classNames(`comics__item ${whithoutEffect ? null : 'opacity'}`, {
                effect: addClass,
                whithoutOpacity: addClass,
            })}
            tabIndex={4 + comicsListComponent.length + i}>
            <Link to={`${comic.id}`}>
                <img src={comic.thumbnail} alt={comic.name} className="comics__item-img" />
                <div className="comics__item-name">{comic.name}</div>
                <div className="comics__item-price">{comic.price}</div>
            </Link>
        </li>
    );
};

export default SingleComic;
