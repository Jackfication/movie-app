import "./Card.css";
import React from "react";

const Card = ({ movie, onCardClick }) => {
    const img_path = "https://image.tmdb.org/t/p/w500";

    return (
        <div className="Card" onClick={() => onCardClick(movie)}>
            <img src={img_path + movie.poster_path} className="Poster" alt={movie.title || "Movie poster"} />
            <div className="Box">
                <h4 className="Title">{movie.title}</h4>
            </div>
        </div>
    );
}

export default Card;