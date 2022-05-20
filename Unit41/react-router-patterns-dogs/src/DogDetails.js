import React from 'react';
import { Link, Redirect } from "react-router-dom";

function DogDetails({ dog }) {
    if (!dog) return <Redirect to="/dogs" />
    return (
        <div class="DogDetails">
            <img src={dog.src} alt={dog.name} />
            <h2>{dog.name}</h2>
            <h3>{dog.age}</h3>
            <ul>
                {dog.facts.map((fact, i) => (
                    <li key={i}>{fact}</li>
                ))}
            </ul>
            <Link to="/dogs">Go Back</Link>
        </div>
    )
}

export default DogDetails;
