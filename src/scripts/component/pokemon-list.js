import './pokemon-card.js'
import '../data/data-source.js'
import main from '../main.js';

class PokemonList extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({
            mode: 'open'
        })
    }

    set pokemons(pokemons) {
        this._pokemons = pokemons;
        this.render();
    }

    set pokemon(searchResult) {
        this._searchResult = searchResult;
        this.renderOne(searchResult)
    }

    set error(error) {
        this._error = error;
        this.renderError(error)
    }

    render() {
        this.shadowDOM.innerHTML = ``;
        this._pokemons.forEach(pokemon => {
            pokemon.id = pokemon.url.slice(42, 46).slice(0, -1)

            if (pokemon.id.length > 2) {
                pokemon.number = pokemon.id
            } else if (pokemon.id.length > 1) {
                pokemon.number = "0" + pokemon.id
            } else {
                pokemon.number = "00" + pokemon.id
            }

            const pokemonCardElement = document.createElement('pokemon-card');
            pokemonCardElement.pokemon = pokemon;

            this.shadowDOM.appendChild(pokemonCardElement);
        })
    }

    renderOne(searchResult) {
        this.shadowDOM.innerHTML = ``
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
            if (searchResult.id > 99) {
                searchResult.number = searchResult.id
            } else if (searchResult.id > 9) {
                searchResult.number = "0" + searchResult.id
            } else if (searchResult.id > 0) {
                searchResult.number = "00" + searchResult.id
            }

            const pokemonCardElement = document.createElement('pokemon-card');
            pokemonCardElement.pokemon = searchResult;

            this.shadowDOM.innerHTML += `<div class="reset-button"><< Go Back</div>`
            const resetButton = this.shadowDOM.querySelector('.reset-button')

            this.shadowDOM.appendChild(pokemonCardElement);

            resetButton.addEventListener('click', main)
            const pageNavElement = document.querySelector('page-nav')
            if (pageNavElement) {
                pageNavElement.remove()
            }
        } else {
            searchResult.id.length // sengaja biar function-nya error kalo data yang diterima ga sesuai, solusi sementara
        }
    }

    renderError(entry) {
        this.shadowDOM.innerHTML = ``
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
        <div class="reset-button"><< Go Back</div>`

        const resetButton = this.shadowDOM.querySelector('.reset-button')
        resetButton.addEventListener('click', main)

        const pageNavElement = document.querySelector('page-nav')
        if (pageNavElement) {
            pageNavElement.remove()
        }
    }
}

customElements.define('pokemon-list', PokemonList)
