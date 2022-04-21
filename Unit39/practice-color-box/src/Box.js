import React from 'react';

const Box = ({ id, backgroundColor, width, height }) => {
    return (
        <div
        style={{
          backgroundColor: {backgroundColor},
          width: `${width}em`,
          height: `${height}em`
        }}
      />
    )
}

export default Box;
