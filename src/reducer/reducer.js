export default function reducer(state, action) {
    switch (action.type) {
        case "done":
            const toggledTodos = state.todos.map(t =>
                t.id === action.data.id ?
                    { ...action.data, complete: !action.data.complete } : t
            )
            return {
                ...state, todos: toggledTodos
            }
        case "delete":
            let newTodo = state.todos.filter(todo => todo.id !== action.data.id);
            return{
                ...state, todos: newTodo
            }
        case "add_todo":
            return{
                ...state, todos: [...state.todos, { id:state.todos[state.todos.length-1].id+1, text: action.title, complete: false }]
            }
        default:
            return state;
    }
}