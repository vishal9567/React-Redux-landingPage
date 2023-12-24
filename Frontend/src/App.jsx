import React from 'react'
import DashBoard from './pages/DashBoard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path='/' Component={DashBoard} />
        </Routes>
      </Provider>
    </Router>
  )
}

export default App
