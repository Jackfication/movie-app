import './index.css';
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Card from "./Card";
import Modal from "./Modal";

const API_KEY = "db95773a7fb212ba790d71f6adac0e7e";
const BASE_URL = "https://api.themoviedb.org/3";
const URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;

const App = () => {
  const [movieData, setMovieData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(URL); 
        const data = await response.json();  
        setMovieData(data.results);  
      } catch (error) {
        console.error("Error fetching the movie data:", error); 
      }
    };
    fetchMovies();  
  }, []);

  const handleSearchChange = (term) => { 
    setSearchTerm(term);
  };

  const handleCardClick = (movie) => { 
  
  
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  
  
  const closeModal = () => {
    setIsModalOpen(false); 
    setSelectedMovie(null); 
  };

  const filteredMovies = searchTerm ? 
    movieData.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase())) : 
    movieData;

  return (
    <div className="App">  
      <SearchBar onSearchChange={handleSearchChange} />
      <div className="Container">
        {filteredMovies.length === 0 ? (
          <p className="NotFound">No movies found</p>
        ) : (
          filteredMovies.map((movie, index) => (
            <Card 
              key={index}  
              movie={movie} 
              onCardClick={handleCardClick}
            />
          ))
        )}
      </div>
      {isModalOpen && (
        <Modal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
