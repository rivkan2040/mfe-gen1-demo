import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    paddingInlineStart: theme.spacing(2),
  },
}));

const NAV_ITEMS = [
  { label: 'תיק תביעה', path: '/claims' },
  { label: 'דף הבית', path: '/' },
];

function Sidebar() {
  const classes = useStyles();

  return (
    <Hidden smDown>
      <Grid container direction="column" className={classes.drawer}>
        {NAV_ITEMS.map((item) => (
          <Grid item key={item.path} className={classes.item}>
            <List>
              <ListItem button>
                <ListItemText primary={item.label} />
              </ListItem>
            </List>
          </Grid>
        ))}
      </Grid>
    </Hidden>
  );
}

export default Sidebar;
