import React, { useState } from 'react';
import './Card.css';

const Card = ({ image }) => {
    const [{angle, xPos, yPos}] = useState({
        angle: Math.random() * 90 - 45,
        xPos: Math.random() * 40 - 20,
        yPos: Math.random() * 40 - 20
      });

      const transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
    return (
        <div className='Card'>
            <img src={ image } style={{transform}}/>
        </div>
    )
}
export default Card;
