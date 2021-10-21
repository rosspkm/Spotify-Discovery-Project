import React from "react";
import Artist from './Artist.js'

function ArtistList({ artists, delArtist }) {
    return (
        artists.map(artist => {
            return <Artist key={artist.id} artist={artist} delArtist={delArtist} />
        })
    );
}

export default ArtistList;