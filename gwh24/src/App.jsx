import { useState } from 'react'
import './App.css'

function App() {

  const [userInput, setUserInput] = useState('');

  return (
    <>
      <h1>
        How are you feeling today?
      </h1>
      <div class="input-wrapper">
        <input type="text" placeholder="Type here..." name="text" class="input"  value={userInput} onChange={e => setUserInput(e.target.value)} />
      </div>
    </>
  )
}

export default App
