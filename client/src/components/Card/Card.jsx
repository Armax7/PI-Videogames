import './Card.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Card(props) {
    const {id, name, image, rating, genres} = props;
  return (
        <Link to={`/videogames/${id}`} className="LinkStyle" >
          <h2>{name}</h2>
          <img src={image} alt={`${name}`} className="GameImage" />
          <h3>Rating: {rating} stars</h3>
          <h4>Genres: {genres && genres.map(elem => elem.name.toString()).join(", ")}</h4>
        </Link>
  )
}

export default Card