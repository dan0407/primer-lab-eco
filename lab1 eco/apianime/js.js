document.getElementById('fetch-button').addEventListener('click', () => {
	const limit = document.getElementById('limit').value;
	const name = document.getElementById('name').value;
	const type = document.getElementById('type').value;
	fetchData(limit, name, type);
});

async function fetchData(limit, name, type) {
	renderLoadingState();
	try {
		const response = await fetch(`https://api.jikan.moe/v4/anime?limit=${limit}&q=${name}&type=${type}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		renderData(data);
	} catch (error) {
		renderErrorState();
	}
}

function renderErrorState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Failed to load data</p>';
	console.log('Failed to load data');
}

function renderLoadingState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Loading...</p>';
	console.log('Loading...');
}

function renderData({ data }) {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data

	data.forEach((anime) => {
		const div = document.createElement('div');
		div.className = 'item';
		div.innerHTML = `
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <p><strong>Title:</strong> ${anime.title}</p>
      <p><strong>Episodes:</strong> ${anime.episodes}</p>
      <p><strong>Synopsis:</strong> ${anime.synopsis}</p>
    `;
		container.appendChild(div);
	});
}
