import data from "./data.js";

let $details = document.querySelector("#containerDetails")

const queryString = location.search
const parametros = new URLSearchParams(queryString)
const cardDetails = parametros.get(`id`)
const card = data.events.find(elemento => elemento._id == cardDetails)
console.log(card)

$details.innerHTML=`
<div>
    <img src="${card.image}" alt="${card.name}">
</div>
<div>
    <h1>${card.name}</h1>
    <h3> Date: ${card.date}</h3>
    <p> ${card.description}</p>
    <h3> Category: ${card.category}</h3>
    <h3> Place: ${card.place}</h3>
    <p> Capacity: ${card.capacity}</p>
    <p> Estimate: ${card.estimate}</p>
    <p> Price: $${card.price},00</p>
</div>
`
