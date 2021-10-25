import React from "react";
import Artist from './Artist.js'

function ArtistList({ artists, delArtist }) {
    return (
        artists ? artists.map(artist => {
            return <Artist key={artist} artist={artist} delArtist={delArtist} />
        }) : <div></div>
    );
}

export default ArtistList;