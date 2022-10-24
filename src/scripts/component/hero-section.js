import logo from '../../assets/dicedex.svg'

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


        <img src="${logo}" alt="" />

        <div class="boxes">
          <div class="input-section">
            <input
              placeholder="Name / Pokedex Entry"
              id="searchElement"
              type="search"
            />
            <button id="searchButtonElement" type="submit">Search</button>
          </div>
        </div>
        `
    }
}

customElements.define('hero-section', HeroSection)
