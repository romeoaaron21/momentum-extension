import React, { createContext, useReducer, useEffect } from "react";
import reducer from "../reducer/reducer"

export const StateContext = createContext();

let initialTodosContext = {
    loader: true,
    todos:[],
    goals:[],
}

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialTodosContext);

    useEffect(() => {
        initialTodosContext = localStorage.getItem("todo_list") ? JSON.parse(localStorage.getItem("todo_list")) : initialTodosContext
        setTimeout(() => {
            dispatch({ type: "initialFetch_todo_list", data: initialTodosContext })
        },2000)
    }, [])

    return (
		<StateContext.Provider value={{state, dispatch}}>
			{children}
		</StateContext.Provider>
	);
}


export default StateProvider;