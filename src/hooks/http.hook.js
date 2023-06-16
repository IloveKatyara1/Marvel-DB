import { useState } from 'react';

export const useHttp = () => {
    const [state, setState] = useState('waiting');

    const getData = async (url) => {
        try {
            setState('loading');

            const res = await fetch(url);

            return await res.json();
        } catch (e) {
            setState('error');
            throw new Error('something went wrong, try again later');
        }
    };

    const resetError = () => {
        setState('loading');
    };

    return { getData, resetError, state, setState };
};
