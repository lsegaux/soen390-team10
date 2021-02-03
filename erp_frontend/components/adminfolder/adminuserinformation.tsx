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
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import EditIcon from '@material-ui/icons/Edit';

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
    
  }));
  
  function generate(element:any) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }


const AdminUserInformation = () => {

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
                &nbsp;User Information
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
                            primary="Example"
                            secondary={secondary ? 'Secondary text' : ""}
                        />
                        <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="edit">
                            <EditIcon />
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

export default AdminUserInformation;
