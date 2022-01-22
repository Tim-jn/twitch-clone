import { useEffect, useState } from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'

export default function Games() {
  const [games, setGames] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get('https://api.twitch.tv/helix/games/top')
      //   console.log(result);

      let dataArray = result.data.data
      let finalArray = dataArray.map((game) => {
        let newUrl = game.box_art_url
          .replace('{width}', '250')
          .replace('{height}', '305')
        game.box_art_url = newUrl
        return game
      })
      setGames(finalArray)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1 className="gamesTitle">Jeux les plus populaires</h1>
      <div className="flexHome">
        {games.map((game, index) => (
          <div key={index} className="gameCard">
            <img src={game.box_art_url} alt="Game" className="cardImg" />
            <div className="cardBodyGames">
              <h5 className="gameTitle">{game.name}</h5>
              <Link
                className="link"
                to={{
                  pathname: 'game/' + game.name,
                }}
                state={{ gameID: game.id }}
              >
                <div className="cardBtn">Regarder {game.name}</div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
