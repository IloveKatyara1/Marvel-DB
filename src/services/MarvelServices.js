class MarvelServices {
    _apiUrl = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=d5d627eb28d69a7a44dd190b11e467a1'

    getData = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            return await Promise.reject(res.status);
        }
    
        return await res.json();
    }

    getAllCharacter = () => this.getData(`${this._apiUrl}characters?limit=9&offset=250&${this._apiKey}`)

    getOneCharacter = async (id) => {
        const res = await this.getData(`${this._apiUrl}characters/${id}?${this._apiKey}`)
        return this._recordingDataRandomChar(res.data.results[0])
    }

    _recordingDataRandomChar = (char) => {
        return {
            name: char.name,
            descr: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            detail: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelServices