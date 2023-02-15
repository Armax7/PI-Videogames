import './Card.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Actions from '../../redux/actions';

function Card(props) {
    const {id, name, image, rating, genres} = props;

    const dispatch = useDispatch();

    function handleOnClick(event){
      dispatch(Actions.getById(id));
    }

  return (
        <Link to={`/detail`} onClick={handleOnClick} className="LinkStyle" >
          <h2>{name}</h2>
          <img src={image} alt={`${name}`} className="GameImage" />
          <h3>Rating: {rating} stars</h3>
          <h4>Genres: {genres && genres.map(elem => elem.name.toString()).join(", ")}</h4>
        </Link>
  )
}

export default Card