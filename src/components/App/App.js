import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../Home/Home'
import Contact from '../Contact/Contact'

import { store } from '../../redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <div className='font-bold text-bold'>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contacts' element={<Contact />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  )
}

export default App
