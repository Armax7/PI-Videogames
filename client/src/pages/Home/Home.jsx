import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../redux/actions';

function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector(state => state.videogame_list);

  useEffect(()=>{
    dispatch(actions.getVideogames());
  },[]);

  return (
    <div>
      <Link to={'/videogames'} >Add videogame</Link>
      <button>Reload</button>
    </div>
  )
}

export default Home