import './pokemon-card';
import DataSource from '../data/data-source.js';
import {
    getIdFromUrl,
    numbering,
    toTitleCase
} from '../../app';

class ModalCard extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({
            mode: 'open'
        });
    }

    set pokemon(pokemon) {
        this._pokemon = pokemon;

        const src = `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`;

        this.fetch(src);
    }

    // set nextPokemon(event) {
    //     const src = `https://pokeapi.co/api/v2/pokemon-species/${this._pokemon.id}`;
    // }

    // set clickEvent(event) {
    //     this._clickEvent = event;
    // }

    // async getName(src) {
    //     DataSource.getPokemon(src).then(result => {

    //     });
    // }

    async fetch(src) {
        DataSource.getPokemon(src).then(firstResult => {
            DataSource.getPokemon(`https://pokeapi.co/api/v2/pokemon/${firstResult.varieties[0].pokemon.name}`).then(secondResult => {
                let data = [firstResult, secondResult];
                this.render(data);
            });
        }).catch(error => {
            console.log(error);
        });
    }

    render(data) {
        const name = data[0].name;
        const id = data[0].id;
        const number = numbering(id);

        // __
        let text = data[0].flavor_text_entries.filter(function (el) {
            return el.language.name == 'en';
        });
        const flavorText = text[0].flavor_text.replace('\f', ' ');
        // --

        const height = data[1].height * 10 + ' cm';
        const weight = data[1].weight / 10 + ' kg';
        const abilities = data[1].abilities[0].ability.name;
        const types = [];
        data[1].types.forEach(el => {
            return types.push(el.type.name);
        });

        this.shadowDOM.innerHTML = `<style>
        .fire {
            background-color: #f08030 ;
        }
        .water {
            background-color: #6890f0 ;
        }
        .grass {
            background-color: #78c850 ;
        }
        .electric {
            background-color: #f8d030 ;
        }
        .ice {
            background-color: #98d8d8;
        }
        .fighting {
            background-color: #c03028 ;
        }
        .poison {
            background-color: #a040a0 ;
        }
        .ground {
            background-color: #e0c068 ;
        }
        .flying {
            background-color: #a890f0 ;
        }
        .psychic {
            background-color: #f85988 ;
        }
        .bug {
            background-color: #a8b820 ;
        }
        .rock {
            background-color: #b8a039 ;
        }
        .ghost {
            background-color: #705898 ;
        }
        .dark {
            background-color: #705848 ;
        }
        .dragon {
            background-color: #7038f8 ;
        }
        .steel {
            background-color: #b8b8d0 ;
        }
        .fairy {
            background-color: #f0b6bc ;
        }
        .normal {
            background-color: #a8a97a ;
        }



        ::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            background-color: #f5f5f5;
          }

          ::-webkit-scrollbar {
            width: 12px;
            background-color: #f5f5f5;
            border-radius: 10px;
          }

          ::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            background-color: #555;
          }

        #overlay {
            position: fixed;
            z-index: 999;
            opacity: 1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            transition: 200ms ease-in-out;
          }

          .modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(1);
            transition: 200ms ease-in-out;
            border-radius: 10px;
            z-index: 1000;
            background-color: #dddfda;
            width: 800px;
            max-width: 100%;
            height: 100vh;
            margin: auto;
            overflow-x: hidden;
          }

          .modal-guts {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 1001;
          }

          .close-button {
            position: absolute;
            cursor: pointer;
            border: 0;
            top: 1em;
            right: 1em;
            background: red;
            color: white;
            padding: 5px 10px;
            font-size: 1.3rem;
            border-radius: 5px;
            z-index: 1002;
            transition: 100ms;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          }

          .close-button:hover {
            cursor: pointer;
            scale: 110%;
            transition: 100ms;
          }

          .close-button > p {
            margin: 0;
          }

          .nav-button {
            display: flex;
            flex-wrap: nowrap;
            width: 90%;
            gap: 1em;
            margin: 1em auto -2.5em auto;
            justify-content: space-evenly;
          }

          .nav-button > a {
            width: 40%;
          }

          .next-button {
            transform: scaleX(-1);
          }

          .pokemon-image {
            text-align: center;
            width: 30%;
          }

          .stats-container {
            display: flex;
            flex-direction: column;
            margin: 1em;
            padding: 1em;
            gap: 1em;
            align-items: center;
          }

          .flavor-text {
            width: 90%;
          }

          .stats {
            height: 100px;
            width: 90%;
            padding: 1em;
            background-color: gray;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            gap: 1em;
            align-self: center;
          }

          .stats-key {
            color: white;
            font-weight: bold;
          }

          .stats-value {
            color: black;
          }

          .modal-pokemon-type,
          .weaknesses-container {
            width: 90%;
            display: flex;
            flex-direction: column;
            gap: 1em;
          }

          .types,
          .weaknesses {
            display: flex;
            gap: 1em;
          }

          .types > p,
          .weaknesses > p {
            padding: 0.25em 2em;
            border-radius: 5px;
          }

          .evolution-chain {
            margin-top: 32px;
            gap: 1.5em;
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            background-color: #353535;
            padding: 1.5em 0em;
            border-radius: 10px;
            min-height: 200px;
            flex-wrap: wrap;
          }

          .evolution-notice {
            align-self: center;
            font-size: 1.5em;
            color: gray;
          }

          .evolution {
            display: flex;
            flex-direction: column;
            gap: 1em;
            align-items: center;
            justify-content: start;
            transition: 100ms;
            cursor: pointer;
            margin: 10px;
          }

          .evolution:hover {
            scale: 110%;
            transition: 100ms;
          }

          .evolution > p {
            color: #d4f4ff;
            font-weight: normal;
            margin: 0;
          }

          .evolution > .pokemon {
            font-weight: bold;
            color: white;
          }

          .evolution > img {
            padding: 1em;
            /* From https://css.glass */
            background: rgba(255, 255, 255, 0.19);
            border-radius: 50%;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(5px);
            image-rendering: pixelated;
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.3);
          }

          .evolution-notice {
            padding: 1em;
          }

          @media only screen and (max-width: 800px) {
            .modal {
                border-radius: 0;
            }

            .close-button {
                bottom: 0;
                top: auto;
                right: auto;
                width: 100%;
                height: 32px;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              .close-button:hover {
                scale: 100%;
                background-color: #ffce0b;
                color: white;
              }

              .evolution-chain {
                margin-bottom: 5vh;
              }

              .stats {
                height: auto;
              }
          }

          @media only screen and (max-width: 500px) {

          }
        </style>

        <div id="overlay"></div>

        <div class="modal" id="modal">
        <div class="close-button"><p><< Close</p></div>

        <div class="modal-guts">
        <h2 class="modal-pokemon-name">${toTitleCase(name)} <span>#${number}</span></h2>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="${toTitleCase(name)}" class="pokemon-image">

        <div class="stats-container">
            <p class="flavor-text">${flavorText}</p>

            <div class="stats">
                <div class="height">
                    <p class="stats-key">Height</p>
                    <p class="stats-value">${height}</p>
                </div>

                <div class="weight">
                    <p class="stats-key">Weight</p>
                    <p class="stats-value">${weight}</p>
                </div>

                <div class="abilities">
                    <p class="stats-key">Abilities</p>
                    <p class="stats-value">${toTitleCase(abilities)}</p>
                </div>
            </div>

            <div class="modal-pokemon-type">
                <p>Types</p>
                <div class="types">
                </div>
            </div>

            <div class="evolution-chain"></div>

        </div>
      </div>

      </div>`;

        const typeElement = this.shadowDOM.querySelector('.types');

        types.forEach(t => {
            typeElement.innerHTML += `
        <p class="${t}">${toTitleCase(t)}</p>
        `;
        });
        typeElement.append();

        const evoChainElement = this.shadowDOM.querySelector('.evolution-chain');

        const evolutionResult = async () => {
            let evoChainData = [];
            try {
                if (data[0].evolution_chain != null) {
                    const result = await DataSource.getPokemon(data[0].evolution_chain.url);

                    if (result.chain.evolves_to.length) {
                        let firstForm = result.chain.species;

                        let firstEvolution = result.chain.evolves_to[0].species;

                        let secondEvolution = result.chain.evolves_to[0].evolves_to[0];

                        evoChainData.push({
                            id: getIdFromUrl(firstForm.url),
                            name: firstForm.name
                        });

                        evoChainData.push({
                            id: getIdFromUrl(firstEvolution.url),
                            name: firstEvolution.name
                        });

                        if (secondEvolution) {

                            evoChainData.push({
                                id: getIdFromUrl(secondEvolution.species.url),
                                name: secondEvolution.species.name
                            });
                        }

                        return evoChainData;
                    } else {
                        return evoChainData;
                    }
                } else {
                    return evoChainData;
                }
            } catch (error) {
                throw new Error(error);
            }
        };


        evolutionResult()
            .then(result => {
                if (result.length) {
                    evoChainElement.innerHTML = `
                    <div class="base evolution">
                    <p>Base Pokemon</p>
                    <p class="pokemon">${toTitleCase(result[0].name)}</p>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${toTitleCase(result[0].id)}.png" alt="" />
                    </div>

                    <div class="first evolution">
                    <p>First Evolution</p>
                    <p class="pokemon">${toTitleCase(result[1].name)}</p>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${toTitleCase(result[1].id)}.png" alt="" />
                    </div>
                    `;

                    if (result[2]) {
                        evoChainElement.innerHTML += `
                        <div class="second evolution">
                            <p>Second Evolution</p>
                            <p class="pokemon">${toTitleCase(result[2].name)}</p>
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${toTitleCase(result[2].id)}.png" alt=""/>
                        </div>
                        `;
                    }
                    evoChainElement.append();

                    const base = this.shadowDOM.querySelector('.base');

                    const first = this.shadowDOM.querySelector('.first');

                    base.addEventListener('click', () => {
                        this.fetch(`https://pokeapi.co/api/v2/pokemon-species/${result[0].id}`, `https://pokeapi.co/api/v2/pokemon/${result[0].name}`);
                    });

                    first.addEventListener('click', () => {
                        this.fetch(`https://pokeapi.co/api/v2/pokemon-species/${result[1].id}`, `https://pokeapi.co/api/v2/pokemon/${result[1].name}`);
                    });

                    if (result[2]) {
                        const second = this.shadowDOM.querySelector('.second');

                        second.addEventListener('click', () => {
                            this.fetch(`https://pokeapi.co/api/v2/pokemon-species/${result[2].id}`, `https://pokeapi.co/api/v2/pokemon/${result[2].name}`);
                        });
                    }

                } else {
                    evoChainElement.innerHTML += `
                    <p class="evolution-notice">This Pokemon Doesn't Evolve :(</p>`;
                }

            }).catch(error => {
                console.log(error);
            });

        const closeButton = this.shadowDOM.querySelector('.close-button');

        const overlay = this.shadowDOM.querySelector('#overlay');

        closeButton.addEventListener('click', () => {
            this.shadowDOM.innerHTML = '';
        });
        overlay.addEventListener('click', () => {
            this.shadowDOM.innerHTML = '';
        });
    }
}

customElements.define('modal-card', ModalCard);
