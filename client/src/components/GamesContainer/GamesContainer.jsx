import React from 'react'
import Card from '../Card/Card';

function GamesContainer(props) {
  const {games} = props;

  if(!games){
    return (
      <div>GamesContainer</div>
    )
  }

  if (!Array.isArray(games)){
    throw new TypeError(`Error: games should be an array \n Received: ${games}`);
  }

  return (
    <div>
      {games && games.map((elem, index) => (
        <Card key={index} id={elem.id} name={elem.name} image={elem.background_image} rating={elem.rating} genres={elem.genres} />
      ))}
    </div>
  )
}

export default GamesContainer