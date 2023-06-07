import { Helmet } from 'react-helmet';

import ComicsList from '../comicsList/ComicsList';
import AppBaner from '../appBanner/AppBanner';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const ComicsPage = () => (
    <>
        <Helmet>
            <title>Marvel Comics</title>
        </Helmet>
        <AppBaner />
        <ErrorBoundary>
            <ComicsList />
        </ErrorBoundary>
    </>
);

export default ComicsPage;
