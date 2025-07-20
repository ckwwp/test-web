import './styles/App.css'
import Home from './pages/Home'
import CharacterCounter from './pages/CharacterCounter'
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/CharCounter" element={<CharacterCounter />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
