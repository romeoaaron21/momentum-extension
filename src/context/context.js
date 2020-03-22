import React, { createContext } from "react";


const TodosContext = createContext({
    todos: [
        { id:1, text: "Sample 1", complete: false },
        { id:2, text: "Sample 2", complete: false },
        { id:3, text: "Sample 3", complete: false },
    ]
})


export default TodosContext;