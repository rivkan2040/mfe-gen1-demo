import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles({
  appBar: {
    backgroundColor: '#0b5ed7',
  },
  title: {
    marginInlineStart: 12,
  },
});

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Hidden mdUp>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Grid>
          <Grid item>
            <Typography variant="h6" className={classes.title}>
              צירופי קליטה - ניהול מסמכים
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
