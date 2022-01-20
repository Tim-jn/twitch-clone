import { useState, useEffect } from 'react'
import api from '../../api'

export default function Sidebar() {
  const [topStreams, setTopStreams] = useState([])

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
        stream.truePic = ''
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
        return stream
      })
      setTopStreams(finalArray.slice(0, 6))
    }
    fetchData()
  }, [])

  return (
    <div className="sidebar">
      <h2 className="sidebarTitle">Chaînes recommandées</h2>
      <ul className="streamList">
        {topStreams.map((stream, index) => (
          <li key={index} className="containerFlexSidebar">
            <img
              src={stream.truePic}
              alt="User profile"
              className="profilePicture"
            />
            <div className="streamUser">{stream.user_name}</div>
            <div className="viewerRight">
              <div className="redDot"></div>
              <div>{stream.viewer_count}</div>
            </div>
            <div className="gameNameSidebar">{stream.gameName}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
