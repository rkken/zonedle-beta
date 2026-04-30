import { answers } from "./data.js";

document.addEventListener('DOMContentLoaded', () => {
    const suggestionDisplay = document.querySelector('.suggestions')
    const input = document.querySelector('.search')
    const imageDisplay = document.querySelector('.image')
    const focusOn = false

    //game logic vars
    let round = 1
    let attemptArr = []
    let resultArr = []
    let state = {}

    /* come back to this
    const saved = localStorage.getItem('state')
    if (saved) {
        const state = JSON.parse(saved)
        endGame(state)
    }
    */

    //solution set up (default for now)
    let index = 0
    let solution = answers[index]

    let scale = 10
    imageDisplay.src = solution.source
    imageDisplay.style.transformOrigin = solution.override ? solution.override : '30% 30%'
    imageDisplay.style.transform = `scale(${scale})`
    //for debugging purposes
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            index++
            solution = answers[index]
            imageDisplay.src = answers[index].source
            console.log(`${solution.game} - ${solution.zone}`)
            imageDisplay.style.transformOrigin = solution.override ? solution.override : '20%'
        }
        else if (event.key === 'ArrowLeft') {
            index--
            solution = answers[index]
            imageDisplay.src = answers[index].source
            console.log(`${solution.game} - ${solution.zone}`)
            imageDisplay.style.transformOrigin = solution.override ? solution.override : '20%'
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
            const statusIndicators = document.querySelectorAll('.status-container > div')
            resultArr.push('🟩')
            statusIndicators[round-1].style.backgroundColor = 'chartreuse'
            statusIndicators[round-1].style.opacity = '1'
            const solutionFound = true
            endGame(solutionFound)
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
        const statusIndicators = document.querySelectorAll('.status-container > div')
        if (!attempt) {
            resultArr.push('⬜️')
            statusIndicators[round-1].style.opacity = '1'
            statusIndicators[round-1].style.backgroundColor = '#b0b0b0ff'
        }
        else if (attempt.game === solution.game) {
            resultArr.push('🟧')
            statusIndicators[round-1].style.opacity = '1'
            statusIndicators[round-1].style.backgroundColor = '#ff8800ff'
        }
        else {
            resultArr.push('🟥')
            statusIndicators[round-1].style.opacity = '1'
            statusIndicators[round-1].style.backgroundColor = '#fc0000'
        }
        attempt ? attemptArr.push(attempt) : attemptArr.push('Skipped')
        console.log(...resultArr)

        if (round === 5) {
            endGame()
        }
        else {
        round++
        scale = scale - 2
        imageDisplay.style.transition = 'transform 0.3s ease'
        imageDisplay.style.transform = `scale(${scale})`

        console.log(`scale decreased to ${scale}`)
        console.log(`round ${round}`)

        input.value = ''
        }
    };

    function endGame(solutionFound) {
        const inputContainer = document.querySelector('.input-container')
        inputContainer.style.display = 'none'

        const resultContainer = document.querySelector('.result-container')
        resultContainer.classList.add('active');

        imageDisplay.src = solution.source
        imageDisplay.style.transform = `scale(1)`
        imageDisplay.style.transition = 'transform 500ms ease'

        const resultComment = document.querySelector('.result-comment')
        
        if (solutionFound) {
            switch (round) {
                case 5:
                    resultComment.innerText = 'Good'
                    resultComment.style.color ='#fc0000'
                    break;
                case 4:
                    resultComment.innerText = 'Great'
                    resultComment.style.color ='#fcfc00'
                    break;
                case 3:
                    resultComment.innerText = 'Awesome'
                    resultComment.style.color ='#fcfc00'
                    break;
                case 2:
                    resultComment.innerText = 'Outstanding!'
                    resultComment.style.color = '#b46c48'
                    break;
                case 1:
                    resultComment.innerText = 'Amazing!!'
                    resultComment.style.color = 'chartreuse'
                    break;
            }
        }
        else {
            resultComment.innerText = 'Too Bad!'
            resultComment.style.color ='#fc0000'
        }

        const resultZone = document.querySelector('.result-zone')
        const resultGame = document.querySelector('.result-game')

        resultZone.innerText = solution.zone
        resultGame.innerText = solution.game

        if (resultArr.length < 5) {
            console.log(resultArr.length)
            for (let i = resultArr.length; i < 5; i++) {
                resultArr.push('⬜️')
            }
        }
        const resultString = resultArr.join('')
        console.log(resultString)
        //state
        state = {
            round: round,
            solutionFound: solutionFound,
            solutionZone: solution.zone,
            solutionGame: solution.game,
            resultString: resultString,
            resultComment: resultComment.innerText
        }
    }
    //share button hook
    const shareButton = document.querySelector('.share-button')
    shareButton.addEventListener('click', () => {
        navigator.clipboard.writeText(
            `Sonic Zonedle 30/4/26 \n🔵: ${state.resultString} \n\n#${state.resultComment}`
        )

    });
});