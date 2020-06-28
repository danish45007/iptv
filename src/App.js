import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import axios from 'axios'
import m3u8Parser from 'm3u8-file-parser'
import './App.css'

function App() {
  const [channels, setChannels] = useState([])
  useEffect(() => {
    const fetchChannels = async () => {
      let res = await axios.get('https://raw.githubusercontent.com/billacablewala/m3u8/master/README.md')
      let reader = new m3u8Parser()
      let urls = res.data.split('\n')
      urls.forEach((url) => {
        try {
          reader.read(url)
        } catch (error) {
          console.log('Error in reading url')
        }
      })
      setChannels(reader.getResult().segments)
      console.log(reader.getResult().segments)
    }
    try {
      fetchChannels()
    } catch (error) {
      console.log('Error in fetching channels')
    }
  }, [])
  return (
    <div className="app">
      {channels &&
        channels.map((channel) => {
          console.log(channel)
          return (
            <img
              style={{ height: '50px', width: '50px' }}
              src={channel.inf && channel.inf.tvgLogo}
              alt="channel-logo"
            />
          )
        })}
    </div>
  )
}

export default App
