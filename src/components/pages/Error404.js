import { Link } from 'react-router-dom';
import Error from '../errorGif/ErrorGif';

const Error404 = () => {
    return (
        <div>
            <Error />
            <h5>page is not found</h5>
            <Link to="/">back to main page</Link>
        </div>
    );
};

export default Error404;
