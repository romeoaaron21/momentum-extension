import React, { createContext, useContext, useReducer } from 'react';
import ReactDOM from "react-dom"

import TodoList from "./components/TodoList"
import TodosContext from "./context/context";
import todosReducer from "./reducer/reducer"

function App() {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, initialState)

  return (
      <TodosContext.Provider value={{ state, dispatch }}>
        <TodoList />
      </TodosContext.Provider>
  );
}

export default App;
