import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Login } from './components/Login.jsx';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import Admin from './components/Admin.jsx';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/admin' element={<Admin />}></Route>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
