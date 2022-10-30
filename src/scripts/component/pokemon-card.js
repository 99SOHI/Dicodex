import {
    get
} from "jquery";
import {
    toTitleCase
} from "../../app";
import DataSource from "../data/data-source";
import './modal-card.js'

class PokemonCard extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({
            mode: 'open'
        })
    }

    set pokemon(pokemon) {
        this._pokemon = pokemon;
        this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
    }

    render() {
        let pokemonData = this._pokemon

        if (pokemonData.varieties == undefined) {
            const getPokemonData = async () => {
                DataSource.getPokemon(`https://pokeapi.co/api/v2/pokemon-species/${pokemonData.name}`).then(result => {
                    pokemonData = result
                }).catch(() => {
                    throw new Error()
                })
            }

            getPokemonData()
        }

        this.shadowDOM.innerHTML = `
        <style>

        * {
            margin: 0;
        }

        .pokemon-card {
            color: inherit;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: center;
            flex: 0 0 1;
            background-color: white;
            border-radius: 10px;
            padding: 20px;
            border: 1px solid #353535;
            margin: 20px;
            gap: 0.25em;
            box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
              rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
            transition: 100ms;
          }

          .pokemon-card:hover {
            cursor: pointer;
            scale: 110%;
            transition: 100ms;
          }

          .image-container {

          }

          img {
            border-radius: 10px;
            background-color: #f3ece6;
            margin-bottom: 0.25em;
            padding: 0 1em;
            align-self: center;
            max-width: 100%;
            image-rendering: pixelated
          }
        </style>

        <div class="pokemon-card">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this._pokemon.id}.png" alt=""/>

                <h5 class="pokemon-id">#${this._pokemon.number}</h5>
                <h4 class="pokemon-name">${toTitleCase(this._pokemon.name)}</h4>
        </div>`

        this.shadowDOM.querySelector('.pokemon-card').addEventListener('click', async function () {

            const modalElement = document.querySelector('modal-card');

            modalElement.pokemon = pokemonData;

            document.body.appendChild(modalElement);
        })
    }
}

customElements.define("pokemon-card", PokemonCard)
