import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Nav from "./src/components/Nav/Nav";
import Home from "./src/components/Home/Home";
import Login from "./src/components/Login/Login";
import SignUp from "./src/components/SignUp/SignUp";
import PrivateRoute from "./src/components/PrivateRoute/PrivateRoute";
import Profile from "./src/components/Profile/Profile";
import MusicMain from "./src/components/MusicMain/MusicMain";

const MainRouter = (props)=> {
    return (
        <Router>
            <Nav user={props.user}
        handleUserLogout = {props.handleUserLogout} />
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path="/login"  element={props.user ? <Navigate to="/music"/> : <Login handleUserLogin={props.handleUserLogin} />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/music" element={<PrivateRoute >
              <MusicMain/>
            </PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute user={props.user} >
              <Profile user={props.user} />
            </PrivateRoute>} />

                {/* <Route path="/profile" element={<PrivateRoute user={props.user} >
                <Profile user={props.user} />
                </PrivateRoute>} />
                <Route path="/music-app" element={<PrivateRoute user={props.user} >
                <MusicMain/>
                </PrivateRoute>} />
                <Route path='/' element={ <Home user={props.user} /> } />
                <Route path='/sign-up' element={<SignUp/>} />
                <Route path='/login' element={<Login handleUserLogin={props.handleUserLogin} />} /> */}
            </Routes>  
        </Router>
    )
}

export default MainRouter