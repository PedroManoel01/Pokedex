const poke_container = document.getElementById('poke_container');
const poke_cards = document.getElementsByClassName('pokemon');
var pokemon_number = 898;

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url)
    const pokemon = await res.json();
    createPokemonCard(pokemon);
}

const getPokemonType = async url =>{
    const res = await fetch(url)
    const pokemon = await res.json();
    createPokemonCard(pokemon)
}

const fetchPokemons = async (pokemon_number) => {
    for(let i=1; i <= pokemon_number; i++ ){
        await getPokemon(i);
    }
}



const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');
    const { id, name, sprites, types } = pokemon;
    const type = types[0].type.name;
    if(id <= 898){
    const pokeInnerHTML = `
    <div class="img-container">
        <img src="${sprites.front_default}" alt="${name}"/>
    </div>
    <div class="info">
        <span class="number">${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
    </div>
    `;
    pokemonEl.innerHTML = pokeInnerHTML;
    poke_container.appendChild(pokemonEl);
}}

const getAllTypes = () => {
    fetch('https://pokeapi.co/api/v2/type')
        .then(res=> res.json())
           .then(pokemonType => {
                pokemonType.results.forEach(function(typeOfPokemon){
                    addButton(typeOfPokemon);
    })
    })
    }

const addButton = (pokemonType) => {

    let select = document.getElementById("botao");
    let button = document.createElement("button");
        if(pokemonType.name !== "unknown" & pokemonType.name !== "shadow"){
        button.innerHTML = `${pokemonType.name}`;
        select.append(button);
        }
        button.onclick = function() {
            counter = 0
            for(let i = poke_cards.length - 1; i >= 0; i--){
                poke_cards[i].remove();
            }
            getPokemonByType(pokemonType.url,counter)
        }
}

const getPokemonByType = (typeURL,counter) => {
    fetch(typeURL)
        .then(res => res.json())
           .then(pokemonType => {            
             pokemonType.pokemon.forEach(function(pokemon){ 
                getPokemonType(pokemonType.pokemon[counter].pokemon.url)
                counter = counter +1
    })
    })
    .catch((error) => {
    console.error("Error:", error);
    });
    }





fetchPokemons(pokemon_number);
getAllTypes();
