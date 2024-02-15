import {React, Component} from 'react'
import { Button } from 'react-bootstrap'
import Login from './components/Login/Login'
import { ToastContainer } from 'react-toastify'
import './App.css'
import MainRouter from '../MainRouter'
import SignUp from './components/SignUp/SignUp'
import { jwtDecode } from 'jwt-decode'
import setAxiosAuthToken from './utils/setAxiosAuthToken'
import axios from 'axios'
import Axios from './utils/Axios'

const clientId = 'ecd8fa6a04bd4deab879476a85c542b4'
const clientSecret = '0058529087bb4a53872707043a4cf1ff'
const grantType = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`


export class App extends Component {
  state = {
    user: null,
    access_token: '',
    playlists: []
  }
  async componentDidMount(){
    let currentUser = window.localStorage.getItem('jwt') ? jwtDecode(window.localStorage.getItem('jwt')) : null;
    console.log(currentUser);
    if(currentUser && currentUser.exp > (Date.now() / 1000)){
      let token_time = window.localStorage.getItem('token_time')
      if(!token_time || (Date.now() - token_time > 3599)){
        this.grabSpotifyToken()
      }
      let playlists = await Axios.get(`http://localhost:3000/api/playlist/get-user-playlists/${currentUser.username}`)
      this.setState({
        user: {
          username: currentUser.username,
          email: currentUser.email,
          id: currentUser.id,
          playlists: playlists,
          lastName: currentUser.lastName
        }
      })
    }
    setAxiosAuthToken(window.localStorage.getItem('jwt'))
    
  }

  grabSpotifyToken=async()=>{
    let token = await axios.post('https://accounts.spotify.com/api/token', grantType, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    window.localStorage.setItem('access_token', token.data.access_token)
    window.localStorage.setItem('token_time', Date.now())
  }

  handleUserLogin= async (user)=>{
    
    this.grabSpotifyToken()
    let playlists = await Axios.get(`http://localhost:3000/api/playlist/get-user-playlists/${user.username}`)
    
    this.setState({
      user: user,
      access_token: window.localStorage.getItem('access_token'),
      playlists: playlists.data.payload
    })
  }
  handleUserLogout=(user)=>{
    this.setState({
      user: null,
      access_token: '',
      playlists: [],
      token_time: ''
    })
    window.localStorage.removeItem('jwt')
    window.localStorage.removeItem('access_token')
    setAxiosAuthToken(null)
  }
  

  
  
  render() {
    return (
      <div>
        <ToastContainer position='top-center'/>
        <MainRouter getSpotifyToken={this.grabSpotifyToken} playlists={this.state.playlists} access_token={this.state.access_token} handleUserLogout = {this.handleUserLogout} handleUserLogin = {this.handleUserLogin} 
        user={this.state.user} />
        
      </div>
    )
  }
}

export default App


