import React, { Component } from 'react'
import './Playlists.css'
import { Button, Container, Form, InputGroup, Accordion } from 'react-bootstrap'
import axios from 'axios'
import Axios from '../../utils/Axios'
import { NavLink } from 'react-router-dom'


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
    if(this.state.playlistInput !== ''){
      try {
        const newPlaylist = await axios.post('http://localhost:3000/api/playlist/create-playlist', {
          username: this.props.user.username,
          playlistName: this.state.playlistInput
        })
        this.setState({
          playlists: [...this.state.playlists, newPlaylist.data.payload]
        })
        
      } catch (error) {
        console.log(error);
      }
    }
    
  }

  getPlaylists=async()=>{
    try {
      const playlists = await axios.get(`http://localhost:3000/api/playlist/get-user-playlists/${this.props.user.username}`)
      this.setState({
        playlists: playlists.data.payload,
        playlistsRecieved: true
      })
    } catch (error) {
      console.log(error);
    }
  }

  removeSongFromPlaylist=async(plID, sID)=>{
    try {
      const deleted = await Axios.put(`http://localhost:3000/api/playlist/delete-song/${plID}/${sID}`)
      console.log(deleted);
      this.getPlaylists()
    } catch (error) {
      console.log(error);
    }
  }

  removePlaylist=async(id)=>{
    try {
        const deleted = await Axios.delete(`http://localhost:3000/api/playlist/delete-playlist/${id}`)
        console.log(deleted);
        const updatedPlaylists = this.state.playlists.filter(pl=>pl._id !== id)
        this.setState({
          playlists: updatedPlaylists
        })
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
          style={{backgroundColor: 'rgb(199, 20, 86)', border: '1px solid black', color: 'white'}}
          placeholder='Enter Playlist Name'
          value={this.state.playlistInput}
          name='playlistInput'
          onChange={this.handleOnChange}
          ></Form.Control>
          <Button variant='dark' onClick={this.handleOnSubmit}>Create Playlist</Button>
        </InputGroup>

        <Accordion  style={{width: '60vw', margin: '10vw'}}>
          {this.state.playlists.map((item, i)=>{
            return (
                <Accordion.Item className='bg-black text-white' key={`item${item._id}`} eventKey={i}>
                  <Accordion.Header  key={`head${item._id}`}>{item.playlistName}</Accordion.Header>
                  <Accordion.Body key={`body${item._id}`}>
                    {item.songs ? item.songs.map(li=>{
                      return (
                        <div className='d-flex justify-content-between mb-3 align-items-center'>
                          <NavLink className='songLink' style={{textDecoration: 'none', color: 'blueviolet'}} to={`/song/${li.songID}`}>{li.songTitle}</NavLink>
                        
                        <Button variant='secondary' size='sm' onClick={()=>this.removeSongFromPlaylist(item._id, li.songID)}><span
                        style={{paddingTop: 4}}
                        className="material-symbols-outlined">
                        delete_forever
                        </span></Button>
                        
                        </div>
                        
                      )
                    }) : ''}
                    <Button className='deleteP' style={{backgroundColor: 'rgb(199, 20, 86)', border: '1px solid white', color: 'white'}} onClick={()=>this.removePlaylist(item._id)}>Delete Playlist</Button>
                  </Accordion.Body>
                  
                    
                  
                </Accordion.Item>
            )
          })}
        </Accordion>
        
      </div>
    )
  }
}

export default Playlists