const wishlistUL = document.getElementById('wishlist-ul');

// Retrieve data from local storage
const wishlistData = localStorage.getItem('wishlist');
let wishlist = wishlistData ? JSON.parse(wishlistData) : [];

renderWishlist();

function renderWishlist() {
  wishlistUL.innerHTML = '';
  wishlist.forEach(anime => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <p>Rating: ${anime.rating} stars</p>
      <p>Episode: ${anime.episode}</p>
      <p>Manga Chapters: ${anime.mangaChapters}</p>
      <button class="update-button">Update Rating</button>
      <button class="remove-button">Remove from Wishlist</button>
    `;
    wishlistUL.appendChild(li);
  });
}

// Add event listener to update anime rating
wishlistUL.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON' && event.target.classList.contains('update-button')) {
    const animeId = event.target.parentNode.querySelector('img').alt;
    const index = wishlist.findIndex(anime => anime.title === animeId);
    if (index !== -1) {
      const ratingPrompt = prompt('Enter new rating (1-5):');
      if (ratingPrompt !== null && ratingPrompt >= 1 && ratingPrompt <= 5) {
        wishlist[index].rating = ratingPrompt;
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        renderWishlist();
      }
    }
  }
});

// Add event listener to remove anime from wishlist
wishlistUL.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON' && event.target.classList.contains('remove-button')) {
    const animeId = event.target.parentNode.querySelector('img').alt;
    const index = wishlist.findIndex(anime => anime.title === animeId);
    if (index !== -1) {
      wishlist.splice(index, 1);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      renderWishlist();
    }
  }
});

const backToHomeButton = document.getElementById('back-button');

backToHomeButton.addEventListener('click', () => {
  window.location.href = 'homepage.html'; // or the URL of your homepage
});

