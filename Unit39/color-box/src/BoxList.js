import React, { useState } from 'react';
import Box from './Box';
import NewBoxForm from './NewBoxForm';

const BoxList = () => {
    const [boxes, setBoxes] = useState([]);
    const add = boxObj => {
        setBoxes(boxes =>
            [...boxes, boxObj]
        );
    };
    const handleRemove = id => {
        setBoxes(boxes => boxes.filter(box => box.id !== id));
    };
    const boxComponents = boxes.map(box => (
        <Box
        key={box.id}
        id={box.id}
        width={box.width}
        height={box.height}
        backgroundColor={box.backgroundColor}
        handleRemove={handleRemove}
        />
    ))

    return (
        <div className="BoxList">
            <NewBoxForm createBox={add} />
            {boxComponents}
        </div>
    );
}

export default BoxList;
