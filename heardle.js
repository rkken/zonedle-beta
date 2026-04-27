document.addEventListener('DOMContentLoaded', () => {
    const suggestionDisplay = document.querySelector('.suggestions')
    const input = document.querySelector('.search')

    const options = ['Apple Sauce', 'Applejack', 'Application', 'Orange Juice', 'Bananarama']
    //suggestion display/fiter
    input.addEventListener('input', () => {
        const query = input.value.toLowerCase()
        const matches = options.filter(x => x.toLowerCase().includes(query))
        console.log(matches)
        //render (only if input is > 1 character)
        if (input.value.length > 1) {
            matches.forEach(x => {
                const li = document.createElement('li')
                li.innerText = x   
                document.querySelector('.suggestion-list').replaceChildren(li)
            });
        } 

    })



});