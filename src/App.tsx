import { useState } from 'react'
import TickerCard from './components/TickerCard/TickerCard'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    

        <TickerCard/>


    </>
  )
}

export default App
