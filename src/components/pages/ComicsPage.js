import ComicsList from '../comicsList/ComicsList';
import AppBaner from '../appBanner/AppBanner';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const ComicsPage = ({ comicsList, setComicsList, offset, setOffset }) => (
    <>
        <AppBaner />
        <ErrorBoundary>
            <ComicsList comicsList={comicsList} setComicsList={setComicsList} offset={offset} setOffset={setOffset} />
        </ErrorBoundary>
    </>
);

export default ComicsPage;
