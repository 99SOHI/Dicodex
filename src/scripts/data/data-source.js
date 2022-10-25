class DataSource {
    static async getPokemon(src) {
        try {
            console.log(src)
            const response = await fetch(src)
            const responseJson = await response.json();
            return Promise.resolve(responseJson)
        } catch (error) {
            return error
        }
    }
}

export default DataSource
