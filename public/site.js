
const gameList = document.querySelector(".game-list")
const modal = document.getElementById("gameModal")
const closeButton = document.querySelector(".close-button")

const modalElements = {
	title: document.getElementById('modalTitle'),
	prepTime: document.getElementById('modalPrepTime'),
	difficulty: document.getElementById('modalDifficulty'),
	instructions: document.getElementById('modalInstructions'),
	image: document.getElementById('modalImage')
}

const getGames = async () => {
	const response = await fetch('/api/v1/')
	return await response.json()
}

const getGame = async id => {
	const response = await fetch(`/api/v1/game/${id}`)
	return await response.json()
}

const showGameList = games => {
	games?.forEach(({id, title, image, prepTime, difficulty}) => {
		const gameItem = document.createElement("div")
		gameItem.className = "game-item"
		gameItem.innerHTML = `
			<img src="${image}" alt="${title}">
			<h2>${title}</h2>
			<p><strong>Prep Time:</strong> ${prepTime} mins | <strong>Difficulty:</strong> ${difficulty}</p>
		`
		gameItem.onclick = () => showGameDetails(id)
		gameList.appendChild(gameItem)
	})
}

const showGameDetails = async id => {

	const {title, image, instructions, ingredients, prepTime, difficulty} = await getGame(id)

	modalElements.title.textContent = title
	modalElements.prepTime.textContent = `${prepTime} mins`
	modalElements.difficulty.textContent = difficulty
	modalElements.instructions.textContent = instructions
	modalElements.image.src = image

	const ingredientsList = document.getElementById("modalIngredients")
	ingredientsList.innerHTML = ''
	ingredients.forEach(ingredient => {
		const li = document.createElement('li')
		li.textContent = ingredient
		ingredientsList.appendChild(li)
	})

	modal.style.display = 'flex'
}

closeButton.onclick = () => modal.style.display = 'none'

window.onclick = event => {
	if (event.target === modal) modal.style.display = 'none'
}


;(async () => {
	const games = await getGames()
	showGameList(games)
})()