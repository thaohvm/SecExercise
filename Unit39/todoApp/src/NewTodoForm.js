import React, { useState } from 'react';
import uuid from "uuid/v1";

const NewTodoForm = ({ addTodo }) => {
    const INIT_STATE = "";
    const [task, setTask] = useState(INIT_STATE);

    const handleChange = (e) => {
        setTask(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({ task, id: uuid() });
        setTask(INIT_STATE);
    }
    return (
        <div className='NewTodoForm'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='task'>Task: </label>
                <input
                type="text"
                name="task"
                id="task"
                value={task}
                onChange={handleChange}
                />

                <button>Add new task</button>
            </form>
        </div>
    )
}

export default NewTodoForm;
