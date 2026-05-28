import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <ul className='buttons'>
          <li>Sıxlıq hesablayıcısı</li>
          <li>Oktan ədədinin müqayisəsi</li>
          <li>Ölçmə xətasının hesablanması</li>
        </ul>
      </section>
    </>
  )
}

export default App
