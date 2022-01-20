import './App.css'
import Games from './components/Games/Games'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Games />
    </div>
  )
}

export default App
