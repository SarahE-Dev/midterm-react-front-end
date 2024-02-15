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
import Sidebar from "./src/components/Sidebar/Sidebar";
import Favorites from "./src/components/Favorites/Favorites";
import Playlists from "./src/components/Playlists/Playlists";
import Song from "./src/components/Song/Song";



const MainRouter = (props)=> {
    return (
        <Router>
            <Nav user={props.user}
        handleUserLogout = {props.handleUserLogout} />
            {props.user ? <Sidebar handleUserLogout={props.handleUserLogout}></Sidebar> : ''}
            
            <Routes>
                <Route path='/'  element={props.user ? <Navigate to="/music"/> : <Home />} />
                <Route path="/login"  element={props.user ? <Navigate to="/music"/> : <Login getSpotifyToken={props.getSpotifyToken} handleUserLogin={props.handleUserLogin} />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/music" element={<PrivateRoute >
              <MusicMain user={props.user} 
              getSpotifyToken={props.getSpotifyToken}
              access_token={props.access_token} />
            </PrivateRoute>} />
            <Route path="/music/:id" element={<PrivateRoute >
              <Album user={props.user} access_token={props.access_token} />
            </PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute user={props.user} >
              <Profile user={props.user} />
            </PrivateRoute>} />
            <Route path="/favorites" element={<PrivateRoute user={props.user} >
              <Favorites user={props.user} access_token={props.access_token} />
            </PrivateRoute>} />
            <Route path="/playlists" element={<PrivateRoute user={props.user} >
              <Playlists playlists={props.playlists} user={props.user} access_token={props.access_token} />
            </PrivateRoute>} />
            <Route path="/song/:id" element={<PrivateRoute user={props.user} >
              <Song user={props.user} access_token={props.access_token} />
            </PrivateRoute>} />
            </Routes>  
        </Router>
    )
}

export default MainRouter