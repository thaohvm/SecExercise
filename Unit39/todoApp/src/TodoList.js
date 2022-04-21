import React, { useState } from 'react';
import { v4 as uuid } from "uuid";
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = () => {
        let newTodo = {...todos, id: uuid() };
        setTodos((todos) => [...todos, newTodo]);
    };

    const deleteTodo = (id) => {
        setTodos((todos) => todos.filter((todo) => todo.id !== id));
    };

    const todoComponents = todos.map(({ id, task }) => (
        <Todo
        key={id}
        id={id}
        task={task}
        deleteTodo={deleteTodo}
        />
    ));

    return (
        <div className='TodoList'>
            <NewTodoForm addTodo={ addTodo }/>
            <ul>{ todoComponents }</ul>
        </div>
    )
}

export default TodoList;
