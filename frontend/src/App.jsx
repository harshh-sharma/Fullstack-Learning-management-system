import './App.css';
import {Routes,Route} from "react-router-dom";
import toast from "react-hot-toast"
import Footer from './components/Footer';
import HomeLayouts from './Layouts/HomeLayouts';
import HomePage from './Pages/HomePage';

function App() {
 return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
    </Routes>
  )
}

export default App
