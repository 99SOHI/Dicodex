import $ from 'jquery';
import '../node_modules/jquery-ui-dist/jquery-ui.min.js';

import main from './scripts/main.js';
import DataSource from './scripts/data/data-source.js';

import './styles/style.css';
import logo from './assets/dicedex.svg';

document.addEventListener('DOMContentLoaded', main);

// jquery-ui autocomplete
$(function () {
    let pokemonSearch = $('#searchElement');
    $(function () {
        $.getJSON('https://pokeapi.co/api/v2/pokemon-species?limit=100000&offset=0.', function (data) {
            const raw = data.results;
            let pokemonName = [];
            raw.forEach(pokemon => {
                pokemonName.push(toTitleCase(pokemon.name));
            });
            pokemonSearch.autocomplete({
                source: function (request, response) {
                    let results = $.ui.autocomplete.filter(pokemonName, request.term);

                    response(results.slice(0, 10));
                },
                minLength: 2
            });
        });
    });
});


// Function toTitleCase
export function toTitleCase(str) {
    return str.replace('-', ' ').replace(
        /\b\w+/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}


// Search Function
const pokemonListElement = document.querySelector('pokemon-list');

const searchButton = async () => {
    DataSource.getPokemon(`https://pokeapi.co/api/v2/pokemon-species/${document.querySelector('#searchElement').value.toLowerCase().replace(' ', '-')}`).then(src => {
        pokemonListElement.pokemon = src;
    }).catch(() => {
        pokemonListElement.renderError(document.querySelector('#searchElement').value);
    });
};

const searchInput = document.querySelector('#searchElement').value;
document.querySelector('#searchButtonElement').addEventListener('click', () => {
    searchButton();
    console.log(searchInput);
});


// Import & Append Logo to page
const heroSection = document.querySelector('.hero-section');
const img = document.createElement('img');
img.src = logo;
heroSection.insertBefore(img, heroSection.children[0]);
img.classList.add('logo');

// Numbering Function
export function numbering(id) {
    let number;

    if (id > 99) {
        number = id;
    } else if (id > 9) {
        number = '0' + id;
    } else if (id > 0) {
        number = '00' + id;
    }

    return number;
}

export function getIdFromUrl(url) {
    let slicedUrl = url.slice(42, 46).slice(0, -1);
    return slicedUrl;
}
