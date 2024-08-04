document.getElementById('fetch-button').addEventListener('click', fetchData);
async function fetchData() {
	loading();
	try {
		const response = await fetch('https://dog.ceo/api/breeds/image/random');
		if (!response.ok) throw new Error('pailas');
		const data = await response.json();
		renderData(data);
	} catch (error) {
		showerror();
	}

	function loading() {
		const container = document.getElementById('data-container');
		container.innerHTML = '<p>loading...</p>';
	}

	function showerror() {
		const container = document.getElementById('data-container');
		container.innerHTML = '<p>paila...</p>';
	}
}

function renderData(data) {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data

	const div = document.createElement('div');
	div.className = 'item';
	div.innerHTML = ` <img src="${data?.message}" alt="Random Dog Image">`;
	container.appendChild(div);
}
