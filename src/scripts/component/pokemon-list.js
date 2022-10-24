import './pokemon-card.js'
import '../data/data-source.js'

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
        console.log(this._pokemons)
    }
}

customElements.define('pokemon-list', PokemonList)
