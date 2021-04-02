import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { RadioGroup, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
//@ts-ignore
import TimeLine from "react-gantt-timeline";

const css = `
.horizontalSpace {
    allignSelf: 'center';
    background-color: rgba(246, 215, 143, 0.9);
    height 100%;
}
.tasksTable{
    
}
`

const useStyles = makeStyles((theme) => ({

    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
        textAlign: "left",
      margin: theme.spacing(4, 0, 2),
      fontFamily: 'sans-serif',
      fontStyle: 'normal',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    selectEmpty: {
    marginTop: theme.spacing(2),
    },

}));

function generate(element:any) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
        key: value,
        }),
    );
}


export default function Planning(){

    // function setDefaultDate() {
    //     var d = new Date(),
    //         month = '' + (d.getMonth() + 1),
    //         day = '' + d.getDate(),
    //         year = d.getFullYear();
    
    //     if (month.length < 2) 
    //         month = '0' + month;
    //     if (day.length < 2) 
    //         day = '0' + day;
    
    //     console.log("date ", d);
    //     console.log([year, month, day].join('-'));
    //     return [year, month, day].join('-');
    // }
    
    const classes = useStyles();
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [openTaskForm, setOpenTaskForm] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskType, setTaskType] = React.useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [tasks, setTasks] = useState(Array());
    const [gantt, setGantt] = useState(Array());

    const taskTypeArr = ["Shipping", "Packaging", "Accounting", "Quality Management"]; 

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTaskType(event.target.value as string);
    };

    const handleOpen = () => {
        setOpenTaskForm(true);
    }

    const handleClose = () => {
        setOpenTaskForm(false);
    }

    const formatDate = (date) => {
        const arrDate = date.split('-');
        return new Date(arrDate[0], arrDate[1]-1, arrDate[2]);
    }

    const updateGantt = (response) => {

    }

    const handleSave = () => {
        if(taskName == '' || taskDescription == '' || taskType == '' || startDate == '' || endDate == '') {
            return alert("Please make sure all fields are complete before saving.");
        }
        setOpenTaskForm(false);
        // axios({
        //     method: 'post',
        //     //missing url
        //     url: "??",
        //     headers: { 
        //         "Content-Type": "application/json",
        //         "Authorization": "Bearer " + localStorage.getItem('jwt')
        //      },
        //     data: {
        //         "task": {
        //             description: taskDescription,
        //             employeeJWT: localStorage.getItem('jwt'),
        //             endTime: formatDate(endDate),
        //             startTime: formatDate(startDate),
        //             status: false,
        //             taskName: taskName,
        //             taskType: taskType,
        //         }
        //     }
        // }).then(res => {
        //     if (res.status === 200) {
        //         alert("Your task has been added!");
        //         var rows = Array();
        //         for(var i=0; i<res.data.data.length; i++){
        //             rows.push(res.data.data[i]);
        //         }
        //         setTasks(rows);
        //     }
        // }).catch(err => {
        //     console.error(err);
        // });
    }

    

    let d1 = new Date();
    console.log(d1)
    let d2 = new Date();
    d2.setDate(d2.getDate() + 5);
    let d3 = new Date();
    d3.setDate(d3.getDate() + 8);
    let d4 = new Date();
    d4.setDate(d4.getDate() + 20);
    let data = [
      {
        id: 1,
        start: d1,
        end: d2,
        name: "Demo Task 1"
      },
      {
        id: 2,
        start: d3,
        end: d4,
        name: "Demo Task 2",
        color: "orange"
      }
    ];
  return (
    <>
    <style>
        {css}
    </style>
        <div className="horizontalSpace">
            <div className="tasksTable">
                <Grid item xs={12} lg={12}>
                <Typography variant="h6" className={classes.title}>
                    <br/>
                &nbsp;Tasks
                    <IconButton onClick={handleOpen}>
                    <AddIcon />
                    </IconButton>
                    <Dialog open={openTaskForm} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Task Details</DialogTitle>
                        <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Task Name"
                            type="string"
                            fullWidth
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setTaskName(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Description"
                            type="string"
                            fullWidth
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setTaskDescription(e.target.value)}
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Task Type</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={taskType}
                            fullWidth
                            onChange={handleChange}
                            >
                            {taskTypeArr.map((task) => {
                                return (
                                    <MenuItem value={task}>{task}</MenuItem>)
                            })}
                            </Select>
                        </FormControl>
                        <br/>
                        <label htmlFor="start">Start Date: </label>
                        <input 
                            type="date" 
                            id="start" 
                            name="start"
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setStartDate(e.target.value)}>
                        </input>
                        <br/><br/>
                        <label htmlFor="end">End Date: </label>
                        <input 
                            type="date" 
                            id="end" 
                            name="end" 
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEndDate(e.target.value)}>
                        </input>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleSave} color="primary">
                                Save Task
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Typography>
                <div className={classes.demo}>
                    <List dense={dense}>
                    {generate(
                        <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                            <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="task"
                            secondary={secondary ? 'Secondary text' : "deadline: feb 3rd"}
                        />
                        <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="edit">
                            <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                        </ListItem>,
                    )}
                    </List>
                </div>
                </Grid>
            </div>
            <div className = {classes.title}>
                <Typography variant="h6" className={classes.title}>
                &nbsp;Gantt Chart
                </Typography>
            </div>

            <div>
            <TimeLine data={data} />
                <br/>
                <br/>
            </div>
        </div>
    </>
  );
}