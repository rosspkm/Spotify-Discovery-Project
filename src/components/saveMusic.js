// import './App.css';
import React, { useState, useEffect } from 'react';
import ArtistList from './lib/ArtistList.js';
import axios from 'axios';

function Save_Music({ artists, handleArgs, handleErr }) {
    const [artistlst, setArtists] = useState(artists || []);
    const [artist, setArtist] = useState('');

    const LOCAL_STORAGE_KEY = ':)'

    useEffect(() => {
        const storedArtists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedArtists) setArtists(storedArtists);
    }, [])

    useEffect(() => {
        setArtists(artists);
    }, [artists])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(artistlst));
    }, [artistlst]);


    function handleAddArtist() {
        setArtists([...artists, artist]);
    }

    function delArtist(id) {
        setArtists(artistlst.filter((artist) => artist !== id));
    }

    async function sendData(body) {
        try {
            const { data } = await axios.post("/save", { artists: body });
            handleArgs(data);
            return data;
        }
        catch (err) {
            console.log(err)
            handleErr(err.messsage);
        }
    }

    return (

        < div >
            <input type="text" value={artist} onInput={(e) => setArtist(e.target.value)} />
            <button onClick={handleAddArtist}>Add Artist</button>
            <ArtistList artists={artistlst} delArtist={delArtist} />
            <br />
            <button onClick={() => { sendData(artistlst) }}>Submit</button>
        </div >
    );
}


export default Save_Music;