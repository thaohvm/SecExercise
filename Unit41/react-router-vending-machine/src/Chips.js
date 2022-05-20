import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import chipsImg from "./Chips.png";

function Chips() {
    const [count, setCount] = useState([]);

    function handleClick() {
        const x = window.innerwidth * Math.random();
        const y = window.innerWidth * Math.random();
        setCount(c => [...c, { x, y }]);
    }

    const chips = count.map((count, i) => (
        <img
            key={i}
            src={chipsImg}
            className="chips"
            alt="bag of lay's chips"
            width={100}
        />
    ));
    return (
        <div class="Chips">
            <h3>BAGS EATEN: {count.length}</h3>
            <button onClick={handleClick}>NOM NOM NOM</button>
            <h3><Link to="/">GO BACK</Link></h3>
            {chips}
        </div>
    )
}

export default Chips;
