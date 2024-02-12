import React, { Component } from 'react'
import './Playlists.css'
import { Button, Container, Form, InputGroup, Accordion } from 'react-bootstrap'
import axios from 'axios'

export class Playlists extends Component {
  state={
    playlists: [],
    playlistInput: '',
    playlistsRecieved: false
  }

  handleOnChange=(e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnSubmit= async (e)=>{
    e.preventDefault()
    try {
      const newPlaylist = await axios.post('http://localhost:3000/api/playlist/create-playlist', {
        username: this.props.user.username,
        playlistName: this.state.playlistInput
      })
      this.setState({
        playlists: [...this.state.playlists,newPlaylist.data.payload]
      })
      console.log(newPlaylist);
    } catch (error) {
      console.log(error);
    }
  }

  getPlaylists=async()=>{
    try {
      const playlists = await axios.get(`http://localhost:3000/api/playlist/get-user-playlists/${this.props.user.username}`)
      this.setState({
        playlists: [...playlists.data.payload],
        playlistsRecieved: true
      })
      console.log(playlists);
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(!this.props.user || (prevState.playlistsRecieved && prevState.playlistsRecieved === this.state.playlistsRecieved)){
      return
    }
    this.getPlaylists()
  }

  componentDidMount(){
    if(!this.props.user){
      return
    }
    this.getPlaylists()
  }



  


  

  render() {
    return (
      <div className='Playlists'>
        
        <InputGroup style={{width: '50vw', marginLeft: '15vw', paddingTop: '10vh'}} className='playlistInput'>
          <Form.Control
          placeholder='Enter Playlist Name'
          value={this.state.playlistInput}
          name='playlistInput'
          onChange={this.handleOnChange}
          ></Form.Control>
          <Button variant='dark' onClick={this.handleOnSubmit}>Create Playlist</Button>
        </InputGroup>

        <div style={{color: 'white'}}>{this.state.playlists.map(item=>{
          return (
            <h1>{item.playlistName}</h1>
          )
        })}</div>
        
      </div>
    )
  }
}

export default Playlists