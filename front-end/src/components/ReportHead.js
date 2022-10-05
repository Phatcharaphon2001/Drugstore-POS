import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(8),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function AutoGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs>
          <Paper className={classes.paper}>Products Selling:</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>Total Sales:</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>Profit:</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
