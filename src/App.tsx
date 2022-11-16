import React, { useEffect, useRef, useState, createContext } from 'react';
import './App.css';

import List from './components/List'; // this is a component
import { TodosContext, empty } from './contexts/Todos';

function App() {
  const todoRef = useRef<HTMLInputElement | null>(null); // binding to main input 
  const [todos, setTodos] = useState(empty)

  useEffect(() => { // lifecycle mgmt
    setTodos(getStorage())
  }, [] /*  empty array so that this runs when the comp is first initialized */)

  const addTodo = (todo: string): void => {
    if (todos.includes(todo)) {
      return alert("This TODO already exists!")
    }
    const newTodos = [...todos, todo]
    setTodos(newTodos)
    setStorage(newTodos)
  };

  const removeTodo = (index: number): void => {
    todos.splice(index, 1) // remove the element "index" of i
    const newTodos = [...todos]
    setTodos(newTodos)
    setStorage(newTodos)
  }

  const handleAddTodo = () => {
    if (todoRef.current) {
      addTodo(todoRef.current?.value)
    }
  }

  const setStorage = (val: Object): void => {
    localStorage.setItem("todoData", JSON.stringify(val))
  }

  const getStorage = (): Array<string> => {
    const currentTodos = localStorage.getItem("todoData")
    return currentTodos ? JSON.parse(currentTodos) : []
  }

  return (
    <div className="App">
      <TodosContext.Provider value={{ todos, removeTodo }}> {/* Pass in the "todos" STATE in the provider and also the "removeTodo" DISPATCH so that child elements can access those*/}
        <header className="App-header">
          <List todos={todos}>My TODO(s)</List>
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
