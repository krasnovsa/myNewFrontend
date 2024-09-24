import { useState } from 'react'
import { BrowserRouter  as Router } from "react-router-dom";
import {CurrentAppProvider} from './contexts/currentApp'
import AppRoutes from "./routes";

function App() {

  return (
    <>
    <h1>Hello world</h1>
    <CurrentAppProvider>
      <Router >
        <AppRoutes />
      </Router>
    </CurrentAppProvider>
    </>
  )
}

export default App
