import Skeleton from '../components/skeleton/Skeleton';
import Error from '../components/errorGif/ErrorGif';
import Spinner from '../components/spiner/Spinner';

const setComponent = (state, Component, from) => {
    switch (state) {
        case 'waiting':
            return from === 'charInfo' ? <Skeleton /> : null;
        case 'loading':
            return <Spinner />;
        case 'success':
            return <Component />;
        case 'error':
            return <Error />;
    }
};

const setComponentForList = (state, Component) => {
    switch (state) {
        case 'waiting':
            return Component.length ? Component : <Spinner />;
        case 'loading':
            return Component.length ? Component : <Spinner />;
        case 'success':
            return Component;
        case 'error':
            return <Error />;
    }
};

export { setComponent, setComponentForList };
