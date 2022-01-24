import './App.css'
import Games from './components/Games/Games'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TopStreams from './components/TopStreams/TopStreams'
import Live from './components/Live/Live'
import GameStreams from './components/GameStreams/GameStreams'
import Results from './components/Results/Results'
import Error from './components/Error/Error'

function App() {
  return (
    <Router forceRefresh={true}>
      <div className="App">
        <Header />
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Games />} />
          <Route exact path="/top-games" element={<Games />} />
          <Route exact path="/top-streams" element={<TopStreams />} />
          <Route exact path="/live/:slug" element={<Live />} />
          <Route exact path="/game/:slug" element={<GameStreams />} />
          <Route exact path="/results/:slug" element={<Results />} />
          <Route exact path="/results/" element={<Error />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
