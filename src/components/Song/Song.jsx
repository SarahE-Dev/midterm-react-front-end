import React, { Component } from 'react'
import './Song.css'
import axios from 'axios'
import { Button, Container, Modal } from 'react-bootstrap'
import Axios from '../../utils/Axios'

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
        favoritesRecieved: false

    }
    checkForFaveSong=(id)=>{
      let found = this.state.favoriteSongs.filter(elem=>elem.songID === id)
      return found.length > 0
    }

    addToFavorites= async (songID, songTitle, songArtist, songImage)=>{
      
      try {
        let newFave = await Axios.put(`http://localhost:3000/api/user/add-favorite-song/${this.state.username}`, {
          songID: songID,
          songArtist: songArtist,
          songTitle: songTitle,
          songImage: songImage,

        })
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
      let found = user.data.payload.favoriteSongs.filter(elem=>{
        return elem.songID == id
      })
      
      this.setState({
        songTitle: song.data.name,
        songArtist: song.data.artists[0].name,
        songImage: song.data.album.images[1].url,
        audioSrc: song.data.preview_url,
        favoriteSongs: user.data.payload.favoriteSongs,
        songID: id,
        isFave: found.length > 0,
        favoritesRecieved: true
      })
  } catch (error) {
      console.log(error);
  }
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
            <img src={this.state.songImage}/>
            <h1>{this.state.songTitle}</h1>
            <h3>{this.state.songArtist}</h3>
            <div>
              <Button>Add to Playlist</Button>
              {this.state.isFave ? <Button onClick={this.removeFromFavorites}>Remove Fave</Button> : <Button onClick={()=>this.addToFavorites({songID: this.state.songID, songTitle: this.state.songTitle, songArtist: this.state.songArtist, songImage: this.state.songImage})} >Add to Faves</Button>}
            </div>
            <audio controls='controls' src={this.state.audioSrc} />
        </Container>
      </div>
    )
  }
}

export default Song