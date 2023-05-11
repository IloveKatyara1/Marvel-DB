import { useState } from 'react';

export const useHttp = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const getData = async (url) => {
        setLoading(true);

        const res = await fetch(url);

        if (!res.ok) {
            setError(true);
            setLoading(false);
            return null;
        }

        setLoading(false);
        return await res.json();
    };

    const resetError = () => setError(false);

    return { error, loading, getData, resetError };
};
