import { useState } from 'react'
import { BrowserRouter  as Router } from "react-router-dom";
import {CurrentAppProvider} from './contexts/currentApp'

function App() {


  return (
    <>
    <CurrentAppProvider>
      <Router basename={process.env.PUBLIC_URL }>
        <Routes />
      </Router>
    </CurrentAppProvider>
    </>
  )
}

export default App
