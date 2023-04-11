const user = document.querySelector('#addUser')
const double = document.querySelector('#double')
const million = document.querySelector('#million')
const rich = document.querySelector('#rich')
const total = document.querySelector('#total')
const userNameWealth = document.querySelector('.userNameWealth')

let data =[]

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
// update DOM with elements
function updateDOM(providedData = data){
    userNameWealth.innerHTML = ''
    providedData.forEach(item => {
        const person = document.createElement('div')
        person.classList.add('person')
        person.innerHTML = 
        `<p class="username">${item.name}</p>
        <p class="user_wealth">${formatNumber.format(item.money)}</p>`
        userNameWealth.appendChild(person)
    })
}
// format number as money
let formatNumber = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    useGrouping: true, //default value
    maximumSignificantDigits: 5,
    //if this is 3, this means 108,289 will become 108,000
});
// doubleMoney
function doubleMoney(){
    data = data.map((user) => {
        return {...user, money: user.money*2}
    })
    updateDOM()
}

/* new Intl.NumberFormat takes in 2 parameters. locales & options
both are optional. Intl.NumberFormat can be called with or without new
if no parameters are passed, it will format with commas only
locales is geographical region. it does not add currency symbol
options is the main parameter. it is a JS object which holds other params.
refer above */

// event listeners
user.addEventListener('click', getRandomUser)
double.addEventListener('click', doubleMoney)