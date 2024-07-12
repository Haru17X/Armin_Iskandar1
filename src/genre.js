const apiUrl = 'https://api.jikan.moe/v4';
const genreSelect = document.getElementById('genre-select');
const animeGrid = document.getElementById('anime-grid');

// Get all genres from Jikan API
fetch(`${apiUrl}/genres/anime`)
 .then(response => response.json())
 .then(data => {
    const genres = data.data;
    const selectedGenres = genres.filter(genre => {
      return [
        'Adventure',
        'Action',
        'Fantasy',
        'Romance',
        'Isekai'
      ].includes(genre.name);
    });
    selectedGenres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre.mal_id;
      option.text = genre.name;
      genreSelect.appendChild(option);
    });
  });

// Handle genre select change event
genreSelect.addEventListener('change', (e) => {
  const selectedGenreId = e.target.value;
  fetch(`${apiUrl}/anime?genres=${selectedGenreId}`)
   .then(response => response.json())
   .then(data => {
      console.log('API response:', data);
      if (data && data.data) {
        const animeList = data.data;
        if (animeGrid!== null) {
          animeGrid.innerHTML = '';
          animeList.forEach(anime => {
            const animeCard = document.createElement('div');
            let imageUrl = '';
            if (anime.images && anime.images.jpg && anime.images.jpg.image_url) {
              imageUrl = anime.images.jpg.image_url;
            }
            animeCard.innerHTML = `
              <a href="details.html?id=${anime.mal_id}">
                <img src="${imageUrl}" alt="${anime.title}">
                <h2>${anime.title}</h2>
              </a>
            `;
            animeGrid.appendChild(animeCard);
          });
        } else {
          console.error('animeGrid element is null');
        }
      } else {
        console.error('API response is invalid:', data);
      }
    })
   .catch(error => {
      console.error('Error fetching anime titles:', error);
    });
});

const backToHomeButton = document.getElementById('back-to-home');

backToHomeButton.addEventListener('click', () => {
  window.location.href = 'homepage.html'; // or the URL of your homepage
});