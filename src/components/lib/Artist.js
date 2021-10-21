import React from 'react';

export default function Artist({ artist, delArtist }) {
    function handleClick() {
        delArtist(artist.id)
    }

    return (
        <div>
            <label>
                {artist.name}
            </label>
            <button onClick={handleClick}> delete artist </button>
        </div>

    );
}