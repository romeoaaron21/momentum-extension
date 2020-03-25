import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import { StateContext } from "../../../context/context";
import { TaskGoalContext } from "../../../context/taskGoalContext";



const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: 3,
        left: 0,
        right: 0,
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
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
    },
}));




export default function GoalSelector(props) {
    const { state, dispatch } = useContext(StateContext);
    const { state1, dispatch1 } = useContext(TaskGoalContext);
    const classes = useStyles();

    const [selectedGoal, setSelectedGoal] = useState("")


    function renderInput(inputProps) {
        const { InputProps, classes, ref, ...other } = inputProps;

        return (
            <TextField
                variant="outlined"
                size="small"
                onKeyUp={(e) => setSelectedGoal(e.target.value)}
                InputProps={{
                    inputRef: ref,
                    classes: {
                        root: classes.cssOutlinedInput,
                        notchedOutline: classes.notchedOutline,
                        input: classes.inputInput,
                    },
                    ...InputProps,
                }}
                {...other}
            />
        );
    }

    function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
        const isHighlighted = highlightedIndex === index;
        const isSelected = (selectedItem || '').indexOf(suggestion.title) > -1;

        return (
            <MenuItem
                {...itemProps}
                key={suggestion.title}
                selected={isHighlighted}
                component="div"
                style={{
                    fontWeight: isSelected ? 500 : 400,
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="subtitle1">
                            {suggestion.title}
                        </Typography>
                    </div>

                </div>
            </MenuItem>
        );
    }

    renderSuggestion.propTypes = {
        highlightedIndex: PropTypes.number,
        index: PropTypes.number,
        itemProps: PropTypes.object,
        selectedItem: PropTypes.string,
        suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
    };

    function getSuggestions(value) {

        const inputValue = deburr(value.trim()).toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;


        return inputLength === 0
            ? []
            : state.goals.filter(suggestion => {
                const keep = 
                    count < 5 && suggestion.title.slice(0, inputLength).toLowerCase() === inputValue;

                if (keep) {
                    count += 1;
                }

                return keep;
            });
    }



    return (
        <div className={classes.root}>
            <Downshift
                onChange={(selecteditem) => dispatch1({ type: "set_goalTitle", title: selecteditem, allState:state })}
            >
                {({
                    getInputProps,
                    getItemProps,
                    getMenuProps,
                    highlightedIndex,
                    inputValue,
                    isOpen,
                    selectedItem,
                }) => (
                        <div className={classes.container}>
                            {renderInput({
                                fullWidth: true,
                                classes,
                                InputProps: getInputProps({
                                    placeholder: 'Select a goal',
                                }),
                            })}
                            <div {...getMenuProps()}>
                                {isOpen ? (
                                    <Paper className={classes.paper} square>
                                        {getSuggestions(inputValue).length ? getSuggestions(inputValue).map((suggestion, index) =>
                                            renderSuggestion({
                                                suggestion,
                                                index,
                                                itemProps: getItemProps({ item: suggestion.title }),
                                                highlightedIndex,
                                                selectedItem,
                                            }),
                                        ) :
                                            [{ title: selectedGoal }].map((suggestion, index) =>
                                                renderSuggestion({
                                                    suggestion,
                                                    index,
                                                    itemProps: getItemProps({ item: suggestion.title }),
                                                    highlightedIndex,
                                                    selectedItem,
                                                }),
                                            )
                                        }
                                    </Paper>
                                ) : null}
                            </div>
                        </div>
                    )}
            </Downshift>

        </div>
    );
}

