import './pokemon-card'
import DataSource from '../data/data-source.js'
import {
    toTitleCase
} from '../other';

class ModalCard extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({
            mode: 'open'
        })
    }

    set pokemon(pokemon) {
        const src1 = `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`
        const src2 = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`


        const fetch = async (src1, src2) => {
            DataSource.getPokemon(src1).then(firstResult => {
                DataSource.getPokemon(src2).then(secondResult => {
                    let data = [firstResult, secondResult]
                    this.render(data)
                })
            }).catch(error => {
                console.log(error)
            })
        }

        fetch(src1, src2)
        this._pokemon = pokemon
    }

    set clickEvent(event) {
        this._clickEvent = event;
    }

    render(data) {
        let name = data[0].name

        // __
        let text = data[0].flavor_text_entries.filter(function (el) {
            return el.language.name == "en"
        })
        console.log(text)
        let flavorText = text[0].flavor_text.replace('\f', ' ')
        // --

        let height = data[1].height * 10 + " cm"
        let weight = data[1].weight / 10 + " kg"
        let abilities = data[1].abilities[0].ability.name

        let types = []
        data[1].types.forEach(el => {
            return types.push(el.type.name)
        })

        var evoChainUrl = []
        var evoChainId = []
        if (data[0].evolution_chain != []) {
            let evolutionChain = () => {
                DataSource.getPokemon(data[0].evolution_chain.url).then(res => {
                    let firstForm = res.chain.species.url
                    let firstEvolution = res.chain.evolves_to[0].species.url
                    let secondEvolution = res.chain.evolves_to[0].evolves_to[0]


                    evoChainUrl.push(firstForm.slice(42, 46).slice(0, -1))
                    evoChainUrl.push(firstEvolution.slice(42, 46).slice(0, -1))
                    if (secondEvolution) {
                        evoChainUrl.push(secondEvolution.species.url.slice(42, 46).slice(0, -1))
                    }

                    evoChainUrl.sort();
                })
            }
            evolutionChain()
            console.log(evoChainUrl)
        }


        this.shadowDOM.innerHTML = `<style>

        // <-- COLORS DICTIONARY -->
        .normal {
            background-color: #a8a97a ;
        }
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
            color: #98d8d8;
        }
        .fighting {
            background-color: #c03028 ;
        }
        .Poison {
            background-color: #a040a0 ;
        }
        .Ground {
            background-color: #e0c068 ;
        }
        .Flying {
            background-color: #a890f0 ;
        }
        .Psychic {
            background-color: #f85988 ;
        }
        .Bug {
            background-color: #a8b820 ;
        }
        .Rock {
            background-color: #b8a039 ;
        }
        .Ghost {
            background-color: #705898 ;
        }
        .Dark {
            background-color: #705848 ;
        }
        .Dragon {
            background-color: #7038f8 ;
        }
        .Steel {
            background-color: #b8b8d0 ;
        }
        .Fairy {
            background-color: #f0b6bc ;
        }


        // <-- COLORS DICTIONARY -->

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
            opacity: 0;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            transition: 200ms ease-in-out;
            pointer-events: none;
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
            width: 100%;
            max-width: 1000px;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: auto;
            overflow: auto;
            overflow-x: hidden;
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
        </style>

        <div id="overlay"></div>
      <div class="modal" id="modal">
        <div class="nav-button">
            <a href="#previous" class="previous-button"><img src="./assets/next-button.svg" alt=""></a>

            <a href="#next" class="next-button"><img src="./assets/next-button.svg" alt=""></a>
        </div>
        <h2 class="modal-pokemon-name">${toTitleCase(name)} <span>#${this._pokemon.number}</span></h2>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this._pokemon.id}.png" alt="${toTitleCase(name)}" class="pokemon-image">

        <div class="stats-container">
            <p class="flavor-text">${flavorText}</p>
            <div class="stats">
                <div class="height">
                    <p class="stats-key">Height</p>
                    <p class="stats-value">${height}</p>
                </div>
                <div class="weight">
                    <p class="stats-key">weight</p>
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

            <!-- EVOLUTION  LATER -->
        </div>
      </div>`

        let typeElement = this.shadowDOM.querySelector('.types')
        console.log(typeElement)
        types.forEach(t => {
            typeElement.innerHTML += `
        <p class="${toTitleCase(t)}">${toTitleCase(t)}</p>
        `
        })
        console.log(types)

        typeElement.append()
    }
}

customElements.define("modal-card", ModalCard)
