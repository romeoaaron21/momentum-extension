import React, { createContext, useReducer, useEffect } from "react";
import reducer from "../reducer/taskGoalReducer"

export const TaskGoalContext = createContext();

let taskGoal = {
    // newGoal: "",
    selectedGoal: {},
    todoText: "",
}

const TaskGoalProvider = ({ children }) => {
    const [state1, dispatch1] = useReducer(reducer, taskGoal);


    return (
		<TaskGoalContext.Provider value={{state1, dispatch1}}>
			{children}
		</TaskGoalContext.Provider>
	);
}


export default TaskGoalProvider;