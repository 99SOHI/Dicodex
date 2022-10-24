class ModalCard extends HTMLElement {
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
        <sytle>
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

customElements.define("pokemon-card", PokemonCard)
