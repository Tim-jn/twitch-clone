import twitchIcon from './IconTwitch.svg'
import searchIcon from './IconSearch.svg'
import menuIcon from './IconMenu.svg'

export default function Header() {
  return (
    <div>
      <nav className="headerTop">
        <ul className="listMenu">
          <li className="linkNav">
            <img src={twitchIcon} alt="Twitch icon" className="twitchIcon" />
          </li>
          <li className="linkNav">Top Games</li>
          <li className="linkNav">Top Streams</li>
          <li className="linkNav">
            <form action="" className="formSubmit">
              <input type="text" className="inputSearch" placeholder="Rechercher" />
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
