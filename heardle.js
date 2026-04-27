document.addEventListener('DOMContentLoaded', () => {
    const suggestionDisplay = document.querySelector('.suggestions')
    const input = document.querySelector('.search')
    const focusOn = false

    const options = ['Apple Sauce', 'Applejack', 'Application', 'Orange Juice', 'Orange Soda', 'Orange You Glad', 'Bananarama', 'Banana Bread', 'Banana Bomb']
    //suggestion display/fiter
    input.addEventListener('blur', () => {
        suggestionDisplay.style.opacity = '0%'
    })

    input.addEventListener('input', () => {
        const query = input.value.toLowerCase()
        const matches = options.filter(x => x.toLowerCase().includes(query))
        console.log(matches)
        //need to change this to be more strict (ie: stops matching when a letter is off)

        //render (only if input is > 1 character)
        if (input.value.length > 1 && matches.length > 0) {
            suggestionDisplay.style.opacity = '100%'
            const suggestionList = document.querySelector('.suggestion-list')
            suggestionList.replaceChildren()
            matches.forEach(x => {
                const li = document.createElement('li')
                li.innerText = x
                suggestionList.appendChild(li)
            });
        };
        const listItems = document.querySelectorAll('li')
        listItems.forEach(li => li.addEventListener('click', () => {
            input.value = li.innerText
        }));
    })



});