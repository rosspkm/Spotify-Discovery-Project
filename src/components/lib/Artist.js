import React from 'react';

export default function Artist({ artist, delArtist }) {
    return (
        <div>
            <label>
                {artist}
            </label>
            <button onClick={() => delArtist(artist)}>delete artist</button>
        </div>

    );
}