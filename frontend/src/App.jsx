import './App.css';
import {Routes,Route} from "react-router-dom";
import toast from "react-hot-toast"
import Footer from './components/Footer';
import HomeLayouts from './Layouts/HomeLayouts';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import NotFoundPage from './Pages/NotFoundPage';

function App() {
 return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  )
}

export default App
