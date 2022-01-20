import './App.css'
import Games from './components/Games/Games'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TopStreams from './components/TopStreams/TopStreams'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Games />} />
          <Route exact path="/top-streams" element={<TopStreams />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
