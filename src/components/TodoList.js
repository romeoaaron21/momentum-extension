import React, { useContext, useState } from 'react'
import { StateContext } from "../context/context"
import TaskGoalProvider from "../context/taskGoalContext";

import { Paper, Typography, AppBar, Tabs, Tab, Box, Grid, List, ListItem, ListItemIcon, Collapse, ListItemText, Divider, TextField } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";

import StarBorder from '@material-ui/icons/StarBorder';
import { makeStyles } from "@material-ui/core/styles";
//common-components
import CircularLoader from './common-components/CircularLoader';
import Task from './todoList/Task';
import Done from './todoList/Done';
import GoalSelector from "./todoList/add-goal/GoalSelector"


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
    dividerColor: {
        backgroundColor: '#6f6f6f',
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
}));


export default function TodoList() {
    const classes = useStyles();
    const { state, dispatch } = useContext(StateContext);
    const [value, setValue] = useState(2);

    const [newGoal, setNewGoal] = useState("");

    const addNewGoal = (e) => {
        // setNewGoal(e.target.value)
        // console.log(e)
        if (e.key === "Enter") {
            dispatch({ type: "add_goal", title: e.target.value })
            setNewGoal("")
        }
        else {
            setNewGoal(e.target.value)
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    window.addEventListener('beforeunload', () => {
        localStorage.setItem("todo_list", JSON.stringify(state));
    });


    return (
        <ThemeProvider theme={themeColor}>
            <div>
                <header className="App-header">
                    {state.loader ? (
                        <CircularLoader />
                    )
                        :
                        <>
                            {/* <TaskGoalProvider>
                                <GoalSelector />
                            </TaskGoalProvider> */}


                            <Box>
                                <div style={{ position: "fixed", top: 100, left: 40 }}>
                                    <div>
                                        <TextField
                                            variant="outlined"
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.cssLabel,
                                                    focused: classes.cssFocused,
                                                },
                                            }}
                                            InputProps={{
                                                classes: {
                                                    root: classes.cssOutlinedInput,
                                                    notchedOutline: classes.notchedOutline,
                                                }
                                            }}
                                            label="Add Goal"
                                            value={newGoal}
                                            onKeyDown={addNewGoal}
                                            onChange={addNewGoal}
                                            size="small"
                                            style={{ width: "50%" }}
                                        />
                                    </div>
                                    <Grid item xs={3} sm={6} spacing={6} style={{ height: 500, width: 800, margin: "0 10px 0 0", backgroundColor: "#ffffff21" }} variant="outlined">
                                        <Paper style={{ height: "100%", backgroundColor: "#00000061", color: "white" }}>
                                            <div style={{ height: "7%", background: "#f7f7f714", padding: 10 }}>
                                                <Typography variant="h4" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    PROJECT GOALS
                                            </Typography>
                                            </div>

                                            <div style={{ height: "89%", overflow: "auto" }}>
                                                {state.goals.length ?
                                                    state.goals.map(goal => (
                                                        <>
                                                            <List
                                                                component="nav"
                                                            >
                                                                <ListItem button style={{ height: "4vh", padding: "0 20px" }}>
                                                                    <ListItemText primary={goal.title} />
                                                                </ListItem>

                                                                <Collapse in={true} timeout="auto" unmountOnExit>
                                                                    <List component="div" style={{ marginLeft: 30 }} disablePadding>
                                                                        {state.todos.map(todo => (
                                                                            todo.goal_id === goal.id ? (
                                                                                <ListItem button style={{ height: "3vh" }}>
                                                                                    <ListItemIcon>
                                                                                        <StarBorder style={{ color: "white" }} />
                                                                                    </ListItemIcon>
                                                                                    <ListItemText primary={todo.text} />
                                                                                </ListItem>
                                                                            )
                                                                                :
                                                                                null
                                                                        ))}

                                                                    </List>
                                                                </Collapse>
                                                            </List>

                                                            <Divider variant="fullWidth" classes={{ root: classes.dividerColor }} />
                                                        </>
                                                    ))
                                                    :
                                                    <div>
                                                        No Project Goals
                                                    </div>
                                                }



                                            </div>



                                        </Paper>

                                    </Grid>
                                </div>

                                <div style={{ position: "fixed", top: 0, right: 0 }}>
                                    <Paper style={{ height: 600, width: 400, margin: "0 10px 0 0", backgroundColor: "#ffffff21" }} variant="outlined">

                                        <AppBar position="static" style={{ background: "#3f51b5" }}>
                                            <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
                                                <Tab style={{ width: "50%", color: "white" }} value={1} label="Done" />
                                                <Tab style={{ width: "50%", color: "white" }} value={2} label="Tasks" />
                                            </Tabs>
                                        </AppBar>

                                        {value === 1 ? (
                                            <Done />

                                        ) : value === 2 ?
                                                <TaskGoalProvider>
                                                    <Task />
                                                </TaskGoalProvider>
                                                : null}


                                    </Paper>
                                    <Typography variant="h6" style={{ textAlign: "center" }}>TODO LIST</Typography>
                                </div>
                            </Box>

                        </>

                    }

                </header>
            </div>
        </ThemeProvider >
    )
}
