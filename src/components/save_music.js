import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import ArtistList from './lib/ArtistList.js';
import uuidv4 from 'uuid/v4';

function Save_Music(artists) {
    const [artists, setArtists] = useState(artists ? artists.length > 0 : []);
    const artistNameRef = useRef();
    const LOCAL_STORAGE_KEY = ':)'

    useEffect(() => {
        const storedArtists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedArtists) setArtists(storedArtists);
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(artists));
    }, [artists]);


    function handleAddArtist(e) {
        const name = artistNameRef.current.value;
        if (name === '') return;
        setArtists(prevArtists => {
            return [...prevArtists, { id: uuidv4(), name: name }];
        });
        artistNameRef.current.value = null;
    }

    function delArtist(id) {
        setArtists(artists.filter((artist) => artist.id !== id));
    }

    return (
        <div>
            <input type="text" ref={artistNameRef} />
            <button onClick={handleAddArtist}> Add Artist </button>
            <ArtistList artists={artists} delArtist={delArtist} />
            <div> number of artists selected </div>
        </div>
    );
}


export default Save_Music;