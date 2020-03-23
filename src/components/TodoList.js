import React, { useContext, useState } from 'react'
import { StateContext } from "../context/context"

import { Grid, Paper, Button, Typography, TextField, Checkbox, AppBar, Tabs, Tab, Box, List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import '../App.css';

const themeColor = createMuiTheme({
    palette: {
      primary: {
        main: "#FFFFFF"
      },
      secondary: {
        main: blueGrey[500]
      }
    }
  });

const useStyles = makeStyles(theme => ({
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        }
    },
    todoTextColor: {
        color: "white"
    },
    cssLabel: {
        color : 'white'
      },
    
      cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
          borderColor: `${theme.palette.primary.main} !important`,
        },
        color:"white"
      },
    
      cssFocused: {},
    
      notchedOutline: {
        borderWidth: '1px',
        borderColor: 'white !important'
      },
}));

export default function TodoList() {
    const classes = useStyles();
    const { state, dispatch } = useContext(StateContext);
    const [newTodo, setNewTodo] = useState("");
    const [editID, setEditID] = useState();
    const [defaultTodoTitle, setDefaultTodoTitle] = useState("");


    // START OF APPBAR
    const [value, setValue] = React.useState(2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // END OF APPBAR


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

    const addNewTodoList1 = (e) => {
        setNewTodo(e.target.value)
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
        <ThemeProvider theme={themeColor}>
        <div>
            <header className="App-header">
                {/* <header> */}
                {state.loader ? (
                    <Typography>Loading</Typography>
                )
                    :
                    <>
                        {/* <Grid container spacing={1}>

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

                    <TextField style={{ margin: "20px" }} value={newTodo} onKeyDown={addNewTodoList} onChange={addNewTodoList} /> */}


                        <div>
                            <div style={{ position: "fixed", bottom: 0, right: 0 }}>
                                <Paper style={{ height: 600, width: 400, margin: "0 10px 0 0", backgroundColor: "#ffffff21" }} variant="outlined">

                                    {/* START OF APPBAR */}
                                    <AppBar position="static" style={{ background: "#3f51b5" }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
                                            <Tab style={{ width: "50%" }} value={1} label="Done" />
                                            <Tab style={{ width: "50%" }} value={2} label="Tasks" />
                                        </Tabs>
                                    </AppBar>

                                    {/* <TabPanel value={value} index={2}> */}

                                    {/* </TabPanel> */}

                                    {/* <TabPanel value={value} index={1}> */}
                                    {value === 1 ? (
                                        <Grid container>
                                            <Paper style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#00000061", color: "white" }}>
                                                Item One
                                            </Paper>

                                        </Grid>

                                    ) : value === 2 ?
                                            <Grid container>
                                                <Paper elevation={0} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#00000061", padding: "5px 10px", color: "white" }}>
                                                    <Typography variant="h6" style={{ textAlign: "center" }}>
                                                        {state.todos.length ? `${state.todos.length} Todo List` : "Nothing to show!"}
                                                    </Typography>

                                                    <Grid style={{ overflow: "auto", width: "100%", height: "440px", padding: 0 }} component="nav" >
                                                        {state.todos.map(todo => (
                                                            <Grid key={todo.id} item xs={12}>
                                                                <Paper style={{ background: "#fff0", fontWeight: 700, color: "white" }}>
                                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                                        <Checkbox
                                                                            checked={todo.complete}
                                                                            onChange={() => dispatch({ type: "done", data: todo })}
                                                                            style={{ color: 'white' }}
                                                                        />

                                                                        <TextField
                                                                            onBlur={editTextFieldBlur}
                                                                            defaultValue={todo.text}
                                                                            InputProps={
                                                                                {
                                                                                    style: { color: "white" },
                                                                                    classes
                                                                                }
                                                                            }
                                                                            style={todo.complete ? { textDecoration: "line-through", textDecorationColor: "red", width: "80%" } : { width: "80%" }}
                                                                            type="text"
                                                                            disabled={editID === todo.id ? false : true}
                                                                            // InputProps={{ style:{color:"white", textDecoration:"none" } }} 
                                                                            onKeyDown={editTodoListTitle}
                                                                            onChange={editTodoListTitle}
                                                                            multiline
                                                                        />
                                                                        <MoreHorizIcon style={{ cursor: "pointer" }} />

                                                                    </div>
                                                                    {/* <div style={{ position: "absolute", top: "25px", right: 15 }}>

                                                                        <Button style={{ marginRight: 20 }} onClick={() => { setEditID(!editID ? todo.id : null); setDefaultTodoTitle(todo.title ? "" : todo.title) }} variant="contained">Edit</Button>
                                                                        <Button onClick={() => dispatch({ type: "delete", data: todo })} variant="contained">Delete</Button>
                                                                    </div> */}
                                                                </Paper>
                                                            </Grid>
                                                        ))}

                                                    </Grid>

                                                    <div style={{ marginTop: 11 }}>
                                                        <TextField
                                                            variant="outlined"
                                                            InputLabelProps={{
                                                                classes: {
                                                                    root: classes.cssLabel,
                                                                    focused: classes.cssFocused,
                                                                },
                                                            }}
                                                            InputLabelProps={{
                                                                classes: {
                                                                  root: classes.cssLabel,
                                                                  focused: classes.cssFocused,
                                                                },
                                                              }}
                                                              InputProps={{
                                                                classes: {
                                                                  root: classes.cssOutlinedInput,
                                                                  focused: {color:"red !important"},
                                                                  notchedOutline: classes.notchedOutline,
                                                                },
                                                                inputMode: "numeric"
                                                              }}
                                                            label="New Todo"
                                                            value={newTodo}
                                                            onKeyDown={addNewTodoList}
                                                            onChange={addNewTodoList}
                                                            fullWidth
                                                        />
                                                    </div>






                                                </Paper>
                                            </Grid>
                                            :
                                            null}


                                    {/* </TabPanel> */}

                                    {/* END OF APPBAR */}


                                </Paper>
                                <Typography variant="h6" style={{ textAlign: "center" }}>TODO LIST</Typography>
                            </div>
                        </div>

                    </>

                }

            </header>
        </div>
        </ThemeProvider>
    )
}
