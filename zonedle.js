import { answers } from "./data.js";

document.addEventListener('DOMContentLoaded', () => {
    const suggestionDisplay = document.querySelector('.suggestions')
    const input = document.querySelector('.search')
    const imageDisplay = document.querySelector('.image')
    const focusOn = false

    const options = ['Apple Sauce', 'Applejack', 'Application', 'Orange Juice', 'Orange Soda', 'Orange You Glad', 'Bananarama', 'Banana Bread', 'Banana Bomb']

    const dailyAnswer = answers[2]
    let scale = 10
    imageDisplay.src = 'assets/s2/SCZ.png'
    imageDisplay.style.transform = `scale(${scale})`

    //solution set up (default for now)
    const solution = dailyAnswer.zone



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
                li.innerText = x.zone
                suggestionList.appendChild(li)
            });
        };
        const listItems = document.querySelectorAll('li')
        listItems.forEach(li => li.addEventListener('click', () => {
            input.value = li.innerText
        }));
    })

    //button hooking
    const submitButton = document.querySelector('.submit')
    
    submitButton.addEventListener('click', () => {
        const attempt = input.value
        if (attempt === solution) {
            console.log('solution found')
        };

    });

    const skipButton = document.querySelector('.skip')
    skipButton.addEventListener('click', () => {
        console.log('clicked')
        scale = scale - 2
        imageDisplay.style.transform = `scale(${scale})`
        console.log(`scale decreased to ${scale}`)
    })





});