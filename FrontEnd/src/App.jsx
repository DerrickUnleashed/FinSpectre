import { useState } from 'react'
import Logo from '/Logo.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <img src={Logo} className="logo" alt="FinSpectre" />
      </div>
      <h1>FIN SPECTRE</h1>
      <h2>SMART WEALTH, SIMPLIFIED</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the logo to learn more about us!
      </p>
    </>
  )
}

export default App
