import "./App.css";
import { useEffect } from "react"
import "./App.css"
// Redux
import { useDispatch, useSelector } from "react-redux"
import { Route, Routes, useNavigate } from "react-router-dom"
import { Login } from "./Auth/Login";
import Signup from "./Auth/Signup";
import Insighthome from "./Insights/Insighthome";
import { Home } from "./Home/Home";
import Contact from "./Contact/Contact";
import UploadItemForm from "./Exchange/Sell_Item";
import { Food } from "./Extras/food";
import Worship from "./Extras/worship";
import Foodfilter from "./Extras/foodfilter";
import Travel from "./Extras/Travel";
import BuyPage from "./Exchange/Buy";
import VerifyEmail from "./Auth/VerifyEmail";
import OpenRoute from "./Auth/OpenRoute";
import UpdateSection from "./Updates/Update";

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className={`relative min-h-screen z-0 overflow-x-hidden`}>
      <Routes>
      <Route
          path="login"
          element={
            
              <Login />
          
          }
        />
        {/* <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        /> */}
        {/* <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        /> */}
        <Route
          path="signup"
          element={
            
              <Signup />
            
          }
        />
        <Route
          path="verify-email"
          element={
    
              <VerifyEmail />
        
          }
        />
        <Route path="update" element={<UpdateSection/>}/>
        <Route path="insight" element={<Insighthome/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="sell" element={<UploadItemForm/>}/>
        <Route path="food" element={<Food/>}/>
        <Route path="worship" element={<Worship/>}/>
        <Route path="food/filters" element={<Foodfilter/>}/>
        <Route path="Travel" element={<Travel/>}/>
        <Route path="/Buy" element={<BuyPage/>}/>


      </Routes>
    </div>
  );
}

export default App;
