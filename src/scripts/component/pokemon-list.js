import './pokemon-card.js';
import '../data/data-source.js';
import main from '../main.js';
import {
    getIdFromUrl,
    numbering
} from '../../app.js';

class PokemonList extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({
            mode: 'open'
        });
    }

    set pokemons(pokemons) {
        this._pokemons = pokemons;
        this.render();
    }

    set pokemon(searchResult) {
        this._searchResult = searchResult;
        this.renderOne(searchResult);
    }

    set error(error) {
        this._error = error;
        this.renderError(error);
    }

    render() {
        this.shadowDOM.innerHTML = '';
        this._pokemons.forEach(pokemon => {
            pokemon.id = getIdFromUrl(pokemon.url);

            if (pokemon.id.length > 2) {
                pokemon.number = pokemon.id;
            } else if (pokemon.id.length > 1) {
                pokemon.number = '0' + pokemon.id;
            } else {
                pokemon.number = '00' + pokemon.id;
            }

            const pokemonCardElement = document.createElement('pokemon-card');
            pokemonCardElement.pokemon = pokemon;

            this.shadowDOM.appendChild(pokemonCardElement);
        });
    }

    renderOne(searchResult) {
        this.shadowDOM.innerHTML = '';
        this.shadowDOM.innerHTML += `<style>
        :host {
            display: flex;
            flex-direction: column-reverse;
            align-items: center;
            flex: 0;
        }

        .reset-button {
            padding: 0.5em 1em;
            background-color: red;
            border-radius: 5px;
            color: white;
            transition: 100ms;
        }

        .reset-button:hover {
            scale: 110%;
            cursor: pointer;
            transition: 100ms;
        }
        </style>`;



        if (searchResult.id != undefined) {

            searchResult.number = numbering(searchResult.id);

            const pokemonCardElement = document.createElement('pokemon-card');
            pokemonCardElement.pokemon = searchResult;

            this.shadowDOM.innerHTML += '<div class="reset-button"><< Go Back</div>';
            const resetButton = this.shadowDOM.querySelector('.reset-button');

            this.shadowDOM.appendChild(pokemonCardElement);

            resetButton.addEventListener('click', main);
            const pageNavElement = document.querySelector('page-nav');

            if (pageNavElement) {
                pageNavElement.remove();

                const pageNav = document.createElement('page-nav');
                const bottomHr = document.querySelector('#bottom-hr');
                let parentDiv = bottomHr.parentNode;
                parentDiv.insertBefore(pageNav, bottomHr);

            }
        } else {
            throw new Error();
        }
    }

    renderError(entry) {
        this.shadowDOM.innerHTML = '';
        this.shadowDOM.innerHTML += `<style>
        :host {
            display: flex;
            align-items: center;
            flex-direction: column;
            flex: 0;
        }

        .reset-button {
            padding: 0.5em 1em;
            background-color: red;
            border-radius: 5px;
            color: white;
            transition: 100ms;
        }

        .reset-button:hover {
            scale: 110%;
            cursor: pointer;
            transition: 100ms;
        }

            .placeholder {
            font-weight: lighter;
            color: rgba(0, 0, 0, 0.5);
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          </style>`;

        this.shadowDOM.innerHTML += `<h2 class="placeholder">There's no pokemon with the name/id ${entry}</h2>
        <div class="reset-button"><< Go Back</div>`;

        const resetButton = this.shadowDOM.querySelector('.reset-button');
        resetButton.addEventListener('click', main);

        const pageNavElement = document.querySelector('page-nav');
        if (pageNavElement) {
            pageNavElement.remove();

            const pageNav = document.createElement('page-nav');
            const bottomHr = document.querySelector('#bottom-hr');
            let parentDiv = bottomHr.parentNode;
            parentDiv.insertBefore(pageNav, bottomHr);

        }
    }
}

customElements.define('pokemon-list', PokemonList);
