import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Nav from "./src/components/Nav/Nav";
import Home from "./src/components/Home/Home";
import Login from "./src/components/Login/Login";
import SignUp from "./src/components/SignUp/SignUp";
import PrivateRoute from "./src/components/PrivateRoute/PrivateRoute";
import Profile from "./src/components/Profile/Profile";
import MusicMain from "./src/components/MusicMain/MusicMain";
import Album from "./src/components/Album/Album";


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
              <MusicMain user={props.user} access_token={props.access_token} />
            </PrivateRoute>} />
            <Route path="/music/:id" element={<PrivateRoute >
              <Album user={props.user} access_token={props.access_token} />
            </PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute user={props.user} >
              <Profile user={props.user} />
            </PrivateRoute>} />
            </Routes>  
        </Router>
    )
}

export default MainRouter