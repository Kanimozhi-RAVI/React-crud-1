import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from './Component/Game';
import Learn from './Component/Learn';
import Crudoperation from './Component/Crudoperation'

function App() {
  return (
 <BrowserRouter>
 <Routes>
 <Route path='/game' element={<Game/>}/>
 <Route path='/learn' element={<Learn/>}/>
 <Route path='/crud' element ={<Crudoperation/>}/>
 </Routes>
 </BrowserRouter>
  );
}

export default App;
