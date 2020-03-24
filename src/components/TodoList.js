import React, { useContext, useState } from 'react'
import { StateContext } from "../context/context"

import { Grid, Paper, Button, Typography, TextField, Checkbox, AppBar, Tabs, Tab, Box, List, ListItem, ListItemText, IconButton } from "@material-ui/core";
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Popover, { ArrowContainer } from 'react-tiny-popover';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FormatListBulletedTwoToneIcon from '@material-ui/icons/FormatListBulletedTwoTone';

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
        color: 'white'
    },

    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: `${theme.palette.primary.main} !important`,
        },
        color: "white"
    },

    cssFocused: {},

    notchedOutline: {
        borderWidth: '1px',
        borderColor: 'white !important'
    },
    iconButton: {
        "&:hover": {
            backgroundColor: "transparent"
        },
        cursor: "pointer"
    }
}));

export default function TodoList() {
    const classes = useStyles();
    const { state, dispatch } = useContext(StateContext);
    const [newTodo, setNewTodo] = useState("");
    const [editID, setEditID] = useState(null);

    const [selectedTask, setSelectedTask] = useState(null);

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

    const editTodoListTitle = (e) => {
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
                                                <Tab style={{ width: "50%", color: "white" }} value={1} label="Done" />
                                                <Tab style={{ width: "50%", color: "white" }} value={2} label="Tasks" />
                                            </Tabs>
                                        </AppBar>

                                        {value === 1 ? (
                                            <Grid container>
                                                <Paper elevation={0} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#00000061", padding: "5px 10px", color: "white", overflow: "hidden" }}>
                                                    <Typography variant="h6" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        Done List
                                                    </Typography>
                                                </Paper>

                                            </Grid>

                                        ) : value === 2 ?
                                                <Grid container style={{ overFlow: "hidden" }}>
                                                    <Paper elevation={0} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#00000061", padding: "5px 10px", color: "white", overflow: "hidden" }}>

                                                        <Typography variant="h6" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                            <FormatListBulletedTwoToneIcon /> <span style={{ marginLeft: 10 }}>{state.todos.length ? `${state.todos.length} Todo List` : "Nothing to show!"}</span>
                                                        </Typography>

                                                        <Grid style={{ overflow: "auto", width: "100%", height: "465px", padding: 0 }} component="nav" >
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
                                                                                onBlur={() => setEditID()}
                                                                                defaultValue={todo.text}
                                                                                InputProps={
                                                                                    {
                                                                                        style: { color: "white" },
                                                                                        classes
                                                                                    }
                                                                                }
                                                                                style={todo.complete ? { textDecoration: "line-through", textDecorationColor: "white", width: "80%" } : { width: "80%" }}
                                                                                type="text"
                                                                                disabled={editID === todo.id ? false : true}
                                                                                // InputProps={{ style:{color:"white", textDecoration:"none" } }} 
                                                                                onKeyDown={(e) => e.key === "Enter" ? setEditID() : null}
                                                                                onChange={editTodoListTitle}
                                                                                multiline
                                                                                autoFocus={todo.id === editID ? true : false}
                                                                                onClick={() => setSelectedTask(null)}
                                                                            />


                                                                            <Popover
                                                                                isOpen={selectedTask === todo.id ? true : false}
                                                                                position={'top'}
                                                                                align={'end'}
                                                                                content={({ position, targetRect, popoverRect }) => (
                                                                                    <ArrowContainer
                                                                                        position={position}
                                                                                        targetRect={targetRect}
                                                                                        popoverRect={popoverRect}
                                                                                        arrowColor={'#b3b3b359'}
                                                                                        arrowSize={10}
                                                                                    >
                                                                                        <div
                                                                                            style={{ backgroundColor: '#b3b3b359', display: "flex", alignItems: "center", color: "white", borderRadius: "3px" }}
                                                                                            onClick={() => setSelectedTask(null)}
                                                                                            onBlur={() => setSelectedTask(null)}
                                                                                        >

                                                                                            {/* <span style={{marginRight:10}}>Edit</span>
                                                                                            <span>Delete</span> */}
                                                                                            <IconButton className={classes.iconButton} onClick={() => setEditID(!editID ? todo.id : null)}>
                                                                                                <EditIcon style={{ color: "#1da1f2" }} />
                                                                                            </IconButton>

                                                                                            <IconButton className={classes.iconButton} onClick={() => dispatch({ type: "delete", data: todo })}>
                                                                                                <DeleteIcon style={{ color: "#ef5350" }} />
                                                                                            </IconButton>
                                                                                        </div>
                                                                                    </ArrowContainer>
                                                                                )}
                                                                            >
                                                                                <MoreHorizIcon style={{ cursor: "pointer", margin: "0 10px" }} onClick={() => setSelectedTask(!selectedTask ? todo.id : null)} />
                                                                            </Popover>

                                                                        </div>
                                                                        {/* <div style={{ position: "absolute", top: "25px", right: 15 }}>

                                                                        <Button style={{ marginRight: 20 }} onClick={() => { setEditID(!editID ? todo.id : null); setDefaultTodoTitle(todo.title ? "" : todo.title) }} variant="contained">Edit</Button>
                                                                        <Button onClick={() => dispatch({ type: "delete", data: todo })} variant="contained">Delete</Button>
                                                                    </div> */}
                                                                    </Paper>
                                                                </Grid>
                                                            ))}

                                                        </Grid>

                                                        <div style={{ marginTop: 5 }}>
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
                                                                        focused: { color: "red !important" },
                                                                        notchedOutline: classes.notchedOutline,
                                                                    },
                                                                    inputMode: "numeric"
                                                                }}
                                                                label="New Todo"
                                                                value={newTodo}
                                                                onKeyDown={addNewTodoList}
                                                                onChange={addNewTodoList}
                                                                fullWidth
                                                                size="small"
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
