import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchByTag from './components/SearchByTag'
import UploadImage from './components/UploadImage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <button>Sign in</button>
        <button>Sign up</button>
        <button>Sign out</button>
        </div>

        <SearchByTag />
        <UploadImage />
    </>
  )
}

export default App
