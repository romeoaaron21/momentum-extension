import React, { useState, useContext, useEffect } from 'react';
import { StateContext } from "../../context/context";

import { Grid, Paper, Typography, TextField, Checkbox, IconButton } from '@material-ui/core';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Popover, { ArrowContainer } from 'react-tiny-popover';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FormatListBulletedTwoToneIcon from '@material-ui/icons/FormatListBulletedTwoTone';

import { makeStyles } from "@material-ui/core/styles";

import moment from 'moment-timezone';


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

    const [editID, setEditID] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);


    const countDone = (state) => {
        let doneCount = state.todos.filter(todo => todo.complete && todo.time < +new Date().setUTCHours(0, 0, 0, 0))
        return (
            <>
                {doneCount.length ?
                    <>
                        <FormatListBulletedTwoToneIcon /> <span style={{ marginLeft: 10 }}>{doneCount.length} Done Tasks</span>
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
                    {countDone(state)}
                </Typography>

                <Grid style={{ overflow: "auto", width: "100%", height: "510px", padding: 0 }} component="nav" >

                    {[...new Set(state.todos.map(todo => { if (todo.complete && todo.time < +new Date().setUTCHours(0, 0, 0, 0)) { return todo.time } }))].filter(function (data) { return data != null }).sort(function (a, b) { return b - a }).map(time => (
                        <>
                            <Typography variant="h6" style={{margin: "10px 0 0 5px"}}>{moment(time).format('ll')}</Typography>

                            {state.todos.map(todo => {
                                if (todo.time === time && todo.complete) {
                                    return (
                                        <Grid key={todo.id} item xs={12}>
                                            <Paper style={{ background: "#fff0", fontWeight: 700, color: "white", marginLeft: 20 }}>
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
                                                        onChange={(e) => dispatch({ type: "edit_todo", data: { title: e.target.value, id: editID } })}
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
                                    )
                                }
                            })}
                        </>
                    ))}
                </Grid>
            </Paper>
        </Grid>
    )
}
