// alert('Hello world!')


// for (let i = 1; i <= 100; i++) {
//     console.log(i);
// }

// let day = "Friday"

// if(day === "Sunday"){
//     console.log("YEEY! It's Sunday")
// } else if(day === "Saturday"){
//     console.log("Still weekend!!")
// } else{
//     console.log("Oh no!")
// }


// let favoriteFood = 'Pizza'
// document.write(favoriteFood)

let pokemonList = [
    { name: 'Bulbasaur', height: 70, type: ['grass', 'poison'] },
    { name: 'Charmander', height: 60, type: 'fire' },
    { name: 'Pidgey', height: 30, type: ['flying', 'normal'] },
    { name: 'Onix', height: 880, type: ['rock', 'ground'] },
    { name: 'Ekans', height: 200, type: ['poison'] },
]

for (let i = 0; i < pokemonList.length; i++) {
    document.write("<br>" + pokemonList[i].name + " " + "(height: " + pokemonList[i].height + ")")

    if (pokemonList[i].height >= 100) {
        document.write(" - Wow, that's big!")
    }
    else if (pokemonList[i].height >= 50) {
        document.write(" - That is avarage!")
    } else {
        document.write(" - That's so tiny!")
    }
}
