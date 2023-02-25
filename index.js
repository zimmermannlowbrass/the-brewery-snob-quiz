let choices
let correctChoices
let correctChoice
let difficulty
let possible_breweries = document.querySelector('#possible_breweries')
let select_difficulty = document.querySelector('select')
let form = document.querySelector('form')


function resetAllChoices() {
    choices = []
    correctChoice = null
    correctChoices = []
    possible_breweries.innerText = ''
}


document.addEventListener('DOMContentLoaded', () => {
    select_difficulty.addEventListener('change', () => {
        resetAllChoices()
        difficulty = select_difficulty.value
        gatherPossibleWrongChoices(difficulty)
        
    })
    form.addEventListener('submit', (e) => {
        if (difficulty){
            e.preventDefault()
            possible_breweries.innerText = ''
            let city = e.target['city'].value
            let state = e.target['state'].value
            grabCorrectAnswerBrewery(city, state)
            form.reset()
            select_difficulty.selectedIndex = 0
            difficulty = null
        } else {
            alert('Pick a difficulty!')
        }
    })
})

function gatherPossibleWrongChoices(difficulty) {
    let i = 0
    while(i < (difficulty-1)) {
        let x = Math.floor(Math.random() * 8170)
        fetch(`https://api.openbrewerydb.org/breweries?page=${x}&per_page=1`)
        .then(resp => resp.json())
        .then(data => choices.push(data[0]))
        i++
    }
}




function grabCorrectAnswerBrewery(city, state) {
    //
    fetch(`https://api.openbrewerydb.org/breweries?by_type=micro&by_state=${state}&by_city=${city}&per_page=50`)
    .then(resp => resp.json())
    .then(data => {
        let len = data.length
        if (len === 0) {
            alert('There are no breweries in this city! Try again')
        }
        correctChoices.push(data)
        correctChoice = randomCorrectBrewery(correctChoices, len)
        choices.push(correctChoice)
        choices = shuffleAllPossibleChoices(choices)
        choices.forEach(choice => populateAllPossibleChoices(choice))
        })   
    } 

function randomCorrectBrewery (correctChoices, len) {
    let x = Math.floor(Math.random() * len)
    return correctChoices[0][x]
}




function shuffleAllPossibleChoices(choices) {
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = choices[i];
        choices[i] = choices[j];
        choices[j] = temp;
        }
    return choices
}



function populateAllPossibleChoices(choice) {
    let name = choice.name
    //need to add a click event listener as well as drag/drop feature!
    let possible_breweries = document.querySelector('#possible_breweries')
    let p = document.createElement('p')
    p.className = 'choice'
    p.innerText = name
    p.addEventListener('click', () => {
        if (name === correctChoice.name) {
            alert('YOU ARE A BEER SNOB!')
        } else {
            alert('try again :(')
        }
    })
    possible_breweries.appendChild(p)


}


/////////////////////
function checkForDuplicates(choice) {
    if((city !== choice[0].city) && (state !== choice[0].state)) {
        console.log('hi')
    }
}