import { useState } from 'react'
import './App.css'
import DensityCalc from './components/Density/DensityCalc'

function App() {
  const [isActiveDensity, setIsActiveDensity] = useState(0)
  const [isActiveOctane, setIsActiveOctane] = useState(0)
  const [isActiveErr, setIsActiveErr] = useState(0)

  return (
    <>
      <section id="center">
        <ul className='buttons'>
          <li onClick={() => {
            setIsActiveDensity(1);
            setIsActiveErr(0);
            setIsActiveOctane(0);
          }}>
            Sıxlıq hesablayıcısı
          </li>
          <li onClick={() => {
            setIsActiveDensity(0);
            setIsActiveErr(0);
            setIsActiveOctane(1);
          }}>
            Oktan ədədinin müqayisəsi
          </li>
          <li onClick={() => {
            setIsActiveDensity(0);
            setIsActiveErr(1);
            setIsActiveOctane(0);
          }}>
            Ölçmə xətasının hesablanması
          </li>
        </ul>
        <div className='center'>
          {isActiveDensity ? <DensityCalc/> : 
          isActiveErr? <div>Error calculator</div> : 
          isActiveOctane? <div>Octane calculator</div> : 
          <></>}
        </div>
      </section>
    </>
  )
}

export default App
