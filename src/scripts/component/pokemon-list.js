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

    // connectedCallback() {
    //     this.render();
    // }

    set pokemons(pokemons) {
        this._pokemons = pokemons;
        this.render();
    }

    set pokemon(pokemonss) {
        this._pokemonss = pokemonss;
        this.renderOne(pokemonss)
    }

    set error(error) {
        this._error = error;
        this.renderError(error)
    }

    render() {
        this.shadowDOM.innerHTML = ``;
        console.log(this._pokemons)
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
        console.log(this._pokemons)
    }

    renderOne(pokemonss) {
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

        console.log(pokemonss)

        if (pokemonss.id != undefined) {
            if (pokemonss.id > 99) {
                pokemonss.number = pokemonss.id
            } else if (pokemonss.id > 9) {
                pokemonss.number = "0" + pokemonss.id
            } else if (pokemonss.id > 0) {
                pokemonss.number = "00" + pokemonss.id
            }

            const pokemonCardElement = document.createElement('pokemon-card');
            pokemonCardElement.pokemon = pokemonss;
            this.shadowDOM.innerHTML += `<div class="reset-button"><< Go Back</div>`
            const resetButton = this.shadowDOM.querySelector('.reset-button')
            this.shadowDOM.appendChild(pokemonCardElement);
            resetButton.addEventListener('click', main)
            const pageNavElement = document.querySelector('page-nav')
            if (pageNavElement) {
                pageNavElement.remove()
            }
        } else {
            pokemonss.id.length
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
        this.shadowDOM.innerHTML += `<h2 class="placeholder">There's no pokemon with the name ${entry}</h2>
        <div class="reset-button"><< Go Back</div>`

        const resetButton = this.shadowDOM.querySelector('.reset-button')
        resetButton.addEventListener('click', main)
        const pageNavElement = document.querySelector('page-nav')
    }
}

customElements.define('pokemon-list', PokemonList)
