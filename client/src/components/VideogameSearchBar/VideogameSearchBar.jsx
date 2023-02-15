import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Actions from '../../redux/actions';

function VideogameSearchBar(props) {
    const { redirect = false } = props;

    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState("");

    function handleInputChange (event) {
        event.preventDefault();
        setName(event.target.value);
    }

    function handleSubmit (event) {
        event.preventDefault();
        dispatch(Actions.resetError());
        dispatch(Actions.resetVideogameByName());
        try {
            dispatch(Actions.getByName(name));
        } catch (error) {
            dispatch(Actions.showError(error));
        }

        if (redirect && typeof redirect === 'string'){
            history.push(redirect);
        }
    }

  return (
    <div>
        <input
            type='text'
            placeholder='Search...'
            onChange={handleInputChange} 
        />
        <button type='submit' onClick={handleSubmit} >Search</button>
    </div>
  )
}

export default VideogameSearchBar