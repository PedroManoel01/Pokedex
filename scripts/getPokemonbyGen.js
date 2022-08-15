const poke_container = document.getElementById('poke_container');
const poke_cards = document.getElementsByClassName('pokemon');
var pokemon_number = 898;

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url)
    const pokemon = await res.json();
  
    createPokemonCard(pokemon);
}

const getPokemonId = async url =>{
    const res = await fetch(url)
    const pokemon = await res.json();
}
const getPokemonGen = async url =>{
    const res = await fetch(url)
    const pokemon = await res.json();
    console.log(pokemon);
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

const getAllGenerations = () => {
    fetch('https://pokeapi.co/api/v2/generation')
        .then(res=> res.json())
           .then(pokemonGen => {
                pokemonGen.results.forEach(function(GenerationOfPokemon){
                    addButton(GenerationOfPokemon);
    })
    })
    }

const addButton = (pokemonGen) => {

    let select = document.getElementById("botao");
    let button = document.createElement("button");
    button.innerHTML = `${pokemonGen.name}`;
    select.append(button);
    button.onclick = function() {
        for(let i = poke_cards.length - 1; i >= 0; i--){
            poke_cards[i].remove();
            }
       getPokemonByGeneration(pokemonGen.url)
        }
    }
    const getPokemonByGeneration = (genURL,counter) => {
        fetch(genURL)
            .then(res => res.json())
               .then(pokemonGen => {            
                for(let i = pokemonGen.pokemon_species.length - 1; i >= 0; i--){
                    getPokemonGen(pokemonGen.pokemon_species[i].url);

        }})
        
        .catch((error) => {
        console.error("Error:", error);
        });
        }
 
        
fetchPokemons(pokemon_number);
getAllGenerations();

    
    