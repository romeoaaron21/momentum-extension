import React, { useContext, useState } from 'react'
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

    const addNewTodoList = (e) => {
        if(e.key === "Enter"){
            dispatch({ type:"add_todo", title:e.target.value})
            setNewTodo("")
        }
        else{
            setNewTodo(e.target.value)
        }
    }

//GAWIN BUKAS!!! IPAGPATULOY ANG EDIT. ILAGAY SA CONTEXT AT REDUCER AND INITIAL STATE NG PAG EDIT NG TODOLIST
    return (
        <div>
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
                                {/* <span style={todo.complete ? { textDecoration: "line-through", textDecorationColor: "black" } : null}>{todo.text}</span> */}
                                <TextField onBlur={()=>setEditID()} defaultValue={todo.text} style={todo.complete ? { textDecoration: "line-through", textDecorationColor: "black" } : null} type="text" 
                                disabled={editID===todo.id?false:true} InputProps={editID===todo.id?null:{ classes }}/>
                            </div>
                            <div style={{ position: "absolute", top: "25px", right: 15 }}>

                                {/* {todo.complete ?
                                    null
                                    :
                                    <Button onClick={() => dispatch({ type: "done", data: todo })} style={{ marginRight: 20 }} variant="contained">Done</Button>
                                } */}

                                <Button style={{ marginRight: 20 }} onClick={()=>editID?setEditID():setEditID(todo.id)} variant="contained">Edit</Button>
                                <Button onClick={() => dispatch({ type: "delete", data: todo })} variant="contained">Delete</Button>
                            </div>
                        </Paper>
                    </Grid>
                ))}

            </Grid>

            <TextField value={newTodo} onKeyDown={addNewTodoList} onChange={addNewTodoList} fullwidth/>

        </div>
    )
}
