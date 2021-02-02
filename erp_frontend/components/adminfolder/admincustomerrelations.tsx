import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';

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


const AdminCustomerRelations = () => {

    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
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
                &nbsp;Orders List
                    <IconButton>
                    <AddIcon />
                </IconButton>
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
                            primary="Bike X"
                            secondary={secondary ? 'Secondary text' : "Materials : ..........."}
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
            <div><Typography variant="h6" className={classes.title}>&nbsp;Export Sales
                <IconButton>
                    <PrintIcon />
                </IconButton>
                </Typography></div>
            <div className="tasksTable">
                <Grid item xs={12} lg={12}>
                <Typography variant="h6" className={classes.title}>
                &nbsp;Customer Feedback
                    <IconButton>
                    <AddIcon />
                </IconButton>
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
                            primary="Some bike shop"
                            secondary={secondary ? 'Secondary text' : "horrible service"}
                        />
                        <ListItemSecondaryAction>
                        <Rating name="read only" value={2} readOnly />
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
            <div className="tasksTable">
                <Grid item xs={12} lg={12}>
                <Typography variant="h6" className={classes.title}>
                    &nbsp;Product Defect List
                    <IconButton>
                    <AddIcon />
                </IconButton>
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
                            primary="Product"
                            secondary={secondary ? 'Secondary text' : "punctured tire"}
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
        </div>
    </>
  );
};

export default AdminCustomerRelations;
