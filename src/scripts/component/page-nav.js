class PageNav extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({
            mode: 'open'
        });
    }

    set prevPage(prevPage) {
        this._prevPage = prevPage;
    }

    set nextPage(nextPage) {
        this._nextPage = nextPage;
    }

    set json(json) {
        this._json = json;
        this.render()
    }

    render() {

        this.shadowDOM.innerHTML = `

        <style>
        :host {
            width: 80%;
            margin: auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2em;
          }

          .page-nav {
            transition: 100ms;
          }

          .page-nav:hover {
            scale: 110%;
            cursor: pointer;
            transition: 100ms;
          }

          </style>

        <button class="page-nav prev disabled">Prev</button>
        <button class="page-nav next disabled">Next</button>
        `
        const prevButton = this.shadowDOM.querySelector('.prev')
        const nextButton = this.shadowDOM.querySelector('.next')

        if (this._json.next !== undefined) {
            nextButton.classList.remove("disabled")
        }

        if (this._json.prev !== undefined) {
            prevButton.classList.remove("disabled")
        }

        prevButton.addEventListener('click', this._prevPage);

        nextButton.addEventListener('click', this._nextPage);
    }
}

customElements.define("page-nav", PageNav)
