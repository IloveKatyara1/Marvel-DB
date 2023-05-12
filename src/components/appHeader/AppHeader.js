import PropTypes from 'prop-types';

import './appHeader.scss';

const AppHeader = (props) => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="#" tabIndex={1}>
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <button
                            onClick={() => props.onChangeWindow('char')}
                            className={props.nameWindow === 'char' ? 'active' : ''}
                            tabIndex={2}>
                            Characters
                        </button>
                    </li>
                    /
                    <li>
                        <button
                            onClick={() => props.onChangeWindow('comics')}
                            className={props.nameWindow === 'comics' ? 'active' : ''}
                            tabIndex={3}>
                            Comics
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

AppHeader.propTypes = {
    onChangeWindow: PropTypes.func,
    nameWindow: PropTypes.string,
};

export default AppHeader;
