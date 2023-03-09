import data from "./data.js";

const fragment = document.createDocumentFragment();
const $container = document.getElementById("container");
const upcoming = data.events.filter(elemento => elemento.date > data.currentDate)

function insertarCards(array, container){
  container.innerHTML = "";
    if (array.length > 0) {
      for(let evento of array) {
    let div=document.createElement("div");
    div.className = "card"
    div.innerHTML += `<section>
    <img src="${evento.image}" alt="museum">
    <h3>${evento.name}</h3>
    <h5>${evento.category}</h5>
    <div class="card1">
      <p>Price $${evento.price},00 </p>
      <a href="/pages/details.html?id=${evento._id}"><button class="vermas">More info</button></a>
    </div>
  </section> `
  fragment.appendChild(div)
    }
} else {
  let div=document.createElement("div");
  div.className = "card"
  div.innerHTML += `<section>
  <h1> NOT FOUND </h1>
</section> `
fragment.appendChild(div)
}
container.appendChild(fragment)
}

insertarCards(upcoming, $container)


let categories = data.events.map(element => element.category)
categories=categories.reduce((acumulador, element) => {
  if(!acumulador.includes(element)){
    acumulador.push(element)
  }
  return acumulador
},[])

const $checkbox = document.getElementById("checkbox");

function insertarCheckbox(array, container){
  let text ="";
  array.forEach(element => text +=
    `<input type="checkbox" id="${element}" name="${element}" value="${element}">
    <label for="${element}"> ${element} </label>`);

    container.innerHTML = text;
}

insertarCheckbox(categories, $checkbox)
// FUNCION PARA FILTRAR POR CATEGORIAS
let arrayFiltrado = upcoming
let arrayFiltrado2 = arrayFiltrado

function filterCheckbox(array, text){
    let arrayFiltered = array.filter(element => text.toLowerCase().includes(element.category.toLowerCase()))
    return arrayFiltered
}

$checkbox.addEventListener("change", function(){
const $checkboxChecked = document.querySelectorAll("input[type=checkbox]:checked")
let text ="";
if($checkboxChecked.length > 0){
  for (let i = 0; i < $checkboxChecked.length; i++){
    text += $checkboxChecked[i].name
    }
    arrayFiltrado = filterCheckbox(upcoming, text)
  } else {
    arrayFiltrado = upcoming
  }
  arrayFiltrado2 = filterName(arrayFiltrado, $search.value)
  insertarCards(arrayFiltrado2, $container);
})
//FUNCION PARA FILTRAR POR BARRA DE BUSQUEDA POR NOMBRE
  function filterName(array, text) {
  let arrayFiltered = array.filter(element => element.name.toLowerCase().includes(text.toLowerCase()));
    return arrayFiltered
}

const $search = document.querySelector("input[type=search]");
$search.addEventListener("keyup", function() {
  arrayFiltrado2 = filterName(arrayFiltrado, $search.value)
  insertarCards(arrayFiltrado2, $container)
})