
//FOREACH LOOPS
let pokemonRepository = (function () {
    let pokemonList = [
        // { name: 'Bulbasaur', height: 70, type: ['grass', 'poison'] },
        // { name: 'Charmander', height: 60, type: 'fire' },
        // { name: 'Pidgey', height: 30, type: ['flying', 'normal'] },
        // { name: 'Onix', height: 880, type: ['rock', 'ground'] },
        // { name: 'Ekans', height: 200, type: ['poison'] },
    ];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=20';
    let modalContainer = document.querySelector('#modal-container');

    // pokemonList.forEach(function (pokemon) {
    //     console.log(pokemon);
    // });


    function add(pokemon) {
        if (pokemon.name && pokemon.detailsUrl) {
            pokemonList.push(pokemon);
        } else {
            console.log("Pokemon is not correct");
        }
    }

    function getAll() {
        return pokemonList;
    }


    function addListItem(pokemon) {
        let list = document.querySelector(".pokemon-list");

        let listItem = document.createElement("li");
        listItem.classList.add("col-6", "mx-auto");

        let button = document.createElement("button");
        button.innerText = pokemon.name;
        // button.classList.add("button-class");
        button.classList.add("btn", "btn-outline-primary", "btn-lg", "btn-block", "text-capitalize")

        listItem.appendChild(button);
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '.modal');
        list.appendChild(listItem);
        addEvent(button, pokemon)
    }

    function addEvent(button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function showModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');

        modalTitle.empty();
        modalBody.empty();

        let pokemonName = $(`<h5 class="text-uppercase">${pokemon.name}</h5>`);
        let pokemonImg = $(`<img class="rounded mx-auto d-block w-50 p-3" src='${pokemon.imageUrl}' alt="Picture of the Pokemon ${pokemon.name}">`);
        let pokemonHeight = $(`<p class="ml-4 mt-3 mb-0">Height: ${pokemon.height}</p>'`);



        modalTitle.append(pokemonName);
        modalBody.append(pokemonImg);
        modalBody.append(pokemonHeight);


    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    function loadList() {
        return fetch(apiURL).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        });
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    }

})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {

        pokemonRepository.addListItem(pokemon);

        //     if(pokemon.height >= 100){
        //         document.write("<p>" + pokemon.name + " (height: " + pokemon.height + "cm" + ")" + " - Wow, that's big!")
        //     } else if(pokemon.height >= 50){
        //         document.write("<p>" + pokemon.name + " (height: " + pokemon.height + "cm" + ")" + " - That is avarage!")
        //     } else{
        //         document.write("<p>" + pokemon.name + " (height: " + pokemon.height + "cm" + ")" + " - That's so tiny!")
        //     }
    });
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

