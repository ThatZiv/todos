import React from "react";

export type TodosType = Array<string>;
export const empty: TodosType = [];
export const TodosContext = React.createContext({
    todos: empty, // our todos array (that will be linked to the todos state)
    removeTodo: (index: number): void => { } // our dispatch function that we can call in nested components
});