import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import * as Components from '../../components';
import * as Actions from '../../redux/actions';
import * as Constant from '../../constants';

function Home() {
  const dispatch = useDispatch();
  const videogamesToShow = useSelector(state => state.videogame_list);
  const allGenres = useSelector(state => state.genre_list);

  const STARTING_PAGE = 1;
  const [currentPage, setCurrentPage] = useState(STARTING_PAGE);

  const GAMES_PER_PAGE = 15;
  const [gamesPerPage, setGamesPerPage] = useState(GAMES_PER_PAGE);

  const GENRE_OPTIONS = [Constant.ALL, ...allGenres];
  const [selectedGenre, setSelectedGenre] = useState(GENRE_OPTIONS.at(0));

  const GAME_ORIGINS = [Constant.ALL, Constant.EXISTING_GAME, Constant.CREATED_GAME]
  const [selectedOrigin, setSelectedOrigin] = useState(GAME_ORIGINS.at(0));

  const SORT_TYPES = [Constant.ALPHABETICAL, Constant.RATING]
  const [selectedSortType, setSelectedSortType] = useState(SORT_TYPES.at(0));

  const ORDER_TYPE = [Constant.ASCENDING, Constant.DESCENDING];
  const [selectedOrder, setSelectedOrder] = useState(ORDER_TYPE.at(0));

  const lastGameIndex = currentPage * gamesPerPage;
  const firstGameIndex = lastGameIndex - gamesPerPage;
  const gamesOnPage = videogamesToShow.slice(firstGameIndex, lastGameIndex);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect(()=>{
    dispatch(Actions.getVideogames());
    dispatch(Actions.getGenres());
  },[dispatch]);

  function handleClickResetFilters(event){
    event.preventDefault();
    setSelectedGenre(GENRE_OPTIONS.at(0));
    setSelectedOrigin(GAME_ORIGINS.at(0));
    setSelectedSortType(SORT_TYPES.at(0));
    setSelectedOrder(ORDER_TYPE.at(0));
    dispatch(Actions.filterAllGames());
  }

  function handleChangeGenre(event){
    event.preventDefault();
    setSelectedGenre(event.target.value);
    dispatch(Actions.filterGameByGenre(event.target.value));
  }

  function handleChangeOrigin(event){
    event.preventDefault();
    setSelectedOrigin(event.target.value);
    dispatch(Actions.filterGameByOrigin(event.target.value));
  }

  function handleChangeSortType (event){
    event.preventDefault();
    setSelectedSortType(event.target.value);
    if (event.target.value === Constant.RATING){
      dispatch(Actions.sortByRating(selectedOrder));
    }
    else if (event.target.value === Constant.ALPHABETICAL){
      dispatch(Actions.sortByName(selectedOrder));
    }
  }

  function handleChangeOrder(event){
    event.preventDefault();
    setSelectedOrder(event.target.value);
    if (selectedSortType === Constant.RATING){
      dispatch(Actions.sortByRating(event.target.value));
    }
    else if (selectedSortType === Constant.ALPHABETICAL){
      dispatch(Actions.sortByName(event.target.value));
    }
  }

  // useEffect(()=>{
  //   console.log(allVideogames);
  // },[allVideogames])

  return (
    <div>
      <Link to={'/form'} >Add videogame</Link>
      <h1>Videogames</h1>
      <Components.VideogameSearchBar redirect={'/detail'} />
      <button onClick={handleClickResetFilters} >Reset Filters</button>
      <h4>Filter by: </h4>
      <div>
        <h5>
          Genre: <Components.DropDown 
            onChange={handleChangeGenre} 
            options={GENRE_OPTIONS} 
            value={selectedGenre}
          />&nbsp;
          Origin: <Components.DropDown 
            onChange={handleChangeOrigin}
            options={GAME_ORIGINS} 
            value={selectedOrigin}
          />
        </h5>
        <h5>
          Sort: <Components.DropDown 
            onChange={handleChangeSortType}
            options={SORT_TYPES} 
            value={selectedSortType}
          />&nbsp;
          Order: <Components.DropDown 
            onChange={handleChangeOrder}
            options={ORDER_TYPE} 
            value={selectedOrder}
          />
        </h5>
      </div>
      <Components.GamesPagesContainer 
        gamesPerPage={gamesPerPage} 
        allGamesLength={videogamesToShow.length} 
        initialPage ={STARTING_PAGE}
        pagination={pagination}
      />
      <Components.GamesContainer games={gamesOnPage} />
    </div>
  )
}

export default Home