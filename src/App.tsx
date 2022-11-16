import React, { useEffect, useRef, useState } from 'react';
import './App.css';

import List from './components/List'; // this is a component
import { TodosContext, empty, TodosType } from './contexts/Todos';

function App() {
  const todoRef = useRef<HTMLInputElement | null>(null); // binding to main input 
  const [todos, setTodos] = useState(empty) // initialize todos main data state

  useEffect(() => { // lifecycle mgmt
    setTodos(getStorage()) // render the todos from local storage on load
  }, [] /*  empty array so that this runs when the comp is first initialized */)

  const addTodo = (todo: string): void => {
    if (todos.includes(todo)) { // check if the current todo is in the todos array
      return alert("This TODO already exists!")
    }
    const newTodos = [...todos, todo]
    setTodos(newTodos) // update the state
    setStorage(newTodos) // update in local storage
  };

  const removeTodo = (index: number): void => { // this function is bonded with the ctx provider so that sub components can removeTodos (like in List.tsx)
    todos.splice(index, 1) // remove the element "index" of i
    const newTodos = [...todos] // array duplication needed because the state accessor is not mutable (it's mutated through the set state func)
    setTodos(newTodos) // update the state
    setStorage(newTodos) // update in local storage
  }

  const handleAddTodo = () => {
    if (todoRef.current) {
      addTodo(todoRef.current?.value) // add the input field's value to the todos arr
      todoRef.current.value = "" // reset input field 
    }
  }

  const setStorage = (val: TodosType): void => { // sets current state in local storage
    localStorage.setItem("todoData", JSON.stringify(val))
  }

  const getStorage = (): TodosType => { // gets the current local storage state
    const currentTodos = localStorage.getItem("todoData")
    return currentTodos ? JSON.parse(currentTodos) : []
  }

  return (
    <div className="App">
      <TodosContext.Provider value={{ todos, removeTodo }}> {/* Pass in the "todos" STATE in the provider and also the "removeTodo" DISPATCH so that child elements can access those*/}
        <header className="App-header">
          <List>My TODO(s)</List>
          <div>
            <input className='paddedInputs' placeholder='add what TODO' type="text" ref={todoRef} />
            <button className='paddedInputs' onClick={handleAddTodo}>Add</button>
          </div>
        </header>
      </TodosContext.Provider>
    </div>
  );
}

export default App;
