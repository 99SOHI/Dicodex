class ModalCard extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({
            mode: 'open'
        })
    }

    connectedCallback() {
        this.render();
    }

    set pokemon(pokemon) {
        this._pokemon = pokemon;
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
        <sytle>
        #overlay {
            z-index: 999;
            opacity: 1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            transition: 200ms ease-in-out;
            pointer-events: none;
          }

          .modal {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(1);
            transition: 200ms ease-in-out;
            border-radius: 10px;
            z-index: 1000;
            background-color: #dddfda;
            width: 100%;
            max-width: 1300px;
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

        </sytle>

        <div id="overlay"></div>
      <div class="modal" id="modal">
        <div class="nav-button">
            <a href="#previous" class="previous-button"><img src="./assets/next-button.svg" alt=""></a>

            <a href="#next" class="next-button"><img src="./assets/next-button.svg" alt=""></a>
        </div>
        <h2 class="modal-pokemon-name">Bulbasaur <span>#001</span></h2>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" alt="" class="pokemon-image">

        <div class="stats-container">
            <p class="flavor-text">There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.</p>
            <div class="stats">
                <div class="height">
                    <p class="stats-key">Height</p>
                    <p class="stats-value">2' 04"</p>
                </div>
                <div class="weight">
                    <p class="stats-key">weight</p>
                    <p class="stats-value">15.2 lbs</p>
                </div>
                <div class="gender">
                    <p class="stats-key">Gender</p>
                    <p class="stats-value">"placeholder"</p>
                </div>
                <div class="category">
                    <p class="stats-key">Category</p>
                    <p class="stats-value">Seed</p>
                </div>
                <div class="abilities">
                    <p class="stats-key">Abilities</p>
                    <p class="stats-value">Overgrow</p>
                </div>
            </div>

            <div class="modal-pokemon-type">
                <p>Type</p>
                <div class="types">
                    <p class="grass">Grass</p>
                <p class="poison">Poison</p>
                </div>
            </div>

            <div class="weaknesses-container">
                <p>Weaknesses</p>
                <div class="weaknesses">
                    <p class="fire">Fire</p>
                    <p class="psychic">Psychic</p>
                    <p class="flying">Flying</p>
                    <p class="ice">Ice</p>
                </div>
            </div>
            <!-- EVOLUTION  LATER -->
        </div>


      </div>`
    }
}

customElements.define("modal-card", ModalCard)
