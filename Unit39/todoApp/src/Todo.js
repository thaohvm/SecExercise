import React from 'react';

const Todo = ({ id, task, deleteTodo }) => {
    const handleDelete = () => deleteTodo(id)
    return (
        <div>
            <li>{task}</li>
            <button onClick={handleDelete}>X</button>
        </div>
    )
}

export default Todo;
