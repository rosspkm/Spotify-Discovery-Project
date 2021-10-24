import React from 'react';

export default function Artist({ artist, delArtist }) {
    return (
        <div>
            <label>
                {artist.id}
            </label>
            <button onClick={() => delArtist(artist.id)}>delete artist</button>
        </div>

    );
}