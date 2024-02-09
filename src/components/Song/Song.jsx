import React, { Component } from 'react'
import './Song.css'
import axios from 'axios'

export class Song extends Component {
    state={
        songTitle: '',
        audioSrc: '',

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
            console.log(song.data.preview_url);
            this.setState({
                audioSrc: song.data.preview_url
            })
            
        } catch (error) {
            console.log(error);
        }
    }
  render() {
    return (
      <div className='Song'>Song
      
      </div>
    )
  }
}

export default Song