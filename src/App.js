import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Game from './Component/Game';
import Learn from './Component/Learn';




function App() {

  
  return (
 <BrowserRouter>
 <Routes>
 <Route path='/game' element={<Game/>}/>
 <Route path='/learn' element={<Learn/>}/>
 </Routes>
 </BrowserRouter>
  );
}

export default App;
