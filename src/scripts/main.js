import './component/pokemon-list.js'
import './component/page-nav.js'
import './component/modal-card.js'
import DataSource from './data/data-source.js'

const main = () => {
    let src = "https://pokeapi.co/api/v2/pokemon-species"
    let next = ""
    let prev = ""
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
                if (src.previous != null) {
                    prev = src.previous
                }
                if (src.next != null) {
                    next = src.next
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // Navigation Button

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

    // Initial Render
    render(src);

}

export default main;
