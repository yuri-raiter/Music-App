import React from 'react'
import LibrarySong from './LibrarySong'

const Library = ({ audioRef, songs, setSongs, currentSong, setCurrentSong, isPlaying, setIsPlaying, libraryStatus }) => {
    return (
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {
                    songs.map(song => <LibrarySong audioRef={audioRef} song={song} songs={songs} setSongs={setSongs} currentSong={currentSong} setCurrentSong={setCurrentSong} id={song.id} key={song.id} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>)
                }
            </div>
        </div>
    )
}

export default Library