import api from '../../api'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import { useEffect } from 'react'
import Error from '../Error/Error'

export default function Results() {
  let { slug } = useParams()

  const [result, setResult] = useState(true)

  const [streamerInfo, setStreamerInfo] = useState([])

  let cleanSearch = slug.replace(/ /g, '')

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/users?login=${cleanSearch}`
      )
      console.log(result)

      if (result.data.data.length === 0) {
        setResult(false)
      } else {
        setStreamerInfo(result.data.data)
      }
    }
    fetchData()
  }, [cleanSearch])

  return result ? (
    <div>
      <div className="containerResults">
        <h4>Résultats de recherche :</h4>
        {streamerInfo.map((stream, index) => (
          <div key={index} className="cardResults">
            <img
              src={stream.profile_image_url}
              alt="Profile result"
              className="cardImg"
            />
            <div className="cardBodyResults">
              <h5 className="cardStreamTitle">{stream.display_name}</h5>
              <div className="resultsText">{stream.description}</div>
              <Link className="link" to={{ pathname: `/live/${stream.login}` }}>
                <div className="cardBtn resultBtn">
                  Regarder {stream.display_name}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Error />
  )
}
