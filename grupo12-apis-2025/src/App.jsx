import { Home } from './secciones/Home'
import { Context } from './Context'
import './App.css'

function App() {
  return (
    <>
      <Context>
        <Home/>
      </Context>
    </>
  )
}

export default App
