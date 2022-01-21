import { useEffect, useState } from 'react'
import api from '../../api'

export default function TopStreams() {
  const [channels, setChannels] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get('https://api.twitch.tv/helix/streams')

      let dataArray = result.data.data

      let gameIDs = dataArray.map((stream) => {
        return stream.game_id
      })
      let userIDs = dataArray.map((stream) => {
        return stream.user_id
      })

      // custom urls

      let baseUrlGames = 'https://api.twitch.tv/helix/games?'
      let baseUrlUsers = 'https://api.twitch.tv/helix/users?'

      let queryParamsGame = ''
      let queryParamsUsers = ''

      gameIDs.map((id) => {
        return (queryParamsGame = queryParamsGame + `id=${id}&`)
      })
      userIDs.map((id) => {
        return (queryParamsUsers = queryParamsUsers + `id=${id}&`)
      })

      // final urls

      let finalUrlGames = baseUrlGames + queryParamsGame
      let finalUrlUsers = baseUrlUsers + queryParamsUsers

      // calls

      let gamesNames = await api.get(finalUrlGames)
      let getUsers = await api.get(finalUrlUsers)

      let gamesNameArray = gamesNames.data.data
      let arrayUsers = getUsers.data.data

      // final data array

      let finalArray = dataArray.map((stream) => {
        stream.gameName = ''
        stream.login = ''

        gamesNameArray.forEach((name) => {
          arrayUsers.forEach((user) => {
            if (stream.user_id === user.id && stream.game_id === name.id) {
              stream.truePic = user.profile_image_url
              stream.gameName = name.name
              stream.login = user.login
            }
          })
        })
        let newUrl = stream.thumbnail_url
          .replace('{width}', '320')
          .replace('{height}', '180')
        stream.thumbnail_url = newUrl
        return stream
      })
      setChannels(finalArray)
    }
    fetchData()
  }, [])
  return (
    <div>
      <h1 className="gamesTitle">Stream les plus populaires</h1>
      <div className="flexHome">
        {channels.map((channel, index) => (
          <div key={index} className="streamCard">
            <img src={channel.thumbnail_url} alt="Game" className="cardImg" />
            <div className="cardBodyStream">
              <h5 className="streamCardTitle">{channel.user_name}</h5>
              <p className="streamText">Jeu : {channel.gameName}</p>
              <p className="streamText viewers">
                Viewers : {channel.viewer_count}
              </p>
              <div className="cardBtn">Regarder {channel.user_name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
