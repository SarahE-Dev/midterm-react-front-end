import React, { Component } from 'react'
import './Song.css'
import axios from 'axios'
import { Container } from 'react-bootstrap'

export class Song extends Component {
    state={
        songTitle: '',
        audioSrc: '',
        songArtist: '',
        songImage: ''

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
            this.setState({
              songTitle: song.data.name,
              songArtist: song.data.artists[0].name,
              songImage: song.data.album.images[1].url
            })
            console.log(song.data);
            
            
        } catch (error) {
            console.log(error);
        }
    }
  render() {
    return (
      <div className='Song'>Song
        <Container className='text-center' style={{backgroundColor: 'black', color: 'white', marginLeft: '20vw'}}>
            <img src={this.state.songImage}/>
            <h1>{this.state.songTitle}</h1>
            <h3>{this.state.songArtist}</h3>
            
        </Container>
      </div>
    )
  }
}

export default Song