import React, { useContext } from 'react';
import { TodosContext } from '../contexts/Todos';

type ListPropType = {
    children?: string
}

const TodoStyle = { 
    display: "inline", // display elements in one line
    borderBottom: "2px solid gray",  // add an underline border for each element
    margin: 10, // add spacing between each elements
    padding: 5  // add internal spacing for each element
}
export default function List(props: ListPropType) {
    const { todos, removeTodo } = useContext(TodosContext); // take the values provider's context so that we can interact with the parent's state 
    return (
        <div>
            <h2>{props.children}</h2>
            <ul>
                {todos.map((todo, index) => {
                    return <div key={index} style={TodoStyle}>
                        <li>{todo} <button onClick={() => { removeTodo(index) }} style={{ fontSize: 20 }}>✅</button></li>
                        {/* bind the removeTodo integer when the respective button is pushed*/}
                    </div>
                })}
            </ul>
        </div>
    )
} 