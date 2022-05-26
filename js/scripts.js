
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
        if(pokemon.name && pokemon.detailsUrl){
            pokemonList.push(pokemon);
        } else{
            console.log("Pokemon is not correct");
        }
    }

    function getAll() {
        return pokemonList;
    }


    function addListItem(pokemon) {
        let list = document.querySelector(".pokemon-list");

        let listItem = document.createElement("li");

        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");

        listItem.appendChild(button);
        list.appendChild(listItem);
        addEvent(button, pokemon)
    }

    function addEvent(button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function (){
            showModal(pokemon);
        });
    }

    function showModal(pokemon){
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h2');
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement('p');
        contentElement.innerText = `Height: ${pokemon.height}`;

        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;
        imageElement.classList.add('pokemon-img');


        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    function hideModal(){
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

    function loadDetails(item){
        let url = item.detailsUrl;
        return fetch(url).then(function(response){
            return response.json();
        }).then(function (details){
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e){
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
          if(target === modalContainer){
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

pokemonRepository.loadList().then(function(){
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

