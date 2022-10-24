function main() {

    document.addEventListener("DOMContentLoaded", () => {
        getPokemon();
    })

    let previousPage = ''
    let nextPage = ''

    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev')

    const getPokemon = async (src) => {
        try {

            if (src === undefined) {
                src = 'https://pokeapi.co/api/v2/pokemon-species'
            }

            const response = await fetch(src);
            const responseJson = await response.json();

            if (responseJson.error) {
                console.log(responseJson.message)
            } else {
                renderPage(responseJson)
                previousPage += responseJson.previous;
                nextPage += responseJson.next

                console.log(previousPage)
                console.log(nextPage)

                if (nextPage !== "null") {
                    nextButton.classList.remove("disabled")
                }

                if (previousPage !== "null") {
                    prevButton.classList.remove("disabled")
                }

                console.log(responseJson.next)


            }
        } catch (error) {
            console.log(error)
        }
    }

    const renderPage = (pokemons) => {
        const pokemonListElement = document.querySelector('#listPokemon');
        pokemonListElement.innerHTML = '';

        // let currentPage = ""
        // let pokemonData

        // if (currentPage == "") {
        //     currentPage = "https://pokeapi.co/api/v2/pokemon-species"
        // }

        // $.getJSON(currentPage, function (data) {
        //     pokemonData = data
        //     console.log(pokemonData)
        // })
        let results = pokemons.results

        results.forEach(pokemon => {

            pokemon.id = pokemon.url.slice(42, 46).slice(0, -1)

            if (pokemon.id.length > 2) {
                pokemon.number = pokemon.id
            } else if (pokemon.id.length > 1) {
                pokemon.number = "0" + pokemon.id
            } else {
                pokemon.number = "00" + pokemon.id
            }

            pokemonListElement.innerHTML += `
            <a href="#test" class="pokemon-card">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
                  alt=""
                />
                <h5 class="pokemon-id">#${pokemon.number}</h5>
                <h4 class="pokemon-name">${toTitleCase(pokemon.name)}</h4>
            </a>`

        })

    }

    // To Title Case Function
    function toTitleCase(str) {
        return str.replace("-", " ").replace(
            /\b\w+/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }


}

export default main;
