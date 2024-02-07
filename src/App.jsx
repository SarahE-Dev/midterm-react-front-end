import {React, Component} from 'react'
import { Button } from 'react-bootstrap'
import Login from './components/Login/Login'
import { ToastContainer } from 'react-toastify'
import './App.css'
import MainRouter from '../MainRouter'
import SignUp from './components/SignUp/SignUp'
import { jwtDecode } from 'jwt-decode'
import setAxiosAuthToken from './utils/setAxiosAuthToken'



export class App extends Component {
  state = {
    user: null
  }
  componentDidMount(){
    let currentUser = window.localStorage.getItem('jwt') ? jwtDecode(window.localStorage.getItem('jwt')) : null;
    console.log(currentUser);
    if(currentUser && currentUser.exp > (Date.now() / 1000)){
      this.setState({
        user: {
          username: currentUser.username,
          email: currentUser.email,
          id: currentUser.id
        }
      })
    }
    setAxiosAuthToken(window.localStorage.getItem('jwt'))
  }
  handleUserLogin=(user)=>{
    this.setState({
      user: user
    })
  }
  handleUserLogout=(user)=>{
    this.setState({
      user: null
    })
    window.localStorage.removeItem('jwt')
    setAxiosAuthToken(null)
  }
  render() {
    return (
      <div>
        <ToastContainer position='top-center'/>
        <MainRouter handleUserLogout = {this.handleUserLogout} handleUserLogin = {this.handleUserLogin} 
        user={this.state.user} />
        
      </div>
    )
  }
}

export default App


