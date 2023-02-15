import React from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import * as Components from '../../components';

function Detail() {
  const game = useSelector(state => state.videogame);
  const err = useSelector(state => state.error);

  if(!!err.length){
    return (
      <div>
        <Link to={'/form'} >Add videogame</Link>
        <h1>Videogame Details</h1>
        <Components.VideogameSearchBar />
        <h2>Sorry, game not found, try searching again, adding a new game or go back to home</h2>
        <Link to={'/home'} >Back to Home</Link>
      </div>
    )
  }

  if (_.isEmpty(game)){
    return (
      <div>
        <Link to={'/form'} >Add videogame</Link>
        <h1>Videogame Details</h1>
        <Components.VideogameSearchBar />
        <h1>LOADING...</h1>
        <Link to={'/home'} >Back to Home</Link>
      </div>
    )
  }

  return (
    <div>
      <Link to={'/form'} >Add videogame</Link>
      <h1>Videogame Details</h1>
      <Components.VideogameSearchBar />
      <Components.DetailedCard 
        name={game.name}
        image={game.background_image} 
        rating={game.rating}
        genres={game.genres}
        released={game.released}
        platforms={game.platforms}
        description={game.description}
      />
      <Link to={'/home'} >Back to Home</Link>
    </div>
  )
}

export default Detail