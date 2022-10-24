class DataSource {
    static async getPokemon(src) {
        try {
            console.log(src)
            const response = await fetch(src)
            const responseJson = await response.json();

            if (responseJson.results) {
                console.log(responseJson);
                return Promise.resolve(responseJson)
            } else {
                return Promise.reject('Data is unreachable')
            }
        } catch (error) {
            return error
        }
    }
}

export default DataSource
