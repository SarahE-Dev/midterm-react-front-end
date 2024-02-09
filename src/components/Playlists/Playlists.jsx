import React, { Component } from 'react'
import './Playlists.css'
import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import axios from 'axios'

export class Playlists extends Component {
  state={
    playlists: [],
    playlistInput: ''
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
      console.log(newPlaylist);
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount(){
    console.log(this.props);
    try {
      const playlists = await axios.get(`http://localhost:3000/api/playlist/get-user-playlists/${this.props.user.username}`)
      this.setState({
        playlists: playlists
      })
      console.log(playlists);
    } catch (error) {
      console.log(error);
    }
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
          <Button onClick={this.handleOnSubmit}>Create Playlist</Button>
        </InputGroup>
      </div>
    )
  }
}

export default Playlists