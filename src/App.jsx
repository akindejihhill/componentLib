import { useState } from 'react'
import ReactLogo from './assets/react.svg?react'
import ViteLogo from './assets/vite.svg?react'
import './App.css'

const unused = "unused";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <ViteLogo></ViteLogo>
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <ReactLogo></ReactLogo>
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div>
        <h2>Welcome to my component library</h2>
        <p>Hopefully soon I'll add a GUI here to browse through all the UI components in this library.</p>
      </div>
      <div>
        <h2>Included in this project:</h2>
        <ul>
          <li><em>Vite-plugin-svgr</em> for svg components</li>
          <li><em>splitVendorChunkPlugin</em> for better cache optimization</li>
          <li><em>postcss</em></li>
          <li><em>autoprefixer</em> for better browser compatability</li>
          <li><em>eslint</em> for better code</li>
          <li><em>vitest + testing-library</em> for test automation</li>
          <li><em>PropTypes</em> learn why these are important <a href="https://www.youtube.com/watch?v=cx0S8JyiVxc">here</a> </li>
        </ul>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
