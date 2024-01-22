import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/HomePage';
import Contact from './pages/ContactPage';
import AboutUs from './pages/AboutUsPage';
import Search from './pages/SearchPage';
import Villas from './pages/VillasPage';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element ={<Home/>}/>
          <Route path='/home' element ={<Home/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/about' element ={<AboutUs/>}/>
          <Route path='/search' element ={<Search/>}/>
          <Route path='/properties' element ={<Villas/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
