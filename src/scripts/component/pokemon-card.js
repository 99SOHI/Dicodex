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

    render() {
        this.shadowDOM.innerHTML = `
        <style>
        a {
            color: inherit;
            text-decoration: none;
          }

        *{
            margin: 0;
        }

        :host {
            display: flex;
            height: 120px;
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

          :host:hover {
            scale: 110%;
            transition: 100ms;
          }

          :host > img {
            align-self: center;
            border-radius: 10px;
            background-color: #f3ece6;
            margin-bottom: 0.25em;
            padding: 0 54px;
          }
        </style>

                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this._pokemon.id}.png"
                  alt=""
                />
                <h5 class="pokemon-id">#${this._pokemon.number}</h5>
                <h4 class="pokemon-name">${this._pokemon.name}</h4>`
    }
}

customElements.define("pokemon-card", PokemonCard)
