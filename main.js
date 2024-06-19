let ballsWeHave = 5;

document.querySelector("#pokeballs").value = ballsWeHave;//hidden input value
document.querySelector("#pokeballsDisplay").innerText = ballsWeHave;//display in HTML
let pokeballsHolder = document.querySelector("#pokeballs");
let rndPokeNo = 1 + Math.round(Math.random() * (248));
console.log(rndPokeNo);
async function playGame() {
    let gameStatus = document.querySelector("#gameStart");
    let pokemon = await fetchPokemon(rndPokeNo);
    switch (gameStatus.value) {
        case "1":
            document.querySelector("#btn-container").innerHTML = '<button class="btn btn-info" id="btn">Pagauk pokemona!</button>';
            document.querySelector("#pokemon-container").innerHTML = '<div id="pokemon"></div>';
            gameStatus.value = 2;
          
            document.querySelector("#pokemon").innerHTML = '<img src="' + pokemon.photo + '" alt="">';
            resetButton();
            break;
        case "2":
        
            pokeballsHolder.value = pokeballsHolder.value - 1;
            document.querySelector("#pokeballsDisplay").innerText = pokeballsHolder.value;
            if (Math.random() < 0.5) {// 50% tikimybė pagauti
                gameStatus.value = 3;
                document.querySelector("#btn-container").innerHTML = '<button class="btn btn-danger" id="btn">Perziureti laimiki</button>';
            } else {
                if (pokeballsHolder.value == 0) {
                    console.log("baiges kamuoliai");
                    document.querySelector("#pokemon-container").innerHTML = "<h1>Baigės kamuoliai</h1>";
                    document.querySelector("#btn-container").innerHTML = "";
                    return;
                }
                document.querySelector("#btn-container").innerHTML = '<button disabled class="btn btn-info" id="btn">Pagauk pokemona!</button>';
                setTimeout(function () {    
                    document.querySelector("#btn").disabled = false;
                }, 1000);
            }
            break;
        case "3":
            document.querySelector("#pokemon").innerHTML = '<h1>Pokemonas</h1>';
            document.querySelector("#btn-container").innerHTML = "";
            gameStatus.value = 3;
            break;

        default:
            break;
    }
    resetButton();
}
document.querySelector("#btn").addEventListener("click", playGame);
function resetButton() {
    const btn = document.querySelector("#btn");
    if (btn) {
        btn.removeEventListener("click", playGame);
        btn.addEventListener("click", playGame);
    }
}

async function fetchPokemon(rndPokeNo) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + rndPokeNo);
    const data = await response.json();
    return {
         photo: data.sprites.front_default,
         stats: {
            hp : Math.round(data.stats[0].base_stat * (0.7 + Math.random() * (1.3 - 0.7))),
            attack : Math.round(data.stats[1].base_stat * (0.7 + Math.random() * (1.3 - 0.7))),
            defence : Math.round(data.stats[2].base_stat * (0.7 + Math.random() * (1.3 - 0.7))),

         } 
        };
}

document.querySelector("#btn").addEventListener("click", playGame);


