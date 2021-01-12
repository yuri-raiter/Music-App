import React from 'react'

const LibrarySong = ({ audioRef, song, songs, setSongs, currentSong, setCurrentSong, id, isPlaying, setIsPlaying }) => {
    // Handlers
    const selectSongHandler = async () => {
        setCurrentSong(song)
    }
    return (
        <div onClick={selectSongHandler} className={`library-song ${song.id === currentSong.id ? 'selected' : ''}`}>
            <img src={song.cover} alt=''></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong