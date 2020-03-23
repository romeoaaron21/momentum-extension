import React from 'react';

import TodoList from "./components/TodoList"
import StateProvider from "./context/context";
// import todosReducer from "./reducer/reducer"

function App() {
  return (
      <StateProvider>
        <TodoList />
      </StateProvider>
  );
}

export default App;
