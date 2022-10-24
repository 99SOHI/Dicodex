import './component/pokemon-list.js'
import DataSource from './data/data-source.js'

const main = () => {
    const pokemonListElement = document.querySelector('pokemon-list')

    const renderPage = (results) => {
        pokemonListElement.pokemons = results;
    }
    DataSource.getPokemon().then(renderPage).catch(console.log("test"))

    // const fallbackResult = (message) => {
    //     pokemonListElement.renderError(message);
    // };
}

export default main;
