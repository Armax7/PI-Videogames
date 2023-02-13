import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Filter from '../../components/Filter/Filter';
import GamesContainer from '../../components/GamesContainer/GamesContainer';
import GamesPagesContainer from '../../components/GamesPagesContainer/GamesPagesContainer';
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

  const genresOptions = [Constant.ALL, ...allGenres];
  const [selectedGenre, setSelectedGenre] = useState(genresOptions.at(0));

  const gameOrigins = [Constant.ALL, Constant.EXISTING_GAME, Constant.CREATED_GAME]
  const [selectedOrigin, setSelectedOrigin] = useState(gameOrigins.at(0));

  const sortTypes = [Constant.ALPHABETICAL, Constant.RATING]
  const [selectedSortType, setSelectedSortType] = useState(sortTypes.at(0));

  const orders = [Constant.ASCENDING, Constant.DESCENDING];
  const [selectedOrder, setSelectedOrder] = useState(orders.at(0));

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
    setSelectedGenre(genresOptions.at(0));
    setSelectedOrigin(gameOrigins.at(0));
    setSelectedSortType(sortTypes.at(0));
    setSelectedOrder(orders.at(0));
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
      <Link to={'/videogames'} >Add videogame</Link>
      <h1>Videogames</h1>
      <button onClick={handleClickResetFilters} >Reset Filters</button>
      <h4>Filter by: </h4>
      <div>
        <h5>
          Genre: <Filter 
            onChange={handleChangeGenre} 
            options={genresOptions} 
            value={selectedGenre}
          />&nbsp;
          Origin: <Filter 
            onChange={handleChangeOrigin}
            options={gameOrigins} 
            value={selectedOrigin}
          />
        </h5>
        <h5>
          Sort: <Filter 
            onChange={handleChangeSortType}
            options={sortTypes} 
            value={selectedSortType}
          />&nbsp;
          Order: <Filter 
            onChange={handleChangeOrder}
            options={orders} 
            value={selectedOrder}
          />
        </h5>
      </div>
      <GamesPagesContainer 
        gamesPerPage={gamesPerPage} 
        allGamesLength={videogamesToShow.length} 
        initialPage ={STARTING_PAGE}
        pagination={pagination}
      />
      <GamesContainer games={gamesOnPage} />
    </div>
  )
}

export default Home