import { v4 as uuidv4 } from 'uuid';
export default function taskGoalReducer(state, action) {
    switch (action.type) {
        case "set_goalTitle":
            let existingGoal = action.allState.goals.filter(goal => goal.title === action.title)
            if(existingGoal.length){
                return {
                    ...state, selectedGoal : existingGoal[0]
                }
            }
            else{
                return {
                    ...state, selectedGoal: {id:uuidv4(), title:action.title}
                }
            }
        case "set_todoText":
            return {
                ...state, todoText:action.title
            }
        case "reset_todoGoal":
            return {
                selectedGoal: {}, todoText: "",
            }
        default:
            return state;
    }
}