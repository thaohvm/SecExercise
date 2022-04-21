import React, { useState } from 'react';
import NewBoxForm from './NewBoxForm';
import Box from './Box';

const BoxList = () => {
    const INIT_STATE = [
        { id: 1, width: 5, height: 5, backgroundColor: "red" },
        { id: 2, width: 8, height: 8, backgroundColor: "blue" }
    ]
    const [boxes, setBoxes] = useState(INIT_STATE);
    // const addBox = newBox => {
    //     setBoxes(boxes => [...boxes, newBox])
    // }
    return (
        <div className='BoxList'>
            <h3>Boxes List</h3>
            <div>
                {/* <NewBoxForm addBox={addBox}/> */}
                {boxes.map(({ id, width, height, backgroundColor }) => (
                    <Box
                        id={id}
                        width={width}
                        height={height}
                        backgroundColor={backgroundColor}
                    />
                ))}
            </div>
        </div>
    )
}

export default BoxList;
