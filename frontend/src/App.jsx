import './App.css';
import {Routes} from "react-router-dom";
import toast from "react-hot-toast"

function App() {
  const notify = toast("Hello")
  return (
   <>
     <button onClick={notify}>Click</button>
   </>
  )
}

export default App
