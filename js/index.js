document.addEventListener("DOMContentLoaded", () => {
    let page = 1
    const baseUrl = "http://localhost:3000/monsters"

    const renderMonster = (monster, monsterContainer) => {
    
    
        const monsterDiv = document.createElement("div")
        
    
        monsterDiv.innerHTML = `
            <h2>${monster.name}</h2>
            <h4>Age: ${monster.age}</h4>
            <p>Bio: ${monster.description}</p>
        `
    
        monsterContainer.append(monsterDiv)
    }

    const renderMonsters = monsters => {
        const monsterContainer = document.querySelector("#monster-container")
        console.log(monsters)
    
        for(const monster of monsters){
            renderMonster(monster, monsterContainer)
        }
    }

    const getMonsters = () => {
        fetch(baseUrl + `/?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
            renderMonsters(monsters)
        })
    }

    const submitHandler = () => {
        const createMonsterForm = document.querySelector('.create-monster-form')
    
        createMonsterForm.addEventListener('submit', e => {
            e.preventDefault()
            const form = e.target
    
            const name = form.name.value
            const age = form.age.value
            const description = form.description.value
    
            const newMonster = { name: name, age: age, description: description }
    
            const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(newMonster)
        }
        
        fetch(baseUrl, options)
        .then(response => response.json())
        .then(monster => {
            const monsterContainer = document.querySelector("#monster-container")
            renderMonster(monster, monsterContainer)
            document.querySelector('.create-monster-form').reset()
        })
    
        })
    }

    const clickHandler = () => {
        document.addEventListener('click', e => {
            if(e.target.matches('#back')){
                if(page >=2){
                    --page
                    getMonsters()
                }

            }else if(e.target.matches('#forward')){
                ++page
                getMonsters()

            }
        })

    }

    getMonsters()
    submitHandler()
    clickHandler()
})