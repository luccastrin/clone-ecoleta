/**************************************
 *** PÁGINA REGISTRO ***
 */
function populateStates() {
	const selectState = document.querySelector("select[name=uf]");

	const urlState =
		"https://servicodados.ibge.gov.br/api/v1/localidades/estados";

	fetch(urlState)
		.then((response) => response.json())
		.then((states) => {
			for (state of states) {
				if (selectState)
					selectState.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
			}
		});

	if (selectState) selectState.addEventListener("change", populateCities);
}

populateStates();

function populateCities(event) {
	const selectCity = document.querySelector("select[name=city]");
	const inputState = document.querySelector("input[name=state]");

	const eventCity = event.target.value;

	//Alterando os dados enviados para a URL de número para nomes dos estados
	const indexOfSelectedState = event.target.selectedIndex;
	inputState.value = event.target.options[indexOfSelectedState].text;
	console.log(inputState.value);

	const urlCity = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${eventCity}/municipios`;

	fetch(urlCity)
		.then((response) => response.json())
		.then((cities) => {
			selectCity.innerHTML = "";
			for (city of cities) {
				selectCity.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
			}
		});
}

//Itens de Coleta
const itensColeta = document.querySelectorAll(".itens-list > li");
const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
	const itemLi = event.target;
	const itemId = itemLi.dataset.id;

	console.log("Item Id: ", itemId);

	//adicionar ou remover uma classe com JS
	itemLi.classList.toggle("selected");

	//Verificar se existem itens selecionados, se sim, referenciar os itens selecionados
	const alreadySelected = selectedItems.findIndex((item) => {
		const itemFound = item == itemId;
		return itemFound;
	});

	//Se já estiver selecionado, tirar da seleção
	if (alreadySelected >= 0) {
		const filteredItems = selectedItems.filter((item) => {
			const itemIsDifferent = item != itemId;
			return itemIsDifferent;
		});

		selectedItems = filteredItems;
	} else {
		//Se não estiver selecionado, adicionar a seleção
		selectedItems.push(itemId);
	}

	console.log("itens selecionados: ", selectedItems);

	//Atualizar o campo escondido com os itens selecionados(input:hidden)
	collectedItems.value = selectedItems;
}

itensColeta.forEach(function (el) {
	el.addEventListener("click", handleSelectedItem);
});

/**************************************
 *** PÁGINA INDEX ***
 */

//Modal Pontos de Coleta
const buttonSearch = document.querySelector("#marketplace .text-content a");
const modalColect = document.querySelector("#pontos-coleta");
const crossClose = document.querySelector("#pontos-coleta .cross");

if (buttonSearch)
	buttonSearch.addEventListener("click", () => {
		modalColect.classList.remove("hide");
		modalColect.style.transition = "2s";
	});

if (crossClose)
	crossClose.addEventListener("click", () => {
		modalColect.classList.add("hide");
		modalColect.style.transition = "2s";
	});
