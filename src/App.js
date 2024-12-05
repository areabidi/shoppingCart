import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComponent from './components/Navbar';
import { Container } from 'react-bootstrap';
//react-router helps show different pages:
//localhost:3000 ->home
//localhost:3000/succcess -> Success
import {BrowserRouter, Routes, Route} from "react-router-dom"

import Cancel from './pages/Cancel';
import Success from './pages/Success';
import Store  from './pages/Store';

function App() {
  return (
    <Container>
    <NavbarComponent> </NavbarComponent>
    <BrowserRouter>
    <Routes>
      <Route index element ={<Store/>} />
      <Route path="success" element={<Success/>}/>
      <Route path="cancel" element={<Cancel/>}/>
    </Routes>
    </BrowserRouter>
     </Container>
  );
}

export default App;
