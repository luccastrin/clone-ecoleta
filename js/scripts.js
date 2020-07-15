function populateStates() {
	const selectState = document.querySelector("select[name=uf]");

	const urlState =
		"https://servicodados.ibge.gov.br/api/v1/localidades/estados";

	fetch(urlState)
		.then((response) => response.json())
		.then((states) => {
			for (state of states) {
				selectState.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
			}
		});

	selectState.addEventListener("change", populateCities);
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
