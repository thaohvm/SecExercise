import React from 'react';

const Todo = ({ id, todo, handleRemove }) => {
    const remove = () => handleRemove(id);
    return (
        <div>
            <ul>
                <li>{todo}</li>
                <button onClick={remove}>X</button>
            </ul>
        </div>
    )
}

export default Todo;
