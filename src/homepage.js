const apiEndpoint = 'https://api.jikan.moe/v4/anime';
let trendingAnime = [];
let topAnime = [];

// Fetch trending anime data
fetch(`${apiEndpoint}?q=naruto`)
  .then(response => response.json())
  .then(data => {
    trendingAnime = data.data;
    renderTrendingAnime();
  })
  .catch(error => {
    console.error(error);
    alert('Error: Unable to fetch trending anime data. Please try again later.');
  });

// Fetch top anime data
fetch(`${apiEndpoint}?q=top`)
  .then(response => response.json())
  .then(data => {
    topAnime = data.data;
    renderTopAnime();
  })
  .catch(error => {
    console.error(error);
    alert('Error: Unable to fetch top anime data. Please try again later.');
  });

// Add event listeners
document.getElementById('search-button').addEventListener('click', searchAnime);
document.getElementById('genre-button').addEventListener('click', () => {
  window.location.href = 'genre.html';
});
document.getElementById('wishlist-button').addEventListener('click', () => {
  window.location.href = 'AnimeisLifewishlist.html';
});

// Render trending anime
function renderTrendingAnime() {
  const grid = document.getElementById('trending-anime-grid');
  grid.innerHTML = '';
  trendingAnime.forEach(anime => {
    const card = document.createElement('div');
    card.className = 'trending-anime-card';
    const img = document.createElement('img');
    img.src = anime.images.jpg.image_url;
    img.alt = anime.title;
    img.addEventListener('click', () => {
      window.location.href = `details.html?id=${anime.mal_id}`;
    });
    card.appendChild(img);
    const h3 = document.createElement('h3');
    h3.textContent = anime.title;
    card.appendChild(h3);
    grid.appendChild(card);
  });
}

// Render top anime
function renderTopAnime() {
  const table = document.getElementById('top-anime-table');
  table.innerHTML = '';
  topAnime.forEach(anime => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${anime.title}</td>
      <td>${anime.score}</td>
      <td>${anime.rank}</td>
      <td>${anime.popularity}</td>
    `;
    table.appendChild(row);
  });
}

// Search anime
function searchAnime() {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    fetch(`${apiEndpoint}?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        const searchResults = data.data;
        const searchResultsContainer = document.getElementById('search-results');
        searchResultsContainer.innerHTML = '';
        const grid = document.createElement('div');
        grid.className = 'search-grid';
        searchResults.forEach((anime, index) => {
          if (index < 9) { // Only display the first 9 results
            const card = document.createElement('div');
            card.className = 'search-card';
            const img = document.createElement('img');
            img.src = anime.images.jpg.image_url;
            img.alt = anime.title;
            img.addEventListener('click', () => {
              window.location.href = `details.html?id=${anime.mal_id}`;
            });
            card.appendChild(img);
            const h3 = document.createElement('h3');
            h3.textContent = anime.title;
            card.appendChild(h3);
            grid.appendChild(card);
          }
        });
        searchResultsContainer.appendChild(grid);
      })
      .catch(error => {
        console.error(error);
        alert('Error: Unable to fetch search results. Please try again later.');
      });
  } else {
    alert('Please enter a valid search term.');
  }
}