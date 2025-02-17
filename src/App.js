import "./App.css";
import { useEffect } from "react"
import "./App.css"
// Redux
import { Toaster } from 'react-hot-toast';
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
import ProfileComponent from "./Profile/ProfileComponent";
import Settings from "./Profile/Settings";
import VerifyEmail from "./Auth/VerifyEmail";
import OpenRoute from "./Auth/OpenRoute";
import UpdateSection from "./Updates/Update";
import { getUserDetails } from "./services/operations/profileAPI"
import { setUser } from "./slices/profileSlice";
import Likecourse from "./Profile/Likecourse";
import Mycourse from "./Profile/Mycourse";
import UpdatePassword from "./Auth/UpdatePassword";
import PrivateRoute from "./Auth/PrivateRoute";
import ForgotPassword from "./Auth/Forgotpassword";
import Traverse from "./Extras/Traverse";
function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)
  console.log("---testing--->",user)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
// useEffect(() => {
  //   // Check for stored user data on app initialization
  //   const storedUser = localStorage.getItem("user")
  //   if (storedUser) {
  //     dispatch(setUser(JSON.parse(storedUser)))
  //   }
  // }, [dispatch])
  return (
    <div className={`relative min-h-screen z-0 overflow-x-hidden`}>


<Toaster position="top-center" />
      <Routes>
      <Route
          path="login"
          element={

            <OpenRoute>
  <Login />
            </OpenRoute>
            
 
          
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


<Route path="update" element={<UpdateSection/>}/>
<Route path="insight" element={<Insighthome/>}/>
       
    
        <Route path="/" element={
          
          <Home/>}/>

<Route path="contact" element={<Contact/>}/>
        
        <Route
          path="signup"
          element={
            <OpenRoute>
   <Signup />
            </OpenRoute>
            
           
            
          }
        />
        <Route
          path="verify-email"
          element={
    <OpenRoute>
<VerifyEmail />
    </OpenRoute>
            
          }
        />

<Route
          path="forgot-password"
          element={
    <OpenRoute>
<ForgotPassword/>
    </OpenRoute>
            
          }
        />

<Route
        path="my-profile/saved-items"
        element={
          <PrivateRoute>
            <Likecourse />
          </PrivateRoute>
        }
      />
      <Route
        path="my-profile/my-items"
        element={
          <PrivateRoute>
            <Mycourse />
          </PrivateRoute>
        }
      />
      <Route
        path="worship"
        element={
          <PrivateRoute>
            <Worship />
          </PrivateRoute>
        }
      />
      <Route
        path="food/filters"
        element={
          <PrivateRoute>
            <Foodfilter />
          </PrivateRoute>
        }
      />
      <Route
        path="expeditions"
        element={
          <PrivateRoute>
            <Traverse/>
          </PrivateRoute>
        }
      />
      <Route
        path="dine"
        element={
          <PrivateRoute>
            <Food />
          </PrivateRoute>
        }
      />

<Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

      {/* Additional Protected Routes */}
      <Route
        path="Buy"
        element={
          <PrivateRoute>
            <BuyPage />
          </PrivateRoute>
        }
      />
      <Route
        path="sell"
        element={
          <PrivateRoute>
            <UploadItemForm />
          </PrivateRoute>
        }
      />
      <Route
        path="my-profile"
        element={
          <PrivateRoute>
            <ProfileComponent />
          </PrivateRoute>
        }
      />
      <Route
        path="my-profile/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
    

 
        
      </Routes>
    </div>
  );
}

export default App;
