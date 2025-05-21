import { useState, FC } from 'react'
import TickerCard from './components/TickerCard/TickerCard'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const App: React.FC = () => {
  //const [count, setCount] = useState(0)

  return (
    <>
    

        <TickerCard coinNumber={4}/>


    </>
  )
}

export default App
