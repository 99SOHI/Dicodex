import './component/pokemon-list.js'
import './component/hero-section.js'
import './component/page-nav.js'
import './component/modal-card.js'
import DataSource from './data/data-source.js'

const main = () => {
    var src = "https://pokeapi.co/api/v2/pokemon-species"
    var next = ""
    var prev = ""
    const pokemonListElement = document.querySelector('pokemon-list')
    const pageNavElement = document.querySelector('page-nav');

    const renderList = (json) => {
        pokemonListElement.pokemons = json.results
        pageNavElement.json = json
    }

    const render = async (src) => {
        DataSource.getPokemon(src)
            .then(src => {
                renderList(src);
                console.log(src)
                if (src.previous != null) {
                    prev = src.previous
                }
                if (src.next != null) {
                    next = src.next
                }
            })
            .catch(console.log("test"))
    }

    const nextPageL = async () => {
        src = next;
        render(src)
    }

    const prevPageL = async () => {
        src = prev;
        render(src)
    }

    pageNavElement.nextPage = nextPageL
    pageNavElement.prevPage = prevPageL

    render(src);

    // const fallbackResult = (message) => {
    //     pokemonListElement.renderError(message);


}

export default main;
