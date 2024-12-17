import "./Modal.css";
import React from "react";

function Modal({ movie, onClose }) {
    const img_path = "https://image.tmdb.org/t/p/w500"; 

    return (
        <div className="Modal">
            <div className="ModalContent">
                <span className="Close" onClick={onClose}>&times;</span>      
                <img src={img_path + movie.poster_path} alt={movie.title} />
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                <h3>{movie.release_date ? `Date Released: ${movie.release_date}` : 'Release date unknown'}</h3>
                <h3>{movie.vote_average ? `Rating: ${movie.vote_average}/10` : 'No rating available'}</h3>

                
            </div>
        </div>
    );
}

export default Modal;
