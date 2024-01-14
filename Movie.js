//Most popular movies
const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
// searched movie
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const movieBox = document.querySelector("#movie-box");
const getMovies = async (api) => {
  const response = await fetch(api);
  const data = await response.json();
  showMovies(data.results);
};

const showMovies = (data) => {
  movieBox.innerHTML = "";
  data.forEach((item) => {
    const box = document.createElement("div");
    box.classList.add("box");
    console.log(item);
    box.innerHTML = `
      <img src=${IMGPATH + item.poster_path} alt="" />
          <div class="overlay">
            <div class="title">
              <h2>${item.original_title}</h2>
              <span>${item.vote_average}</span>
            </div>
                          <span>Released On : ${item.release_date}</span>
            <h3>OverView:</h3>
            <p>
             ${item.overview}
            </p>
            </div>
            `;
    movieBox.appendChild(box);
  });
};

// Function to filter movies by year
const filterMoviesByYear = async (year) => {
  const apiWithYear = `${APIURL}&year=${year}`;
  await getMovies(apiWithYear);
};

document.querySelector("#search").addEventListener("keyup", function (event) {
  if (event.target.value != "") {
    getMovies(SEARCHAPI + event.target.value);
  } else {
    getMovies(APIURL);
  }
});

// Event listener for the year input
document
  .querySelector("#year-filter")
  .addEventListener("change", function (event) {
    const selectedYear = event.target.value;
    if (selectedYear !== "") {
      // Call the function to filter movies by the selected year
      filterMoviesByYear(selectedYear);
    } else {
      // If no year is selected, reset to the default API URL
      getMovies(APIURL);
    }
  });

// init call
getMovies(APIURL);
