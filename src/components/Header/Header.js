import twitchIcon from './IconTwitch.svg'
import searchIcon from './IconSearch.svg'
import menuIcon from './IconMenu.svg'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import closeIcon from './IconClose.svg'

export default function Header() {
  const [menu, setMenu] = useState(false)
  const [smallScreen, setSmallScreen] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 900px)')
    mediaQuery.addListener(handleMediaQueryChange)
    handleMediaQueryChange(mediaQuery)

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange)
    }
  })

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setSmallScreen(true)
    } else {
      setSmallScreen(false)
    }
  }

  const toggleNavRes = () => {
    setMenu(!menu)
  }

  const hideMenu = () => {
    if (menu === true) {
      setMenu(!menu)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleKeyPress = (e) => {
    setSearchInput(e.target.value)
  }

  return (
    <div>
      <nav className="headerTop">
        {(menu || !smallScreen) && (
          <ul className="listMenu">
            <li onClick={hideMenu} className="linkNav">
              <Link className="link" to="/">
                <img
                  src={twitchIcon}
                  alt="Twitch icon"
                  className="twitchIcon"
                />
              </Link>
            </li>
            <li onClick={hideMenu} className="linkNav">
              <Link className="link" to="/top-games">
                Top Games
              </Link>
            </li>
            <li onClick={hideMenu} className="linkNav">
              <Link className="link" to="/top-streams">
                Top Streams
              </Link>
            </li>
            <li className="linkNav">
              <form action="" className="formSubmit" onSubmit={handleSubmit}>
                <input
                  required
                  value={searchInput}
                  onChange={(e) => handleKeyPress(e)}
                  type="text"
                  className="inputSearch"
                  placeholder="Rechercher"
                />
                <Link
                  className="link"
                  to={{ pathname: `/results/${searchInput}` }}
                >
                  <button type="submit">
                    <img
                      src={searchIcon}
                      alt="Search icon"
                      className="searchIcon"
                    />
                  </button>
                </Link>
              </form>
            </li>
          </ul>
        )}
      </nav>
      <div className="resMenuBtn">
        <img
          onClick={toggleNavRes}
          src={!menu ? menuIcon : closeIcon}
          alt="Menu icon"
          className="menuIcon"
        />
      </div>
    </div>
  )
}
