import React, { useContext, useState, useEffect } from 'react'
import { StateContext } from "../context/context"

import { Grid, Paper, Button, Typography, TextField, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        }
    }
});

export default function TodoList() {
    const classes = useStyles();
    const { state, dispatch } = useContext(StateContext);
    const [newTodo, setNewTodo] = useState("");
    const [editID, setEditID] = useState();
    const [defaultTodoTitle, setDefaultTodoTitle] = useState("");


    window.addEventListener('beforeunload', () => {
        localStorage.setItem("todo_list", JSON.stringify(state));
    });


    const addNewTodoList = (e) => {
        if (e.key === "Enter") {
            dispatch({ type: "add_todo", title: e.target.value })
            setNewTodo("")
        }
        else {
            setNewTodo(e.target.value)
        }
    }

    const editTodoListTitle = (e) => {
        if (e.key === "Enter") {
            dispatch({ type: "edit_todo", data: { title: e.target.value, id: editID } })
            alert(e.target.value)
        }
        else {
            setDefaultTodoTitle(defaultTodoTitle ? "" : e.target.value)
        }
    }

    const editTextFieldBlur = (e) => {
        setEditID();
        dispatch({ type: "edit_todo", data: { title: e.target.value, id: editID } })

    }

    //GAWIN BUKAS!!! IPAGPATULOY ANG EDIT. ILAGAY SA CONTEXT AT REDUCER AND INITIAL STATE NG PAG EDIT NG TODOLIST
    return (
        <div>
            {state.loader ? (
                <Typography>Loading</Typography>
            )
                :
                <>
                    <Grid container spacing={1}>

                        <Typography variant="h2" style={{ margin: "auto" }}>
                            {state.todos.length ? `${state.todos.length} Todos` : "Nothing to show!"}
                        </Typography>
                        {state.todos.map(todo => (
                            <Grid key={todo.id} item xs={12} style={{ textAlign: "center" }}>
                                <Paper style={{ padding: 20, position: "relative", background: "#ec6611", border: "3px dashed black", color: "white", fontWeight: 700 }}>
                                    <div>
                                        <Checkbox
                                            checked={todo.complete}
                                            onChange={() => dispatch({ type: "done", data: todo })}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                        <TextField onBlur={editTextFieldBlur} defaultValue={todo.text} style={todo.complete ? { textDecoration: "line-through", textDecorationColor: "black" } : null} type="text"
                                            disabled={editID === todo.id ? false : true} InputProps={editID === todo.id ? null : { classes }} onKeyDown={editTodoListTitle} onChange={editTodoListTitle} />
                                    </div>
                                    <div style={{ position: "absolute", top: "25px", right: 15 }}>

                                        <Button style={{ marginRight: 20 }} onClick={() => { setEditID(!editID ? todo.id : null); setDefaultTodoTitle(todo.title ? "" : todo.title) }} variant="contained">Edit</Button>
                                        <Button onClick={() => dispatch({ type: "delete", data: todo })} variant="contained">Delete</Button>
                                    </div>
                                </Paper>
                            </Grid>
                        ))}


                    </Grid>

                    <TextField style={{ margin: "20px" }} value={newTodo} onKeyDown={addNewTodoList} onChange={addNewTodoList} />
                </>

            }

        </div>
    )
}
