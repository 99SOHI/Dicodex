import logo from '../../assets/dicedex.svg'
import $ from 'jquery'
import '../../../node_modules/jquery-ui-dist/jquery-ui.min.js'
import {
    toTitleCase
} from '../other';

class HeroSection extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({
            mode: 'open'
        })
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
        <style>
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1em;
            padding: 25px;
            max-width: 400px;
            margin: 2em;
          }

          .boxes {
            /* From https://css.glass */
background: rgba(251, 203, 12, 0.6);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(6.1px);
-webkit-backdrop-filter: blur(6.1px);
border: 1px solid rgba(251, 203, 12, 0.11);
            display: flex;
            justify-content: center;
            border-radius: 5px;
          }

          .input-section {
            padding: 1em 2em;
            border-style: none;
            display: flex;
            justify-content: center;
            gap: 1em;
            width: 80%;
            overflow:hidden;
          }

          input, button {
            border-radius: 5px;
            border: none;
            padding: 0.4em;
            box-shadow: none;
          }

          button {
            background-color: white;
          }

          input {
            flex-grow: 1;
          }

          </style>


        
        `

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
    }
}

customElements.define('hero-section', HeroSection)
