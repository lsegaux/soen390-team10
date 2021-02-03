import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

export default function ItemList( {list} ) {
  const classes = useStyles();

  return (
    
    <div className={classes.root}>
      <List component="nav">
      {list.map((element, i) => { return(
      <ListItem key={i} button>
        <ListItemText primary={element.primary} secondary={element.secondary}/>
      </ListItem>
      )})}
      </List>
    </div>
  );
}