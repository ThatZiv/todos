import React, { useRef, useEffect } from 'react';

type ListPropType = {
    todos: string[],
    children?: any
}


const TodoStyle = { display: "inline", border: "2px solid gray", margin: 20 }

export default function List(props: ListPropType) {
    return (
        <div>
            <h2>{props.children}</h2>
            <ul>
                {props.todos.map((todo, index) => {
                    return <div style={TodoStyle}>
                        <li><b>#{index+1}</b> {todo} {/* <button style={{ fontSize: 20 }}>✅</button> */}</li>
                    </div>
                })}
            </ul>
        </div>
    )
} 