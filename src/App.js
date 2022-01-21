import './App.css'
import Games from './components/Games/Games'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TopStreams from './components/TopStreams/TopStreams'
import Live from './components/Live/Live'
import GameStreams from './components/GameStreams/GameStreams'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Games />} />
          <Route exact path="/top-streams" element={<TopStreams />} />
          <Route exact path="/live/:slug" element={<Live />} />
          <Route exact path="/game/:slug" element={<GameStreams />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
