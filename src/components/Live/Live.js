import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../../api'

export default function Live() {
  let { slug } = useParams()

  const [streamInfo, setStreamInfo] = useState([])
  const [gameInfo, setGameInfo] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/streams?user_login=${slug}`
      )
      if (result.data.data.length === 0) {
        setStreamInfo(false)
      } else {
        let gameID = result.data.data.map((gameid) => {
          return gameid.game_id
        })

        const resultGameName = await api.get(
          `https://api.twitch.tv/helix/games?id=${gameID}`
        )

        let gameName = resultGameName.data.data.map((gameName) => {
          return gameName.name
        })

        setGameInfo(gameName)
        setStreamInfo(result.data.data[0])
      }
    }
    fetchData()
  }, [slug])

  return streamInfo ? (
    <div className="container">
      <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
      <div className="contInfo">
        <div className="streamTitle">{streamInfo.title}</div>
        <div className="viewer">Viewers : {streamInfo.viewer_count}</div>
        <div className="gameInfo">
          Streamer : {streamInfo.user_name}, &nbsp; Langue :{' '}
          {streamInfo.language}
        </div>
        <div className="gameName">Jeu : {gameInfo}</div>
      </div>
    </div>
  ) : (
    <div className="container">
      <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
      <div className="contInfo">
        <div className="streamTitle">Le streamer est offline !</div>
      </div>
    </div>
  )
}
