import data from "./data.js";

let fragment = document.createDocumentFragment();

function insertarCards(array, container) {
  for (let evento of array.events) {
    if (evento.date <= array.currentDate) {
      let div = document.createElement("div");
      div.className = "card";
      div.innerHTML += `<section>
      <img src="${evento.image}" alt="museum">
      <h3>${evento.name}</h3>
      <h5>${evento.category}</h5>
      <div class="card1">
        <p>Price $11111</p>
        <button class="vermas">More info</button>
      </div>
    </section> `;
      fragment.appendChild(div);
    }
    container.appendChild(fragment);
  }
}
insertarCards(data, container);
