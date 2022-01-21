import twitchIcon from './IconTwitch.svg'
import searchIcon from './IconSearch.svg'
import menuIcon from './IconMenu.svg'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div>
      <nav className="headerTop">
        <ul className="listMenu">
          <li className="linkNav">
            <Link className="link" to="/">
              <img src={twitchIcon} alt="Twitch icon" className="twitchIcon" />
            </Link>
          </li>
          <li className="linkNav">
            <Link className="link" to="/top-games">
              Top Games
            </Link>
          </li>
          <li className="linkNav">
            <Link className="link" to="/top-streams">
              Top Streams
            </Link>
          </li>
          <li className="linkNav">
            <form action="" className="formSubmit">
              <input
                type="text"
                className="inputSearch"
                placeholder="Rechercher"
              />
              <button type="submit">
                <img
                  src={searchIcon}
                  alt="Search icon"
                  className="searchIcon"
                />
              </button>
            </form>
          </li>
        </ul>
      </nav>
      <div className="resMenuBtn">
        <img src={menuIcon} alt="Menu icon" className="menuIcon" />
      </div>
    </div>
  )
}
