import React, { useContext, useState } from 'react'
import { StateContext } from "../context/context"

import { Paper, Typography, AppBar, Tabs, Tab, Box, Grid, List, ListItem, ListItemIcon, Collapse, ListItemText, Divider } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";

import StarBorder from '@material-ui/icons/StarBorder';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { makeStyles } from "@material-ui/core/styles";
//common-components
import CircularLoader from './common-components/CircularLoader';
import Task from './todoList/Task';
import Done from './todoList/Done'

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
    }
}));


export default function TodoList() {
    const classes = useStyles();
    const { state } = useContext(StateContext);
    const [value, setValue] = useState(2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    window.addEventListener('beforeunload', () => {
        localStorage.setItem("todo_list", JSON.stringify(state));
    });

    console.log(state)

    return (
        <ThemeProvider theme={themeColor}>
            <div>
                <header className="App-header">
                    {state.loader ? (
                        <CircularLoader />
                    )
                        :
                        <>
                            <Box>
                                <div style={{ position: "fixed", top: 100, left: 40 }}>
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
                                                                        <ListItem button style={{ height: "3vh" }}>
                                                                            <ListItemIcon>
                                                                                <StarBorder style={{ color: "white" }} />
                                                                            </ListItemIcon>
                                                                            <ListItemText primary="Sample Task 1" />
                                                                        </ListItem>
                                                                        <ListItem button style={{ height: "3vh" }}>
                                                                            <ListItemIcon>
                                                                                <StarBorder style={{ color: "white" }} />
                                                                            </ListItemIcon>
                                                                            <ListItemText primary="Sample Task 2" />
                                                                        </ListItem>
                                                                        <ListItem button style={{ height: "3vh" }}>
                                                                            <ListItemIcon>
                                                                                <StarBorder style={{ color: "white" }} />
                                                                            </ListItemIcon>
                                                                            <ListItemText primary="Sample Task 3" />
                                                                        </ListItem>
                                                                    </List>
                                                                </Collapse>
                                                            </List>

                                                            <Divider variant="fullWidth" classes={{ root: classes.dividerColor }} />
                                                        </>
                                                    ))
                                                    :
                                                    <div>
                                                        No Project Goals
                                                    </div>}



                                            </div>



                                        </Paper>

                                    </Grid>
                                </div>

                                <div style={{ position: "fixed", bottom: 0, right: 0 }}>
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
                                                <Task />
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
