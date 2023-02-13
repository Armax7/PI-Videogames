import React from 'react'

function GamesPagesContainer(props) {
    const {gamesPerPage, allGamesLength, initialPage, pagination} = props;
    try {
        const pageNumbers = [];
        const lastPage = Math.ceil(allGamesLength/gamesPerPage);
        for (let i = initialPage; i <= lastPage; i++){
            pageNumbers.push(i);
        }
    
      return (
        <nav>
            <ul className='pagination'>
                {pageNumbers && pageNumbers.map(num => (
                    <li key={num} className='number'>
                        <a onClick={() => pagination(num)} >{num}</a>
                    </li>
                ))}
            </ul>
        </nav>
      )
    }
    catch (error) {
        console.log(error);
        throw error;
    }

}

export default GamesPagesContainer