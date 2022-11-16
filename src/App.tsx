import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import List from './components/List';

function App() {
  const todoRef = useRef<HTMLInputElement | null>(null); // binding to main input 
  const deleteRef = useRef<HTMLInputElement | null>(null); // binding to delete input

  const result: string[] = [];
  const [todos, setTodos] = useState(result)

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
  const handleRemoveTodo = () => {
    if (deleteRef.current) {
      const index = parseInt(deleteRef.current.value) - 1
      if (todos?.[index]) { // check if that delete value the user gives is in the range of the array
        removeTodo(index) // -1 because indicies start at 0 and the user is given from the start of 1
      } else {
        alert("That message doesn't exist!")
      }
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
      <header className="App-header">
        <List todos={todos}>My TODO(s)</List>
        <div>
          <input className='paddedInputs' placeholder='add what TODO' type="text" ref={todoRef} />
          <button className='paddedInputs' onClick={handleAddTodo}>Add</button>
        </div>
        <div>
          <input className='paddedInputs' placeholder=' # TODO to delete ' type="number" ref={deleteRef} />
          <button className='paddedInputs' onClick={handleRemoveTodo}>Remove</button>
        </div>
      </header>
    </div>
  );
}

export default App;
