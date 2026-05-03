const movies = [
  {
    title: "October Sky",
    type: "movie",
    year: 1999,
    director: "Joe Johnston",
    rating: 9.8,
    favorite: 1,
    genre: "Drama / Coming-of-age",
    actors: "Jake Gyllenhaal, Chris Cooper, Laura Dern",
    poster: "img/movies/october-sky.jpg",
    thoughts: "One of my favorite movies. I love the West Virginia location and the perseverance Homer and his friends have.",
    meaning: "A story about chasing something bigger even when people around you expect less. Aswell as putting 100% energy into something even when people dont believe can yeald the outcome you want."
  },
  {
    title: "Person of Interest",
    type: "tv",
    year: 2011,
    director: "Creator: Jonathan Nolan",
    rating: 10,
    favorite: 1,
    genre: "Crime / Sci-Fi / Drama",
    actors: "Jim Caviezel, Michael Emerson",
    poster: "img/movies/person-of-interest.jpg",
    thoughts: "One of my favorite shows. I LOVE the characters aswell as the plot of the show and the entire idea behind it.",
    meaning: "I feel like it shows that teamwork comes in all different shapes and sizes and it also shows people change with time."
  },
  {
    title: "The Grand Budapest Hotel",
    year: 2014,
    director: "Wes Anderson",
    rating: 7.6,
    favorite: 10,
    genre: "Comedy / Drama",
    actors: "Ralph Fiennes, Tony Revolori",
    poster: "img/movies/grand-budapest-hotel.jpg",
    thoughts: "Very interesting and very Wes Anderson like. Great actors and amazing story, the cinematography was amazing.",
    meaning: "It felt like a movie about loyalty and how vast even a hotel workers life can be. Everyone has just as complicated life as you."
  },
  {
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    rating: 8.4,
    favorite: 9,
    genre: "Sci-Fi / Drama",
    actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    poster: "img/movies/interstellar.jpg",
    thoughts: "Absolutely amazing cinematograpy and a really great story that wraps around well!",
    meaning: "To me it felt like taking a chance to change the world and or explore. Also how tiny we really are and things arent that serious in the grand scheme of things."
  }
];

let currentFilter = "all";

const movieList = document.getElementById("movie-list");

function getFilteredMovies() {
  if (currentFilter === "all") {
    return movies;
  }

  return movies.filter(movie => movie.type === currentFilter);
}

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

          <p><strong>Type:</strong> ${movie.type === "tv" ? "TV Show" : "Movie"}</p>
          <p><strong>Director/Creator:</strong> ${movie.director}</p>
          <p><strong>Genre:</strong> ${movie.genre}</p>
          <p><strong>Actors:</strong> ${movie.actors}</p>
          <p><strong>Rank:</strong> #${movie.favorite}</p>

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
  let sortedMovies = [...getFilteredMovies()];

  if (type === "title") {
    sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (type === "rating") {
    sortedMovies.sort((a, b) => b.rating - a.rating);
  }

  if (type === "favorite") {
  sortedMovies.sort((a, b) => a.favorite - b.favorite);
  }

  displayMovies(sortedMovies);
}

function filterMedia(type) {
  currentFilter = type;
  displayMovies(getFilteredMovies());
}

displayMovies(movies);