import React from 'react';
import { Link } from 'react-router-dom';

function DogList({ dogs }) {
    return (
        <div className='DogList'>
            {dogs.map(dog => (
                <div key={dog.name}>
                    <img src={dog.src} alt={dog.name} />
                    <h3>{dog.name}
                    <Link to={`/dogs/${dog.name.toLowerCase()}`}>{dog.name}</Link>
                    </h3>
                </div>
            ))}
        </div>
    )
}

export default DogList;
