import { useHttp } from '../hooks/http.hook';

const useMarvelServices = () => {
    const _apiUrl = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=d5d627eb28d69a7a44dd190b11e467a1';

    const { error, loading, getData, resetError } = useHttp();

    const getAllCharacterOrComics = async (charterOrComics, offset, limit = 9) => {
        const res = await getData(`${_apiUrl}${charterOrComics}?limit=${limit}&offset=${offset}&${_apiKey}`);
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

    const getOneElement = async (id, charterOrComics = 'characters') => {
        const res = await getData(`${_apiUrl}${charterOrComics}/${id}?${_apiKey}`);
        return _recordingDataRandomChar(res.data.results[0], charterOrComics);
    };

    const getCharByName = async (name) => {
        const res = await getData(`${_apiUrl}characters?name=${name}&${_apiKey}`);
        return {
            name: res.name,
            descr: !res.descr ? "we don't have descr" : res.descr,
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
        };
    };

    const _recordingDataRandomChar = (data, charterOrComics) => {
        if (charterOrComics === 'characters') {
            return {
                name: data.name,
                descr: !data.descr
                    ? "we don't have descr"
                    : data.descr.length > 210
                    ? data.descr.slice(0, 210) + '...'
                    : data.descr,
                thumbnail: data.thumbnail.path + '.' + data.thumbnail.extension,
                detail: data.urls[0].url,
                wiki: data.urls[1].url,
                comics: data.comics.items,
                styleImg: {
                    objectFit:
                        data.thumbnail.path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
                            ? 'contain'
                            : 'cover',
                },
            };
        } else {
            return {
                name: data.title,
                descr: !data.descr ? "we don't have descr" : data.descr,
                thumbnail: data.thumbnail.path + '.' + data.thumbnail.extension,
                price: data.prices[0].price ? data.prices[0].price + '$' : 'NOT AVAIBLE',
                pageCount: data.pageCount ? data.pageCount + 'pages' : 'NOT AVAIBLE',
            };
        }
    };

    return { getOneElement, getAllCharacterOrComics, error, loading, resetError, getCharByName };
};

export default useMarvelServices;
