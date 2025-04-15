import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './secciones/Home'
import { Context } from './Context'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Context>
        <Home/>
      </Context>
    </>
  )
}

export default App
