import React, { useState, useContext } from 'react';
import { StateContext } from "../../context/context";

import { Grid, Paper, Typography, TextField, Checkbox, IconButton } from '@material-ui/core';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Popover, { ArrowContainer } from 'react-tiny-popover';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FormatListBulletedTwoToneIcon from '@material-ui/icons/FormatListBulletedTwoTone';

import { makeStyles } from "@material-ui/core/styles";


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


export default function Task() {
    const classes = useStyles();
    const { state, dispatch } = useContext(StateContext);
    const [newTodo, setNewTodo] = useState("");
    const [editID, setEditID] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

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

    const countTasks = (state) => {
        let taskCount = state.todos.filter(todo => (!todo.complete) || (todo.complete && todo.time >= +new Date().setUTCHours(0, 0, 0, 0)))
        return (
            <>
                {taskCount.length ?
                    <>
                        <FormatListBulletedTwoToneIcon /> <span style={{marginLeft:10}}>{taskCount.length} Todo List</span>
                    </>
                    :
                    <span>No Todo List</span>
                }
            </>
        )
    }

    return (
        <Grid container style={{ overFlow: "hidden" }}>
            <Paper elevation={0} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#00000061", padding: "5px 10px", color: "white", overflow: "hidden" }}>

                <Typography variant="h6" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {countTasks(state)}
                </Typography>

                <Grid style={{ overflow: "auto", width: "100%", height: "465px", padding: 0 }} component="nav" >
                    {state.todos.map(todo => (
                        (!todo.complete) || (todo.complete && todo.time >= +new Date().setUTCHours(0, 0, 0, 0)) ?
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
                                            InputProps={{
                                                style: { color: "white" },
                                                classes
                                            }}
                                            style={todo.complete ? { textDecoration: "line-through", textDecorationColor: "white", width: "80%" } : { width: "80%" }}
                                            type="text"
                                            disabled={editID === todo.id ? false : true}
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
                                </Paper>
                            </Grid>
                            :
                            null
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
                        InputProps={{
                            classes: {
                                root: classes.cssOutlinedInput,
                                notchedOutline: classes.notchedOutline,
                            }
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
    )
}
