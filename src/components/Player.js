import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const Player = ({ audioRef, songs, setSongs, isPlaying, setIsPlaying, currentSong, setCurrentSong, songInfo, setSongInfo }) => {
    // Event Handlers
    const playButtonHandler = () => {
        if (audioRef.current.paused && !isPlaying) {
            audioRef.current.play()
        }
        else {
            audioRef.current.pause()
        }

        setIsPlaying(!isPlaying)
    }
    const getTime = time => {
        return (
            Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
        )
    }
    const dragHandler = e => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime: e.target.value})
    }
    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex(s => s.id === currentSong.id)
        if (direction === 'skip-back') {
            if (currentIndex === 0) setCurrentSong(songs[songs.length - 1])
            else setCurrentSong(songs[(currentIndex - 1) % songs.length])
        }
        if (direction === 'skip-forward') {
            setCurrentSong(songs[(currentIndex + 1) % songs.length])
        }
    }
    // Percentage
    let songPercentage = (songInfo.currentTime / songInfo.duration) * 100
    // Styles
    let animateTrack = {
        transform: `translateX(${songPercentage}%)`
    }
    let trackBackground = {
        background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`
    }
    return (
        <div className='player'>
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div className="track" style={trackBackground}>
                    <input min={0} max={songInfo.duration} value={songInfo.currentTime} onChange={dragHandler} type="range"/>
                    <div className="animate-track" style={animateTrack}></div>
                </div>
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className='skip-back' size='2x' icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playButtonHandler} className='play' size='2x' icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className='skip-forward' size='2x' icon={faAngleRight}/>
            </div>
        </div>
    )
}

export default Player