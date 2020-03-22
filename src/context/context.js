import React, { createContext, useReducer } from "react";
import reducer from "../reducer/reducer"

export const StateContext = createContext();

const todosContext = {
    todos: [
        { id: 1, text: "Sample 1", complete: false },
        { id: 2, text: "Sample 2", complete: false },
        { id: 3, text: "Sample 3", complete: false },
    ]
}

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, todosContext);

    return (
		<StateContext.Provider value={{state, dispatch}}>
			{children}
		</StateContext.Provider>
	);
}


export default StateProvider;