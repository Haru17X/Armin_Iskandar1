document.addEventListener('DOMContentLoaded', () => {
    const apiEndpoint = 'https://api.jikan.moe/v4/anime';
    const animeId = new URLSearchParams(window.location.search).get('id');
  
    fetch(`${apiEndpoint}/${animeId}`)
      .then(response => response.json())
      .then(data => {
        const anime = data.data;
        const animeImage = document.getElementById('anime-image');
        animeImage.innerHTML = `
          <img src="${anime.images.jpg.image_url}" alt="${anime.title}" style="max-width: 200px; height: auto; margin: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);">
        `;
  
        const animeInfo = document.getElementById('anime-info');
        const animeDetailsHtml = `
          <h2>${anime.title}</h2>
          <p>Score: ${anime.score}</p>
          <p>Rank: ${anime.rank}</p>
          <p>Popularity: ${anime.popularity}</p>
          <p>Genres: ${anime.genres.map(genre => genre.name).join(', ')}</p>
          <p>Synopsis: ${anime.synopsis}</p>
          <p>View on MyAnimeList: <a href="https://myanimelist.net/anime/${anime.mal_id}" target="_blank" rel="noopener noreferrer">Link</a></p>

        `;
        animeInfo.innerHTML = animeDetailsHtml;
  
        // Append the wishlist form to the anime-info div
        const wishlistFormHtml = `
          <div id="wishlist-form">
            <label>Rating:</label>
            <select id="rating-select">
              <option value="1">1 star</option>
              <option value="2">2 stars</option>
              <option value="3">3 stars</option>
              <option value="4">4 stars</option>
              <option value="5">5 stars</option>
            </select>
            <label>Episode:</label>
            <input type="number" id="episode-input" />
            <label>Manga Chapters:</label>
            <input type="number" id="manga-chapters-input" />
            <button id="wishlist-button">Add to Wishlist</button>
          </div>
        `;
        animeInfo.innerHTML += wishlistFormHtml;
  
        const wishlistButton = document.getElementById('wishlist-button');
        wishlistButton.addEventListener('click', () => {
          const ratingSelect = document.getElementById('rating-select');
          const episodeInput = document.getElementById('episode-input');
          const mangaChaptersInput = document.getElementById('manga-chapters-input');
          const rating = ratingSelect.value;
          const episode = episodeInput.value;
          const mangaChapters = mangaChaptersInput.value;
          const animeId = anime.id;
  
          const wishlistData = {
            id: animeId,
            title: anime.title,
            images: anime.images,
            rating,
            episode,
            mangaChapters,
          };
  
          // Store data in local storage
          const existingWishlist = localStorage.getItem('wishlist');
          let wishlist = existingWishlist ? JSON.parse(existingWishlist) : [];
          wishlist.push(wishlistData);
          localStorage.setItem('wishlist', JSON.stringify(wishlist));
  
          console.log('Added to wishlist:', wishlistData);
        });
  
        // Push a new entry onto the history stack
        window.history.pushState({}, '', `?id=${animeId}`);
      });
  });

  const backToHomeButton = document.getElementById('back-button');

  backToHomeButton.addEventListener('click', () => {
    window.location.href = 'homepage.html'; // or the URL of your homepage
  });