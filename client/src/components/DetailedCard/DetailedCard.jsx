import React from 'react'
import './DetailedCard.css';

function DetailedCard(props) {
  const {name, image, rating, genres, released, platforms, description} = props;
  return (
    <div>
      <h2>{name}</h2>
          <img src={image} alt={`${name}`} className="GameImage" />
          <h3>Rating: {rating} stars</h3>
          <h4>Genres: {genres && genres.map(elem => elem.name.toString()).join(", ")}</h4>
          <h4>Released on: {released}</h4>
          <h4>Platforms: {platforms}</h4>
          <h4>Description:</h4>
          <h5>{description}</h5> 
    </div>
  )
}

export default DetailedCard