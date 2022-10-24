class DataSource {
    static async getPokemon(src) {
        try {
            if (src === undefined) {
                src = 'https://pokeapi.co/api/v2/pokemon-species'
            }

            const response = await fetch(src)
            const responseJson = await response.json();

            if (responseJson.results) {
                return Promise.resolve(responseJson.results)
            } else {
                return Promise.reject('Data is unreachable')
            }
        } catch (error) {
            return error
        }
    }
}

export default DataSource
