
//FOREACH LOOPS
let pokemonRepository = (function () {
    let pokemonList = [
    ];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=20';
    let modalContainer = document.querySelector('#modal-container');
    let input = $('input');
    input.on('input', filterList)



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
        listItem.classList.add("col-xs-8","col-sm-8", "col-8", "mx-auto");

        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("btn", "button-class", "btn-outline-primary", "btn-lg", "btn-block", "text-capitalize")

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
        let pokemonWeight = $(`<p class= ml-4 mb-0>Weight: ${pokemon.weight}</p>`);
        let pokemonTypes = $(`<p class = ml-4 mb-0>Types: ${pokemon.types}</p>`)



        modalTitle.append(pokemonName);
        modalBody.append(pokemonImg);
        modalBody.append(pokemonHeight);
        modalBody.append(pokemonWeight)


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

    function filterList() {
        let inputValue = $('input').val();
        let list = $('li');
        list.each(function () {
          let item = $(this);
          let name = item.text();
          if (name.startsWith(inputValue)) {
            item.show();
          } else {
            item.hide();
          }
        });
      }


    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
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
        showDetails: showDetails,
        filterList: filterList
    }

})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {

        pokemonRepository.addListItem(pokemon);


    });
});



