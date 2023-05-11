import { useHttp } from '../hooks/http.hook';

const useMarvelServices = () => {
    const _apiUrl = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=d5d627eb28d69a7a44dd190b11e467a1';
    const _offset = 250;

    const { error, loading, getData, resetError } = useHttp();

    const getAllCharacter = async (offset = _offset) => {
        const res = await getData(`${_apiUrl}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map((char) => {
            return {
                name: char.name,
                thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
                id: char.id,
                styleImg: {
                    objectFit:
                        char.thumbnail.path + '.' + char.thumbnail.extension ===
                        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                            ? 'contain'
                            : 'cover',
                },
            };
        });
    };

    const getOneCharacter = async (id) => {
        const res = await getData(`${_apiUrl}characters/${id}?${_apiKey}`);
        return _recordingDataRandomChar(res.data.results[0]);
    };

    const _recordingDataRandomChar = (char) => {
        return {
            name: char.name,
            descr: !char.descr
                ? "we don't have descr"
                : char.descr.length > 210
                ? char.descr.slice(0, 210) + '...'
                : char.descr,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            detail: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
            styleImg: {
                objectFit:
                    char.thumbnail.path + '.' + char.thumbnail.extension ===
                    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                        ? 'contain'
                        : 'cover',
            },
        };
    };

    return { getOneCharacter, getAllCharacter, error, loading };
};

export default useMarvelServices;
