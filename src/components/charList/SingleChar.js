import { useState, useEffect } from 'react';

import classNames from 'classnames';

const SingleChar = ({ charListComponent, itemsRef, char, i, changeActiveChar, onChangeCharSelect, whithoutEffect }) => {
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
            className={classNames(`char__item ${!whithoutEffect ? 'opacity' : null}`, {
                effect: addClass,
                whithoutOpacity: addClass,
            })}
            key={char.id}
            ref={(el) => (itemsRef.current[charListComponent.length + i] = el)}
            tabIndex={charListComponent.length + 8}
            onClick={() => {
                onChangeCharSelect(char.id);
                changeActiveChar(charListComponent.length + i);
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    changeActiveChar(charListComponent.length + i);
                    onChangeCharSelect(char.id);
                }
            }}>
            <img src={char.thumbnail} style={char.styleImg} alt={char.name} />
            <div className="char__name">{char.name.length >= 36 ? char.name.slice(1, 36) + '...' : char.name}</div>
        </li>
    );
};

export default SingleChar;
