import { answers } from "./data.js";

document.addEventListener('DOMContentLoaded', () => {
    const suggestionDisplay = document.querySelector('.suggestions')
    const input = document.querySelector('.search')
    const imageDisplay = document.querySelector('.image')
    const focusOn = false

    const options = ['Apple Sauce', 'Applejack', 'Application', 'Orange Juice', 'Orange Soda', 'Orange You Glad', 'Bananarama', 'Banana Bread', 'Banana Bomb']

    //game logic vars
    let round = 1


    //solution set up (default for now)
    let index = 0
    let solution = answers[index]

    let scale = 10
    imageDisplay.src = solution.source
    imageDisplay.style.transform = `scale(${scale})`
    //for debugging purposes
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            index++
            solution = answers[index]
            imageDisplay.src = answers[index].source
        }
        else if (event.key === 'ArrowLeft') {
            index--
            solution = answers[index]
            imageDisplay.src = answers[index].source
        }
    })



    //suggestion display/fiter
    input.addEventListener('blur', () => {
        suggestionDisplay.style.opacity = '0%'
    })

    input.addEventListener('input', () => {
        const query = input.value.toLowerCase()
        const matches = answers.filter(x => x.zone.toLowerCase().includes(query))
        console.log(matches)
        //need to change this to be more strict (ie: stops matching when a letter is off)

        //render (only if input is > 1 character)
        if (input.value.length > 1 && matches.length > 0) {
            suggestionDisplay.style.opacity = '100%'
            const suggestionList = document.querySelector('.suggestion-list')
            suggestionList.replaceChildren()
            matches.forEach(x => {
                const li = document.createElement('li')

                const title = document.createElement('div')
                title.textContent = x.zone

                const game = document.createElement('div')
                game.textContent = x.game

                li.appendChild(title);
                li.appendChild(game);
                
                suggestionList.appendChild(li)
            });
        };
        const listItems = document.querySelectorAll('li')
        listItems.forEach(li => li.addEventListener('click', () => {
            input.value = li.children[0].innerText
        }));
    })

    //button hooking
    const submitButton = document.querySelector('.submit')
    
    submitButton.addEventListener('click', () => {
        const attempt = answers.find(x => x.zone === input.value)
        if (attempt.zone === solution.zone) {
            console.log('solution found')
        }
        else {
            nextRound(attempt)
        }
    });

    const skipButton = document.querySelector('.skip')
    skipButton.addEventListener('click', () => {
        console.log('clicked')
        nextRound()
    });

    function nextRound(attempt) {
        console.log(attempt)
        if (attempt.game === solution.game) {
            console.log('🟧')
        }
        else {
            console.log('🟥')
        }
        round++
        scale = scale - 2
        imageDisplay.style.transition = 'transform 0.3s ease'
        imageDisplay.style.transform = `scale(${scale})`
        console.log(`scale decreased to ${scale}`)
        console.log(`round ${round}`)


    }





});