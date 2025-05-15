import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from './Component/Game';
import Learn from './Component/Learn';
import Crudoperation from './Component/Crudoperation'
import Updatedetaile from './Component/Updatedetaile';

function App() {
  return (
 <BrowserRouter>
 <Routes>
 <Route path='/game' element={<Game/>}/>
 <Route path='/learn' element={<Learn/>}/>
 <Route path='/crud' element ={<Crudoperation/>}/>
 <Route path='/update/:id' element={<Updatedetaile/>}/>
 <Route path='/update' element={<Updatedetaile/>}/>

 </Routes>
 </BrowserRouter>
  );
}

export default App;
