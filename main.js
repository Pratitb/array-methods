const user = document.querySelector('#addUser')
const double = document.querySelector('#double')
const million = document.querySelector('#million')
const rich = document.querySelector('#rich')
const total = document.querySelector('#total')
const userNameWealth = document.querySelector('.userNameWealth')

let data =[]

getRandomUser()
getRandomUser()
getRandomUser()

async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api')
    /* fetch happens behind the scenes, so basically we need to wait for it to finish */
    const data = await res.json()
    console.log(data)
    const user = data.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 100000)
    }

    addData(newUser)

    
}

// add new object to data array
function addData(newUserObj){
    data.push(newUserObj)
    updateDOM()
}

function updateDOM(providedData = data){
    userNameWealth.innerHTML = ''
    providedData.forEach(item => {
        const person = document.createElement('div')
        person.classList.add('person')
        person.innerHTML = 
        `<p class="username">${item.name}</p>
        <p class="user_wealth">${item.money}</p>`
        /* let oneUser = 
        `<div class="person">
            <ol type="1">
            <li class="username">${item.name}</li>
            </ol>
            <p class="user_wealth">${item.money}</p>
        </div>`; */
        userNameWealth.appendChild(person)
    })
}