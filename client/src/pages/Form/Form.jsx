import './Form.css'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom';
import * as Actions from '../../redux/actions';
import * as Components from '../../components';
import * as Constants from '../../constants';

function validate(inputs){
  let errors = {};
  
  if(inputs.name.trim() === '' || inputs.name.trim().at(0) === ' '){
    errors['name'] = "Requires a name";
  }
  if(inputs.description.trim() === "" || inputs.description.trim().at(0) === ' '){
    errors['description'] = "Requires a description";
  }
  if(inputs.release.trim() === "" || inputs.release.trim().at(0) === ' '){
    errors['release'] = "Requires a release date";
  }
  if(inputs.rating.trim() === "" || inputs.rating.trim().at(0) === ' '){
    errors['rating'] = "Requires a rating";
  }
  if(inputs.platforms.trim() === "" || inputs.platforms.trim().at(0) === ' '){
    errors['platforms'] = "Requires at least one platform";
  }
  if(!inputs.genres.length){
    errors['genres'] = "Requires at least one genre";
  }

  return errors;
}

function Form() {
  const FORM_ID = 'AddGameForm';
  const DELETE_BUTTON = 'delete';
  const CLEAR_BUTTON = 'clear';

  const dispatch = useDispatch();
  const allGenres = useSelector(state => state.genre_list);

  const [inputs, setInputs] = useState({
    name:"",
    description:"",
    release:"",
    rating:"",
    genres: [],
    platforms: "",
  })

  const [errors, setErrors] = useState({
    name:"",
    description:"",
    release:"",
    rating:"",
    genres: "",
    platforms: "",
  })

  const [selectedGenresList, setSelectedGenresList] = useState([])

  const [submitPressed, setSubmitPressed] = useState(false);

  const GENRE_OPTIONS = [Constants.SELECT, ...allGenres];

  useEffect(()=>{
    dispatch(Actions.getGenres());
  },[dispatch]);

  function setValueInputGenres(value){
    let inputGenres = [];
    inputGenres = allGenres.filter(elem => elem.name.toLowerCase() === value.toLowerCase());
    setInputs((prevState)=>(
      {
      ...prevState,
      genres: [...inputs.genres, ...inputGenres],
      }
    ))

    setErrors(validate({...inputs, genres: [...inputs.genres, ...inputGenres]}));
  }

  function handleOnChangeGenre(event){
    event.preventDefault();

    if(!selectedGenresList.includes(event.target.value)){
      setSelectedGenresList([...selectedGenresList, event.target.value]);
      setValueInputGenres(event.target.value);
    }
  }

  function deleteValueInputGenres(value){
    let inputGenres = [];
    inputGenres = inputs.genres.filter(elem => elem.name.toLowerCase() !== value.toLowerCase());
    setInputs((prevState)=>(
      {
      ...prevState,
      genres: [...inputGenres],
      }
    ))
    setErrors(validate({...inputs, genres: [...inputGenres]}));
  }

  function handleOnClickGenres(event){
    event.preventDefault();
    const genresListCopy = selectedGenresList;
    
    if (event.target.name === DELETE_BUTTON || genresListCopy.length <= 0){
      const valueToDelete = genresListCopy.pop()
      setSelectedGenresList([...genresListCopy]);
      deleteValueInputGenres(valueToDelete);
    }
    else if(event.target.name === CLEAR_BUTTON){
      setSelectedGenresList([]);
      setInputs((prevState)=>(
        {
        ...prevState,
        genres: [],
        }
      ))
      setErrors(validate({...inputs, genres: []}));
    }
  }

  let handleChangeInputs = function (event) {
    setInputs((prevState) => (
      {...prevState, 
        [event.target.name]: event.target.value}
      ));

      setErrors(validate({...inputs, [event.target.name]: event.target.value}));
  }

  function handleSubmit(event){
    event.preventDefault();
    const currentErrors = validate(inputs);
    setSubmitPressed(true);

    if(Object.values(currentErrors).length > 0){
      window.alert("Missing data, please complete required info");
    }
    else {
      dispatch(Actions.postGames(inputs))
      setSubmitPressed(false);
      setInputs({
        name:"",
        description:"",
        release:"",
        rating:"",
        genres: [],
        platforms: "",
      })
      setErrors({
        name:"",
        description:"",
        release:"",
        rating:"",
        genres: "",
        platforms: "",
      })
      window.alert("Game added successfully");
    }

  }

  return (
    <div>
        <Link to={'/home'} >Back to Home</Link>
        <h1>Create your videogame</h1>
        <form id={FORM_ID} onSubmit={handleSubmit} >
          <div>
            <label>Name:</label>
            <input 
              type="text"
              value={inputs.name} 
              name="name"
              onChange={handleChangeInputs}
            />
            {submitPressed && !!errors.name ? (<p className='danger'>{errors.name}</p>) : ''}
          </div>
          <div>
            <label>Description:</label>
            <textarea 
              name="description" 
              value={inputs.description} 
              onChange={handleChangeInputs} 
              maxLength={250} 
            />
            {submitPressed && !!errors.description ? (<p className='danger'>{errors.description}</p>) : ''}
          </div>
          <div>
            <label>Release:</label>
            <input 
              type="text"
              value={inputs.release} 
              name="release"
              onChange={handleChangeInputs}
            />
            {submitPressed && !!errors.release ? (<p className='danger'>{errors.release}</p>) : ''}
          </div>
          <div>
            <label>Rating:</label>
            <input 
              type="text"
              value={inputs.rating} 
              name="rating"
              onChange={handleChangeInputs}
            />
            {submitPressed && !!errors.rating ? (<p className='danger'>{errors.rating}</p>) : ''}
          </div>
          <div>
            <label>Genres:</label>
            <div>
              <label form={FORM_ID} >
                {selectedGenresList.join(", ")}
              </label>
            </div>
            <div>
              <button name={DELETE_BUTTON} onClick={handleOnClickGenres} >Delete last genre</button>
              <button name={CLEAR_BUTTON} onClick={handleOnClickGenres} >Clear all genres</button>
            </div >
            <div>
              <Components.DropDown 
                options={GENRE_OPTIONS} 
                value={GENRE_OPTIONS.at(0)} 
                onChange={handleOnChangeGenre}
              /> {submitPressed && !!errors.genres ? (<p className='danger'>{errors.genres}</p>) : ''}
            </div>
          </div>
          <div>
            <label>Platforms:</label>
            <input 
              type=""
              value={inputs.platforms} 
              name="platforms"
              onChange={handleChangeInputs}
            />
            {submitPressed && !!errors.platforms ? (<p className='danger'>{errors.platforms}</p>) : ''}
          </div>
          <button type='submit' >Add Videogame</button>
        </form>
    </div>
  )
}

export default Form