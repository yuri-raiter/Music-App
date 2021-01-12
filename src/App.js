import React, { useState, useRef, useEffect } from 'react'
// Styles
import './styles/App.scss'
// Components
import Player from './components/Player'
import Song from './components/Song'
import Library from './components/Library'
import Nav from './components/Nav'
// Import Util
import songsList from './data'

function App() {
  // Ref
  const audioRef = useRef(null)
  // State
  const [songs, setSongs] = useState(songsList())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  })
  const [libraryStatus, setLibraryStatus] = useState(false)
  const notInitialRender = useRef(false)
  // Use Effect
  useEffect(() => {
    if (notInitialRender.current)
      playHandler()
    else
      notInitialRender.current = true
  }, [currentSong])
  // Handlers
  const playHandler = async () => {
    await audioRef.current.load()
    audioRef.current.play()
    setIsPlaying(true)
  }
  const currentTimeHandler = e => {
    const current = e.target.currentTime
    setSongInfo({...songInfo, currentTime: current})
  }
  const songDurationHandler = e => {
      const duration = e.target.duration
      setSongInfo({...songInfo, duration})
  }
  const songEndHandler = () => {
    let currentIndex = songs.findIndex(s => s.id === currentSong.id)
    setCurrentSong(songs[(currentIndex + 1) % songs.length])
  }
  return (
    <div className={`App ${libraryStatus ? 'slide-app' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player audioRef={audioRef} songs={songs} setSongs={setSongs} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} songInfo={songInfo} setSongInfo={setSongInfo}/>
      <Library audioRef={audioRef} songs={songs} setSongs={setSongs} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} libraryStatus={libraryStatus}/>
      <audio ref={audioRef} onTimeUpdate={currentTimeHandler} onLoadedMetadata={songDurationHandler} onEnded={songEndHandler} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
