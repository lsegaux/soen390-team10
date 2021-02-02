import React from "react";
import { Pane, Button, Heading, Link, Popover, Menu } from "evergreen-ui";
import {Drawer, Container, Toolbar, AppBar} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { url } from "inspector";
// @ts-ignore
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

    ganttChart: {
        backgroundImage: `url("https://assets-global.website-files.com/5a5399a10a77cc0001b18774/5f45691e5710e40483762559_Free%20Excel%20gantt%20chart%20header%20image.png")`,
    }
    
  }));
  
  function generate(element:any) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }


const AdminPlanning = () => {

    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    let data=[ {id:1,start:new Date(), end:Date.now()+1 ,name:'Task 1'},
            {id:2,start:new Date(), end:Date.now()+1 ,name:'Task 2'}, {id:2,start:new Date(), end:Date.now()+1 ,name:'Task 3'}]
            
    let links=[ {id:1,start:1, end:2},
                {id:2,start:1, end:3}]
  return (
    <>
    <style>
        {css}
    </style>
        <div className="horizontalSpace">
            <div className="tasksTable">
                <Grid item xs={12} lg={12}>
                <Typography variant="h6" className={classes.title}>
                    Tasks
                </Typography>
                <IconButton>
                    <AddIcon />
                </IconButton>
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
                <br/>
                <Typography variant="h6" className={classes.title}>
                   Schedule New Meeting
                   <IconButton>
                    <AddIcon />
                 </IconButton>
                </Typography>
                <Typography variant="h6" className={classes.title}>
                    Gantt Chart
                </Typography>
            </div>
            
            <div>
            <TimeLine data={data} links={links} />
                <br/>
                <br/>
            </div>
        </div>
    </>
  );
};

export default AdminPlanning;
