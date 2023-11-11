import Login from './components/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './components/Signup'
import Home from './components/Home'
import Info from './components/Info'
import './index.css';

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/info' element={<Info/>}></Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
