import React from "react";

const Box = ({ id, width, height, backgroundColor, handleRemove }) => {
    const remove = () => handleRemove(id)
    return (
        <div>
            <div
                style={{
                    height: `${height}em`,
                    width: `${width}em`,
                    backgroundColor
                }}
            />
            <button onClick={remove}>Remove</button>
        </div>
    );
}

export default Box;
