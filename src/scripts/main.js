import './component/pokemon-list.js'
import './component/hero-section.js'
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
            .catch(console.log("test"))
    }

    // const searchButton = async () => {
    //     DataSource.getPokemon(`https://pokeapi.co/api/v2/pokemon-species/${document.querySelector('#searchElement').value}`).then(src => {
    //         render(src);
    //     }).catch(console.log("test"))
    // }

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
    // heroSection.searchPokemon = searchButton

    // const searchInput = document.querySelector('#searchElement').value
    // document.querySelector('#searchButtonElement').addEventListener('click', searchButton(searchInput))

    render(src);

    // heroSection.innerHTML += `<img src="${logo}" alt="" />`
    const img = document.createElement('img')
    img.src = logo
    heroSection.insertBefore(img, heroSection.children[0])
    img.classList.add('logo')


    // const searchButtonn = () => {
    //     DataSource.getPokemon(`https://pokeapi.co/api/v2/pokemon-species/${document.querySelector('#searchElement').value.toLowerCase()}`).then(src => {
    //         pokemonListElement.pokemon = src
    //     }).catch(console.log("test"))
    // }

    // const searchInput = document.querySelector('#searchElement').value
    // document.querySelector('#searchButtonElement').addEventListener('click', () => {
    //     searchButtonn(searchInput)
    //     console.log(searchInput)
    // })


    // const fallbackResult = (message) => {
    //     pokemonListElement.renderError(message);


}

export default main;
