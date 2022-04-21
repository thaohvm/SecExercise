import React, { useState } from 'react';
import uuid from "uuid/v4";

const NewTodoForm = ({ addTodo }) => {
    const INIT_STATE = [
        { todo: ""}
    ]
    const[formTodo, setFormTodo] = useState(INIT_STATE);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormTodo(formTodo => ({
            ...formTodo,
            [name] : value
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({ ...formTodo, id: uuid})
        setFormTodo(INIT_STATE);
    }
    return (
        <div className='NewFormTodo'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='todo'>Enter new task: </label>
                <input
                type="text"
                name="todo"
                value={formTodo.todo}
                onChange={handleChange}
                />
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default NewTodoForm;
