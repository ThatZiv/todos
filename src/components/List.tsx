import React, { useRef, useEffect, useContext } from 'react';
import { TodosContext } from '../contexts/Todos';

type ListPropType = {
    todos: string[],
    children?: any
}


const TodoStyle = { display: "inline", borderBottom: "2px solid gray", margin: 10, padding: 5 }

export default function List(props: ListPropType) {
    const { todos, removeTodo } = useContext(TodosContext)
    const handleRemove = (index: number) => {
        removeTodo(index)
    }
    return (
        <div>
            <h2>{props.children}</h2>
            <ul>
                {todos.map((todo, index) => {
                    return <div key={index} style={TodoStyle}>
                        <li>{todo} <button onClick={() => { handleRemove(index) }} style={{ fontSize: 20 }}>✅</button></li>
                    </div>
                })}
            </ul>
        </div>
    )
} 