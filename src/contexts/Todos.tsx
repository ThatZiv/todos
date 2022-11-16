import React from "react";
export const empty: string[] = [];
export const TodosContext = React.createContext({
    todos: empty,
    removeTodo: (index: number): void => { }
});