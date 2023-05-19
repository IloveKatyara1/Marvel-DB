import ComicsList from '../comicsList/ComicsList';
import AppBaner from '../appBanner/AppBanner';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const ComicsPage = () => (
    <>
        <AppBaner />
        <ErrorBoundary>
            <ComicsList />
        </ErrorBoundary>
    </>
);

export default ComicsPage;
