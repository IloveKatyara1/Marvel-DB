import { Link, NavLink } from 'react-router-dom';

import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/" tabIndex={1}>
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink end to="/" tabIndex={2}>
                            Characters
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink end to="/comics" tabIndex={3}>
                            Comics
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;
