import React, { Component } from 'react'
import './Song.css'
import axios from 'axios'
import { Button, Container, Modal, Form, Image } from 'react-bootstrap'
import Axios from '../../utils/Axios'
import logo from '../../images/Spotify_Logo_RGB_Black.png'


export class Song extends Component {
    state={
        songTitle: '',
        audioSrc: '',
        songArtist: '',
        songImage: '',
        favoriteSongs: [],
        isFave: false,
        songID: '',
        showModal: false,
        playlists: [],
        playlistsRecieved: false,
        favoritesRecieved: false,
        show: false,
        playlistIDSelected: '',
        spotLink: '',
        playlistInput: '',
        createPlaylistShow: false,
        username: ''

    }
    checkForFaveSong=(id)=>{
      let found = this.state.favoriteSongs.filter(elem=>elem.songID === id)
      return found.length > 0
    }

    handleModalShow=()=>{
      this.setState({
        show: true
      })
    }

    handleOnChange=(e)=>{
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    createPlaylist=async(e)=>{
      e.preventDefault()
      if(this.state.playlistInput !== ''){
        try {
          const newPlaylist = await Axios.post('http://localhost:3000/api/playlist/create-playlist', {
            username: this.props.user.username,
            playlistName: this.state.playlistInput
          })
          this.setState({
            playlists: [...this.state.playlists, newPlaylist.data.payload],
            createPlaylistShow: false
          })
          
        } catch (error) {
          console.log(error);
        }
      }
    }

    handleModalClose=()=>{
      this.setState({
        show: false
      })
    }

    addToFavorites= async ()=>{
      
      try {
        let newFave = await Axios.put(`http://localhost:3000/api/user/add-favorite-song/${this.state.username}`, {
          songID: this.state.songID,
          songArtist: this.state.songArtist,
          songTitle: this.state.songTitle,
          songImage: this.state.songImage,

        })
        console.log(newFave);
        this.setState({
          favoriteSongs: newFave.data.payload.favoriteSongs,
          isFave: !this.state.isFave
        })
      } catch (error) {
        console.log(error);
      }
    }

    getPlaylists=async()=>{
      try {
        const playlists = await Axios.get(`http://localhost:3000/api/playlist/get-user-playlists/${this.props.user.username}`)
        this.setState({
          playlists: [...playlists.data.payload],
          playlistsRecieved: true
        })
      } catch (error) {
        console.log(error);
      }
    }

    removeFromFavorites=async()=>{
      try {
        let goneFave = await Axios.put(`http://localhost:3000/api/user/remove-favorite-song/${this.props.user.username}`, {
          songID: this.state.songID
        })
        this.setState({
          isFave: !this.state.isFave,
          favoriteSongs: goneFave.data.payload.favoriteSongs
        })
        console.log(goneFave);
      } catch (error) {
        console.log(error);
      }
  }

  componentDidUpdate(prevProps, prevState){
    if(!this.props.user || (prevState.playlistsRecieved && prevState.playlistsRecieved === this.state.playlistsRecieved)){
      return
    }
    this.getPlaylists()
    this.getSongAndUser()
  }

  getSongAndUser = async ()=>{
    let token = localStorage.getItem('access_token')
    try {
      const searchParameters = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      const path = window.location.pathname.split('/')
      const id = path[path.length-1]
      const song = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, searchParameters)
      const user = await Axios.get(`http://localhost:3000/api/user/get-user-by-id/${this.props.user.id}`)
      console.log(song);
      console.log(user);
      console.log(this.state.songID);
      let fave = user.data.payload.favoriteSongs.filter(elem=>elem.songID == id)

      
      this.setState({
        songTitle: song.data.name,
        songArtist: song.data.artists[0].name,
        songImage: song.data.album.images[1].url,
        audioSrc: song.data.preview_url,
        favoriteSongs: user.data.payload.favoriteSongs,
        songID: id,
        isFave: fave.length > 0,
        favoritesRecieved: true,
        spotLink: song.data.external_urls.spotify,
        username: user.data.payload.username
      })
  } catch (error) {
      console.log(error);
  }
  }

  handlePlaylistSelection=(e)=>{
        this.setState({
          playlistIDSelected: e.target.ariaLabel
        })
        console.log(this.state);
  }

  handleModalSave= async ()=>{
    try {
      const updatedPlaylist = await Axios.put(`http://localhost:3000/api/playlist/add-song/${this.state.playlistIDSelected}`, {
         songID: this.state.songID,
         songTitle: this.state.songTitle,
         songArtist: this.state.songArtist,
         songImage: this.state.songImage
      })
      
    } catch (error) {
      console.log(error);
      
    }
    this.setState({
      show: false
    })
  }

  componentDidMount(){
        if(!this.props.user){
          return
        }
        this.getSongAndUser()
        this.getPlaylists()
  }
  render() {
    return (
      <div className='Song'>Song
        <Container className='text-center' style={{backgroundColor: 'black', color: 'white', marginLeft: '20vw', width: '80vw'}}>
            <img style={{width: 225, margin: 15}} src={this.state.songImage}/>
            <h3>{this.state.songTitle}</h3>
            <h5>{this.state.songArtist}</h5>
            <div>
              <Button variant='outline-light' style={{fontSize: 14, margin: 10}} onClick={this.handleModalShow}>Add to Playlist</Button>
              {this.state.isFave ? <Button variant='outline-light' style={{fontSize: 14, margin: 10}} onClick={this.removeFromFavorites}>Remove Fave</Button> : <Button variant='outline-light' style={{fontSize: 14, margin: 10}} onClick={this.addToFavorites} >Add to Faves</Button>}
            </div>
            <p>Preview song:</p>
            <audio controls='controls' src={this.state.audioSrc} />
            <br></br>
            <a  href={this.state.spotLink}><Button style={{margin: 20}} variant='light'>Click here to play on <img style={{height: 30}} src={logo}></img></Button></a>
            
        </Container>
        <Modal className='my-modal' onHide={this.handleModalClose} centered show={this.state.show}>
          <Modal.Header style={{color: 'black'}} closeButton><h4>Select a Playlist to add song to: </h4></Modal.Header>
          <Modal.Body>
            <Form>
            {this.state.playlists.map(item=>{
              return (
                <Form.Check
                key={item._id}
                onChange={this.handlePlaylistSelection}
                type='radio'
                label={item.playlistName}
                name='playlists'
                aria-label={item._id}
                 />
              )
            })}
            </Form>
            {this.state.createPlaylistShow ? <Form style={{marginTop: 7}}>
                <InputGroup >
                  <FormControl value={(this.state.playlistInput)} name='playlistInput' onChange={this.handleOnChange} style={{backgroundColor: 'black', color: 'white'}}></FormControl>
                  <Button size='sm' variant='light' onClick={this.createPlaylist}>Create</Button>
                </InputGroup>
              </Form> : <Button style={{marginTop: 7}} size='sm' variant='outline-dark' onClick={()=>this.setState({createPlaylistShow: true})}>Create PLaylist</Button>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='dark' onClick={this.handleModalSave}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default Song