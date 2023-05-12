import { useHttp } from '../hooks/http.hook';

const useMarvelServices = () => {
    const _apiUrl = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=d5d627eb28d69a7a44dd190b11e467a1';

    const { error, loading, getData, resetError } = useHttp();

    const getAllCharacterOrComics = async (charterOrComics, offset, limit = 9) => {
        const res = await getData(`${_apiUrl}${charterOrComics}?limit=${limit}&offset=${offset}&${_apiKey}`);
        console.log();
        return res.data.results.map((data) => {
            return {
                name: charterOrComics === 'characters' ? data.name : data.title,
                thumbnail: data.thumbnail.path + '.' + data.thumbnail.extension,
                id: data.id,
                styleImg: {
                    objectFit:
                        data.thumbnail.path + '.' + data.thumbnail.extension ===
                        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                            ? 'contain'
                            : 'cover',
                },
                price:
                    charterOrComics === 'comics'
                        ? data.prices[0].price
                            ? data.prices[0].price + '$'
                            : 'NOT AVAIBLE'
                        : null,
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

    return { getOneCharacter, getAllCharacterOrComics, error, loading, resetError };
};

export default useMarvelServices;
