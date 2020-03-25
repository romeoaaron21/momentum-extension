import { v4 as uuidv4 } from 'uuid';
export default function reducer(state, action) {
    let currentDate = new Date();
    // currentDate.setDate(currentDate.getDate()-1)
    currentDate.setUTCHours(0, 0, 0, 0);

    switch (action.type) {
        case "initialFetch_todo_list":
            return {
                ...action.data, loader: false
            }
        case "done":
            const toggledTodos = state.todos.map(t =>
                t.id === action.data.id ?
                    { ...action.data, complete: !action.data.complete, time: +currentDate } : t
            )
            return {
                ...state, todos: toggledTodos
            }
        case "delete":
            let newTodo = state.todos.filter(todo => todo.id !== action.data.id);
            return {
                ...state, todos: newTodo
            }
        // case "add_todo":
        //     return {
        //         ...state, todos: [...state.todos, { id: uuidv4(), text: action.title.trim(), complete: false, time: +currentDate }]
        //     }
        case "edit_todo":
            let editted_todo = state.todos.findIndex(todo => todo.id === action.data.id);
            state.todos[editted_todo].text = action.data.title.trim()
            return {
                ...state, todos: state.todos
            }


        case "add_goal":
            return {
                ...state, goals: [...state.goals, {id: uuidv4(), title: action.title.trim()}]
            }

        case "add_todoGoal":
            let selectedGoal = state.goals.filter(goal => goal.id === action.selectedGoal.id);
            if(selectedGoal.length){
                return {
                    ...state, todos: [...state.todos, {id: uuidv4(), text:action.todoText.trim(), complete: false, time: +currentDate, goal_id:selectedGoal[0].id}]
                }
            }
            else{
                return {
                    ...state, 
                    todos: [...state.todos, {id: uuidv4(), text:action.todoText.trim(), complete: false, time: +currentDate, goal_id : action.selectedGoal.id}],
                    goals: [...state.goals, action.selectedGoal]
                }
            }

        default:
            return state;
    }
}