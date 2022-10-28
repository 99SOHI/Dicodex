import './component/pokemon-list.js'
import './component/page-nav.js'
import './component/modal-card.js'
import DataSource from './data/data-source.js'

import logo from '../assets/dicedex.svg'

const main = () => {
    var src = "https://pokeapi.co/api/v2/pokemon-species"
    var next = ""
    var prev = ""
    const pokemonListElement = document.querySelector('pokemon-list')
    const pageNavElement = document.querySelector('page-nav');
    const heroSection = document.querySelector('.hero-section')

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
            .catch(error => {
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


    // Import & Append Logo
    const img = document.createElement('img')
    img.src = logo
    heroSection.insertBefore(img, heroSection.children[0])
    img.classList.add('logo')


    // Initial Render
    render(src);

}

export default main;
