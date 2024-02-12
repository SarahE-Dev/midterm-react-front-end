import React, { Component } from 'react'
import './Song.css'
import axios from 'axios'
import { Button, Container } from 'react-bootstrap'
import Axios from '../../utils/Axios'

export class Song extends Component {
    state={
        songTitle: '',
        audioSrc: '',
        songArtist: '',
        songImage: '',
        favoriteSongs: [],
        isFave: false,
        songID: ''

    }
    checkForFaveSong=(id)=>{
      let found = this.state.favoriteSongs.filter(elem=>elem.songID === id)
      return found.length > 0
    }
    async componentDidMount(){
        try {
            const searchParameters = {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.props.access_token}`
                }
              }
            const path = window.location.pathname.split('/')
            const id = path[path.length-1]
            const song = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, searchParameters)
            const user = await Axios.get(`http://localhost:3000/api/user/get-user-by-id/${this.props.user.id}`)
            console.log(user);
            let found = user.data.payload.favoriteSongs.filter(elem=>{
              return elem.songID === id
            })
            
            this.setState({
              songTitle: song.data.name,
              songArtist: song.data.artists[0].name,
              songImage: song.data.album.images[1].url,
              audioSrc: song.data.preview_url,
              favoriteSongs: user.data.payload.favoriteSongs,
              songID: id,
              isFave: found.length > 0
            })
            console.log(song.data);
            
            
        } catch (error) {
            console.log(error);
        }
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
              {this.state.isFave ? <Button>Remove Fave</Button> : <Button>Add to Faves</Button>}
            </div>
            <audio controls='controls' src={this.state.audioSrc} />
        </Container>
      </div>
    )
  }
}

export default Song