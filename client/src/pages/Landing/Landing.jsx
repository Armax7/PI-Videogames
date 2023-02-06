import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div>
      <h1>Welcome to your videogame webpage</h1>
      <Link to={'/home'}>
        <button>PRESS START</button>
      </Link>
    </div>
  )
}

export default Landing