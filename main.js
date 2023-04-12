const user = document.querySelector('#addUser')
const double = document.querySelector('#double')
const million = document.querySelector('#million')
const rich = document.querySelector('#rich')
const total = document.querySelector('#total')
const userNameWealth = document.querySelector('.userNameWealth')
const totalWealth = document.querySelector('.totalWealth')

let data =[]

async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api')
    /* fetch happens behind the scenes, so basically we need to wait for it to finish */
    const data = await res.json()
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
    //if this is 3, this means 108,289 will become 108,000
});
// doubleMoney
function doubleMoney(){
    data = data.map((user) => {
        return {...user, money: user.money*2}
    })
    updateDOM()
}
// sort by rich
function sortByRich(){
    data.sort((a,b) => b.money - a.money)
    updateDOM()
}
// filter millionaires
function filterMillion(){
    data = data.filter(millionaire => millionaire.money > 100000)
    updateDOM()
}
// calculate wealth
function calculateWealth(){
    totalWealth.innerHTML = ''
    const wealth = data.reduce((acc, user) => (acc += user.money),0)
    console.log(wealth)
    const totalEl = document.createElement('div')
    totalEl.classList.add('person', 'total_amt_wrap')
    totalEl.innerHTML = `<p class="total_text">Total Wealth:</p>
                        <p class="total_amt">${formatNumber.format(wealth)}</p>`
    totalWealth.appendChild(totalEl)

}
// call user function on DOM load
function runFuncTimes(){
    for(let i=0; i<3; i++){
        getRandomUser()
    }
}

/* 
1. new Intl.NumberFormat takes in 2 parameters: locales & options. Both are optional.
2. Intl.NumberFormat can be called with or without new.
3. If no parameters are passed, it will format with commas only.
4. locales is geographical region. it does not add currency symbol.
5. options is the main parameter. it is a JS object which holds other params. Refer above
*/

// event listeners
user.addEventListener('click', getRandomUser)
double.addEventListener('click', doubleMoney)
rich.addEventListener('click', sortByRich);
million.addEventListener('click', filterMillion)
total.addEventListener('click', calculateWealth)
document.addEventListener('DOMContentLoaded', runFuncTimes)