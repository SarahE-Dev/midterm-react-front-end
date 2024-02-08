import React, { Component } from 'react'
import './Album.css'
import axios from 'axios'
import { Container, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export class Album extends Component {
    state= {
        albumTitle: '',
        albumImage: '',
        albumTracks: [],
        albumYear: '',
        albumArtist: ''
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
            const album = await axios.get(`https://api.spotify.com/v1/albums/${id}`, searchParameters)
            console.log(album);
            this.setState({albumArtist: album.data.artists[0].name,
                albumTitle: album.data.name,
                albumTracks: album.data.tracks.items
            })
        } catch (error) {
            console.log(error);
        }
    }
  render() {
    return (
      <div class='Album'>
        <div className="albumMain">
            <Container>
                <div>{this.state.albumTitle}</div>
                <div>{this.state.albumArtist}</div>
                <ul>
                    {this.state.albumTracks.map((track)=>{
                        return (
                            <li key={track.id} >{track.name}</li>
                        )
                    })}
                </ul>
            
            </Container>
        </div>
      </div>
    )
  }
}

export default Album