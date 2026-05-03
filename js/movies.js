const movies = [
  {
    title: "The Grand Budapest Hotel",
    year: 2014,
    director: "Wes Anderson",
    rating: 8.5,
    favorite: 9,
    genre: "Comedy / Drama",
    actors: "Ralph Fiennes, Tony Revolori",
    poster: "img/movies/grand-budapest-hotel.jpg",
    thoughts: "Beautiful, weird, funny, and stylish. I really enjoyed the world and the way the story was told.",
    meaning: "To me, it felt like a movie about memory, loyalty, and trying to hold onto beauty in a messy world."
  }
];

const movieList = document.getElementById("movie-list");

function displayMovies(movieArray) {
  movieList.innerHTML = "";

  movieArray.forEach(movie => {
    movieList.innerHTML += `
      <article class="movie-card">
        <img src="${movie.poster}" alt="${movie.title} poster" class="movie-poster">

        <div class="movie-info">
          <div class="movie-title-row">
            <h2>${movie.title} <span>(${movie.year})</span></h2>
            <p class="movie-rating">${movie.rating}/10</p>
          </div>

          <p><strong>Director:</strong> ${movie.director}</p>
          <p><strong>Genre:</strong> ${movie.genre}</p>
          <p><strong>Actors:</strong> ${movie.actors}</p>
          <p><strong>Favorite Score:</strong> ${movie.favorite}/10</p>

          <h3>Thoughts</h3>
          <p>${movie.thoughts}</p>

          <h3>Meaning / Lesson</h3>
          <p>${movie.meaning}</p>
        </div>
      </article>
    `;
  });
}

function sortMovies(type) {
  let sortedMovies = [...movies];

  if (type === "title") {
    sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (type === "rating") {
    sortedMovies.sort((a, b) => b.rating - a.rating);
  }

  if (type === "favorite") {
    sortedMovies.sort((a, b) => b.favorite - a.favorite);
  }

  displayMovies(sortedMovies);
}

displayMovies(movies);