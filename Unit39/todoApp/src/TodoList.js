import React, { useState } from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';

const TodoList = () => {
    const INIT_STATE = [
        { id: 1, todo: "Design a prototype"},
        { id: 2, todo: "Organize photo shoot"},
    ]
    const [todos, setTodos] = useState(INIT_STATE);
    const addTodo = newTodo => {
        setTodos(todos => [...todos, newTodo])
    };
    const remove = (id) => {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    }
    return (
        <div className='TodoList'>
            <h3>Add new task</h3>
            <NewTodoForm addTodo={ addTodo }/>
            <h3>List Current Tasks: </h3>
            {todos.map(({ id, todo }) => (
                <Todo id={id} todo={todo} handleRemove={() => remove(id)}/>
            ))}
        </div>
    )
}

export default TodoList;
