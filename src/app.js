import main from './scripts/main.js'
import './styles/style.css'
import $ from 'jquery'
import '../node_modules/jquery-ui-dist/jquery-ui.min.js'
import DataSource from './scripts/data/data-source.js';

document.addEventListener('DOMContentLoaded', main);

export function toTitleCase(str) {
    return str.replace("-", " ").replace(
        /\b\w+/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}


// jquery-ui autocomplete
$(function () {
    let pokemonSearch = $('#searchElement');
    $(function () {
        $.getJSON("https://pokeapi.co/api/v2/pokemon-species?limit=100000&offset=0.", function (data) {
            let raw = data.results
            let pokemonName = []
            raw.forEach(pokemon => {
                pokemonName.push(toTitleCase(pokemon.name))
            });
            pokemonSearch.autocomplete({
                source: function (request, response) {
                    var results = $.ui.autocomplete.filter(pokemonName, request.term);

                    response(results.slice(0, 10));
                }
            });
        })
    })
});


// Search Function dibikin diluar wkwk
const pokemonListElement = document.querySelector('pokemon-list')

const searchButton = async () => {
    DataSource.getPokemon(`https://pokeapi.co/api/v2/pokemon-species/${document.querySelector('#searchElement').value.toLowerCase()}`).then(src => {
        pokemonListElement.pokemon = src
    }).catch(error => {
        pokemonListElement.renderError(document.querySelector('#searchElement').value)
        console.log(error)
    })
}

const searchInput = document.querySelector('#searchElement').value
document.querySelector('#searchButtonElement').addEventListener('click', () => {
    searchButton()
    console.log(searchInput)
})
