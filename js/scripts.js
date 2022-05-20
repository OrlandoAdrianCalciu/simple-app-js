
//FOREACH LOOPS
let pokemonRepository = (function(){

let pokemonList = [
    { name: 'Bulbasaur', height: 70, type: ['grass', 'poison'] },
    { name: 'Charmander', height: 60, type: 'fire' },
    { name: 'Pidgey', height: 30, type: ['flying', 'normal'] },
    { name: 'Onix', height: 880, type: ['rock', 'ground'] },
    { name: 'Ekans', height: 200, type: ['poison'] },
]

pokemonList.forEach(function(pokemon){
    console.log(pokemon);
});

function getAll(){
    return pokemonList;
}

function add(){
    pokemonList.push(pokemon)
}

return{
    getAll:getAll,
    add:add
}

})();

pokemonRepository.getAll().forEach(function(pokemon){
    if(pokemon.height >= 100){
        document.write("<p>" + pokemon.name + " (height: " + pokemon.height + "cm" + ")" + " - Wow, that's big!")
    } else if(pokemon.height >= 50){
        document.write("<p>" + pokemon.name + " (height: " + pokemon.height + "cm" + ")" + " - That is avarage!")
    } else{
        document.write("<p>" + pokemon.name + " (height: " + pokemon.height + "cm" + ")" + " - That's so tiny!")
    }
});



// FOR LOOPS
// function printArrayDetails(){
//     for (let i = 0; i < pokemonList.length; i++) {
//         document.write("<br>" + pokemonList[i].name + " " + "(height: " + pokemonList[i].height + ")")

//         if (pokemonList[i].height >= 100) {
//             document.write(" - Wow, that's big!")
//         }
//         else if (pokemonList[i].height >= 50) {
//             document.write(" - That is avarage!")
//         } else {
//             document.write(" - That's so tiny!")
//         }
//     }
// }

// printArrayDetails();

