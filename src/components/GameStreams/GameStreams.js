import { useState, useEffect } from 'react'
import api from '../../api'
import { useLocation, useParams, Link } from 'react-router-dom'

export default function GameStreams() {
  let { slug } = useParams()
  let location = useLocation()
  console.log(location)

  const [streamData, setStreamData] = useState([])
  const [viewers, setViewers] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`
      )
      let dataArray = result.data.data

      let finalArray = dataArray.map((stream) => {
        let newUrl = stream.thumbnail_url
          .replace('{width}', '320')
          .replace('{height}', '180')
        stream.thumbnail_url = newUrl
        return stream
      })

      // viewers total

      let totalViewers = finalArray.reduce((acc, val) => {
        return acc + val.viewer_count
      }, 0)

      let userIDs = dataArray.map((stream) => {
        return stream.user_id
      })

      let baseURl = 'https://api.twitch.tv/helix/users?'
      let queryParamsUsers = ''

      userIDs.map((id) => {
        return (queryParamsUsers = queryParamsUsers + `id=${id}&`)
      })
      let finalUrl = baseURl + queryParamsUsers

      let getUsersLogin = await api.get(finalUrl)

      let userLoginArray = getUsersLogin.data.data

      finalArray = dataArray.map((stream) => {
        stream.login = ''

        userLoginArray.forEach((login) => {
          if (stream.user_id === login) {
            stream.login = login.login
          }
        })
        return stream
      })
      setViewers(totalViewers)
      setStreamData(finalArray)
    }
    fetchData()
  }, [location])

  return (
    <div>
      <h1 className="streamsGamesTitle">Streams : {slug}</h1>
      <h3 className="streamsGamesSubtitle">
        <strong className="textColored">{viewers}</strong> personnes regardent{' '}
        {slug}
        <div className="flexHome">
          {streamData.map((stream, index) => (
            <div key={index} className="streamsGameCard">
              <img
                src={stream.thumbnail_url}
                alt="Game card"
                className="cardImg"
              />
              <div className="cardBodyGameStreams">
                <h5 className="streamCardTitle">{stream.user_name}</h5>
                <p className="streamText">
                  Nombre de viewers : {stream.viewer_count}
                </p>
                <Link
                  className="link"
                  to={{
                    pathname: `/live/${stream.login}`,
                  }}
                >
                  <div className="cardBtn">Regarder {stream.user_name}</div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </h3>
    </div>
  )
}
