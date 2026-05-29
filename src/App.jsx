// import { useState } from 'react'
// import './App.css'
// import DensityCalc from './components/Density/DensityCalc'
// import OctaneCalc from './components/Octane/OctaneCalc'

// function App() {
//   const [isActiveDensity, setIsActiveDensity] = useState(0)
//   const [isActiveOctane, setIsActiveOctane] = useState(0)
//   const [isActiveErr, setIsActiveErr] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <ul className='buttons'>
//           <li onClick={() => {
//             setIsActiveDensity(1);
//             setIsActiveErr(0);
//             setIsActiveOctane(0);
//           }}>
//             Sıxlıq hesablayıcısı
//           </li>
//           <li onClick={() => {
//             setIsActiveDensity(0);
//             setIsActiveErr(0);
//             setIsActiveOctane(1);
//           }}>
//             Oktan ədədinin müqayisəsi
//           </li>
//           <li onClick={() => {
//             setIsActiveDensity(0);
//             setIsActiveErr(1);
//             setIsActiveOctane(0);
//           }}>
//             Ölçmə xətasının hesablanması
//           </li>
//         </ul>
//         <div className='center'>
//           {isActiveDensity ? <DensityCalc/> : 
//           isActiveErr? <div>Error calculator</div> : 
//           isActiveOctane? <OctaneCalc/> : 
//           <></>}
//         </div>
//       </section>
//     </>
//   )
// }

// export default App

import { useState } from 'react'
import './App.css'
import DensityCalc from './components/Density/DensityCalc'
import OctaneCalc from './components/Octane/OctaneCalc'
import SulfurCalc from './components/Sulfur/SulfurCalc'
import ErrorCalc from './components/MeasureErr/ErrorCalc'

function App() {
  const [activeTab, setActiveTab] = useState(null)

  return (
    <>
      <section id="center">
        <ul className='buttons'>
          <li
            className={`tab-btn ${activeTab === 'density' ? 'active' : ''}`}
            onClick={() => setActiveTab('density')}>
            Sıxlıq hesablayıcısı
          </li>
          <li
            className={`tab-btn ${activeTab === 'octane' ? 'active' : ''}`}
            onClick={() => setActiveTab('octane')}>
            Oktan ədədinin müqayisəsi
          </li>
          <li
            className={`tab-btn ${activeTab === 'sulfur' ? 'active' : ''}`}
            onClick={() => setActiveTab('sulfur')}>
            Kükürd miqdarı
          </li>
          <li
            className={`tab-btn ${activeTab === 'error' ? 'active' : ''}`}
            onClick={() => setActiveTab('error')}>
            Ölçmə xətasının hesablanması
          </li>
        </ul>
        <div className='center'>
          {activeTab === 'density' && <DensityCalc />}
          {activeTab === 'octane' && <OctaneCalc />}
          {activeTab === 'error' && <ErrorCalc/>}
          {activeTab === 'sulfur' && <SulfurCalc/> }
        </div>
      </section>
    </>
  )
}

export default App