import './App.css';
import { Routes, Route } from "react-router-dom";
import toast from "react-hot-toast"
import Footer from './components/Footer';
import HomeLayouts from './Layouts/HomeLayouts';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import NotFoundPage from './Pages/NotFoundPage';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import CoursePage from './Pages/CoursePage';
import CourseDescription from './Pages/CourseDescription';
import DeniesPage from './Pages/DeniesPage';
import CreateCourse from './Pages/CreateCourse';
import Authentication from './Pages/Authentication';
import UserProfile from './Pages/UserProfile';
import EditProfile from './Pages/EditProfile';
import Checkout from './Pages/Payments/Checkout'
import Success from './Pages/Payments/Sucess';
import DisplayLectures from './Pages/Dasboard/DisplayLectures';
import AddLecture from './Pages/Dasboard/AddLecture';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/courses" element={<CoursePage />} />
      <Route path="/course/description" element={<CourseDescription />} />
      <Route path="/denied" element={<DeniesPage />} />
      <Route element={<Authentication allowedRoles={["ADMIN","USER"]} />}>
        <Route path="/course/create" element={<CreateCourse />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/course/lecture" element={<DisplayLectures />} />
        <Route path="/course/addlecture" element={<AddLecture />} />
      </Route>
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
