class MarvelServices {
    _apiUrl = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=d5d627eb28d69a7a44dd190b11e467a1'
    _offsetChar = 250

    getData = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            return await Promise.reject(res.status);
        }
    
        return await res.json();
    }

    getAllCharacter = async (offset = this._offsetChar) => {
        const res = await this.getData(`${this._apiUrl}characters?limit=9&offset=${offset}&${this._apiKey}`)
        return res.data.results.map(char => {
            return {
                name: char.name,
                thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
                id: char.id,
                styleImg: {objectFit: char.thumbnail.path + '.' + char.thumbnail.extension === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? 'contain' : 'cover'}
            }
        })
    }

    getOneCharacter = async (id) => {
        const res = await this.getData(`${this._apiUrl}characters/${id}?${this._apiKey}`)
        return this._recordingDataRandomChar(res.data.results[0])
    }


    _recordingDataRandomChar = (char) => {
        return {
            name: char.name,
            descr: !char.descr ? "we don't have descr" : char.descr.length > 210 ? char.descr.slice(0, 210) + '...' : char.descr,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            detail: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
            styleImg: {objectFit: char.thumbnail.path + '.' + char.thumbnail.extension === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? 'contain' : 'cover'}
        }
    }
}

export default MarvelServices