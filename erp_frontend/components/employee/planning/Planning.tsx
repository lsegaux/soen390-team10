import React, {useState, useEffect} from "react";
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
import { Dialog, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from "axios";
//@ts-ignore
import TimeLine from "react-gantt-timeline";
import { getTasks, postTask, editTask, deleteTask } from "../../../utils/datafetcher";

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

export default function Planning(){

    const classes = useStyles();
    const [dense, setDense] = useState(false);
    const [openTaskForm, setOpenTaskForm] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskType, setTaskType] = React.useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [tasks, setTasks] = useState(Array());
    const [gantt, setGantt] = useState(Array());
    const [openTaskInfo, setOpenTaskInfo] = useState(false);
    const [currentTask, setCurrentTask] = useState(Object());
    const [openTaskEdit, setOpenTaskEdit] = useState(false);
    const [openTaskDelete, setOpenTaskDelete] = useState(false);
    const [checked, setChecked] = useState(false);

    const taskTypeArr = ["Shipping", "Packaging", "Accounting", "Quality Management"]; 

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTaskType(event.target.value as string);
    };

    const handleOpen = () => {
        setOpenTaskForm(true);
    }

    const handleClose = () => {
        setOpenTaskForm(false);
        setTaskName("");
        setTaskDescription("");
        setTaskType("");
        setStartDate("");
        setEndDate("");
    }

    const formatStartDate = (date) => {
        //If the start date is not yet in ISO 8601 format...
        if(date.length<=12){
            const arrDate = date.split('-');
            return new Date(arrDate[0], arrDate[1]-1, arrDate[2]);
        }
        return date;
    }

    const formatEndDate = (date) => {
        //If the end date is not yet in ISO 8601 format...
        if(date.length<=12){
            const arrDate = date.split('-');
            return new Date(arrDate[0], arrDate[1]-1, arrDate[2],23,59);
        }
        return date;
    }

    const populateGantt = (data) => {
        const ganttData = new Array();
        for(let i = 0; i < data.length; i++) {
            let obj = {
                    id: data[i].task_ID,
                    start: data[i].start_time,
                    end: data[i].end_time,
                    name: data[i].task_name,
                    color: data[i].status ? "gray":"blue"
                  }
            ganttData.push(obj)
        }

        setGantt(ganttData);
    }

    //fetching tasks
    useEffect(() => {
        let isMounted = true;
        getTasks(res => {
            var rows = Array();
            for(var i=0; i<res.data.length; i++){
                //Formatting time returned by server to function with Gantt Chart
                var formattedStartTime = new Date(res.data[i].start_time);
                var formattedEndTime = new Date(res.data[i].end_time);
                res.data[i].start_time = formattedStartTime;
                res.data[i].end_time = formattedEndTime;
                //Pushing the data to the rows variable.
                rows.push(res.data[i]);
            }
            //Setting the state and populating Gantt Chart.
            setTasks(rows);
            populateGantt(rows);
        })
        return ()=>{isMounted = false}
      }, []);

    const handleAdd = () => {
        if(taskName == '' || taskDescription == '' || taskType == '' || startDate == '' || endDate == '') {
            return alert("Please make sure all fields are complete before saving.");
        }
        setOpenTaskForm(false);
        const end = formatEndDate(endDate)
        const start = formatStartDate(startDate)

        postTask(taskDescription, end, start, taskName, taskType, res => {
            alert("Your task has been added!");
            updatePlanningInfo(res)
        });

        setTaskName("");
        setTaskDescription("");
        setTaskType("");
        setStartDate("");
        setEndDate("");
    }

    function handleOpenTask(task) {
        setOpenTaskInfo(true);
        setCurrentTask(task);
    }

    const handleCloseTask = () => {
        setOpenTaskInfo(false);
        setCurrentTask(Object());
    }

    function handleOpenEdit(task) {
        setChecked(task.status);
        setTaskName(task.task_name);
        setTaskDescription(task.description);
        setTaskType(task.task_type);
        setStartDate(task.start_time);
        setEndDate(task.end_time);
        setOpenTaskEdit(true);
        setCurrentTask(task);
    }

    const handleCloseEdit = () => {
        setTaskName("");
        setTaskDescription("");
        setTaskType("");
        setStartDate("");
        setEndDate("");
        setOpenTaskEdit(false);
        setCurrentTask(Object());
    }

    function handleOpenDelete(task) {
        setOpenTaskDelete(true);
        setCurrentTask(task);
    }

    const handleCloseDelete = () => {
        setOpenTaskDelete(false);
        setCurrentTask(Object());
    }

    const handleCheckbox = event => {
        setChecked(event.target.checked);
    };

    const handleEdit = () => {
        if(taskName == '' || taskDescription == '' || taskType == '' || startDate == '' || endDate == '') {
            return alert("Please make sure all fields are complete before saving.");
        }
        setOpenTaskEdit(false);
        const end = formatEndDate(endDate)
        const start = formatStartDate(startDate)

        editTask(taskDescription, end, start, checked, taskName, taskType, currentTask, res => {
            alert("Your task has been modified!");
            updatePlanningInfo(res)
        })
        
        setTaskName("");
        setTaskDescription("");
        setTaskType("");
        setStartDate("");
        setEndDate("");
        setCurrentTask(Object());
    }

    const handleDelete = () => {
        setOpenTaskDelete(false);

        deleteTask(currentTask, res =>{
            alert("Your task has been modified!");
            updatePlanningInfo(res)
        })
    }

    function updatePlanningInfo(res){
        var rows = Array();
        for(var i=0; i<res.data.length; i++){
            //Formatting time returned by server to function with Gantt Chart
            var formattedStartTime = new Date(res.data[i].start_time);
            var formattedEndTime = new Date(res.data[i].end_time);
            res.data[i].start_time = formattedStartTime;
            res.data[i].end_time = formattedEndTime;
            rows.push(res.data[i]);
        }
        setTasks(rows);
        populateGantt(rows);
    }

    function setDefaultDate(d) {
        if(d==undefined) {
            return undefined;
        }
        var month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    } 

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
                    <DialogTitle id="form-dialog-title">Task Form</DialogTitle>
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
                            defaultValue=''
                            >
                            {taskTypeArr.map((type, key) => {
                                return (
                                    <MenuItem key = {key} value={type}>{type}</MenuItem>)
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
                            <Button onClick={handleAdd} color="primary">
                                Save Task
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Typography>
                <div className={classes.demo}>
                    <List dense={dense}>
                    {tasks.map((task) => {
                        return (
                            <div key={task.task_name}>
                            <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <IconButton onClick={ () => handleOpenTask(task)}>
                                    <FolderIcon />
                                </IconButton>
                            </Avatar>
                        </ListItemAvatar>
                        <Dialog open={openTaskInfo && currentTask != undefined} onClose={handleCloseTask} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Task Details</DialogTitle>
                            <DialogContent>
                                <Typography>{"Task Name: " + currentTask.task_name}</Typography>
                                <Typography>{"Task Description: " + currentTask.description}</Typography>
                                <Typography>{"Task Type: " + currentTask.task_type}</Typography>
                                <Typography>{"Start Date: " + setDefaultDate(currentTask.start_time)}</Typography>
                                <Typography>{"End Date: " + setDefaultDate(currentTask.end_time)}</Typography>
                                <Typography>{"Assignee: " + currentTask.employee_name}</Typography>
                                <Typography>{"Status: " + (currentTask.status ? " Complete" : " In progress")}</Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseTask} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <ListItemText
                            primary={task.task_name}
                            secondary={task.empoyee_name}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="edit" onClick={ () => handleOpenEdit(task)}>
                                <EditIcon />
                            </IconButton>
                            <Dialog open={openTaskEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
                                <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Task Name"
                                    defaultValue={currentTask.task_name}
                                    type="string"
                                    fullWidth
                                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setTaskName(e.target.value)}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Description"
                                    defaultValue={currentTask.description}
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
                                    defaultValue=''
                                    >
                                    {taskTypeArr.map((type, key) => {
                                        return (
                                            <MenuItem key={key} value={type}>{type}</MenuItem>)
                                    })}
                                    </Select>
                                </FormControl>
                                <br/>
                                <label htmlFor="start">Start Date: </label>
                                <input 
                                    type="date" 
                                    id="start" 
                                    name="start"
                                    defaultValue={setDefaultDate(currentTask.start_time)}
                                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setStartDate(e.target.value)}>
                                </input>
                                <br/><br/>
                                <label htmlFor="end">End Date: </label>
                                <input 
                                    type="date" 
                                    id="end" 
                                    name="end"
                                    defaultValue={setDefaultDate(currentTask.end_time)} 
                                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEndDate(e.target.value)}>
                                </input>
                                <br/>
                                <FormControlLabel
                                    value="complete"
                                    control={<Checkbox color="primary" checked={checked} onChange={handleCheckbox}/>}
                                    label="Task Complete "
                                    labelPlacement="start"
                                />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleEdit} color="primary">
                                        Save Changes
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <IconButton edge="end" aria-label="delete" onClick={ () => handleOpenDelete(task)}>
                                <DeleteIcon />
                            </IconButton>
                            <Dialog open={openTaskDelete && currentTask != undefined} onClose={handleCloseDelete} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Delete Task</DialogTitle>
                                    <DialogContent>
                                    <Typography>{"Do you want to delete the following task:  " + currentTask.task_name}</Typography>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleDelete} color="primary">
                                            Delete
                                        </Button>
                                        <Button onClick={handleCloseDelete} color="primary">
                                            Cancel
                                        </Button>
                                    </DialogActions>
                            </Dialog>
                        </ListItemSecondaryAction>
                        </ListItem>
                        </div>)
                    })}
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
            <TimeLine data={gantt} />
                <br/>
                <br/>
            </div>
        </div>
    </>
  );
}