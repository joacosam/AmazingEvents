let apiUrl = '../js/amazing.json'
const fragment = document.createDocumentFragment();
const $container = document.getElementById("container");
const $checkbox = document.getElementById("checkbox");
let arrayFiltrado = []
let arrayFiltrado2 = []
const $search = document.querySelector("input[type=search]");
let data = []
fetch(apiUrl)
.then(
  res => res.json()
  )
  .then(
    info => {
      data = info;
      arrayFiltrado = data.events.filter(e => e.estimate)
      arrayFiltrado2 = arrayFiltrado 
      insertarCards(arrayFiltrado, $container)
      
      let categories = arrayFiltrado.map(element => element.category)
      categories=categories.reduce((acumulador, element) => {
        if(!acumulador.includes(element)){
          acumulador.push(element)
        }
        return acumulador
      },[])
      insertarCheckbox(categories, $checkbox)
      
    } 
  )
.catch(error => console.log(error))



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
      <p>$${evento.price},00</p>
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

function insertarCheckbox(array, container){
  let text ="";
  array.forEach(element => text +=
    `<input type="checkbox" id="${element}" name="${element}" value="${element}">
    <label for="${element}"> ${element} </label>`);

    container.innerHTML = text;
}

// FUNCION PARA FILTRAR POR CATEGORIAS


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
    arrayFiltrado = filterCheckbox(data.events.filter(e => e.estimate), text)
  } else {
    arrayFiltrado = data.events.filter(e => e.estimate)
  }
  console.log($checkboxChecked)
  arrayFiltrado2 = filterName(arrayFiltrado, $search.value)
  insertarCards(arrayFiltrado2, $container);
})
//FUNCION PARA FILTRAR POR BARRA DE BUSQUEDA POR NOMBRE
function filterName(array, text) {
  let arrayFiltered = array.filter(element => element.name.toLowerCase().includes(text.toLowerCase()));
    return arrayFiltered
}


$search.addEventListener("keyup", function() {
  arrayFiltrado2 = filterName(arrayFiltrado, $search.value)
  insertarCards(arrayFiltrado2, $container)
})