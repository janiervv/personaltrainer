import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';



export default function Addtraining(props){


    const [open, setOpen] = React.useState(false);
    const [training, addTraining] = React.useState({
        date: '', customer: props.url, activity: '', duration: ''
    });
    const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange= (event) => {
        addTraining({...training, [event.target.name]:event.target.value })
    }


    const addNewTraining = () => {
        
      fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body:
      JSON.stringify({
          "date":  selectedDate.toISOString(),
          "activity": training.activity,
          "duration"  : training.duration,
          "customer" :  props.url
      })
  })
      .then(res => props.getData())
      .catch(err => console.error(err))
      handleClose()
  }

  const handleDateChange = date => {
    setSelectedDate(date);
  };

    return(
        <div>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          New training for customer
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New training</DialogTitle>
          <DialogContent>

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>

            <TextField
              margin="dense"
              name="activity"
              value={training.activity}
              label="Activity"
              onChange={e => handleInputChange(e)}
              fullWidth
            />

            <TextField
              margin="dense"
              name="duration"
              value={training.duration}
              label="Duration"
              onChange={e => handleInputChange(e)}
              fullWidth
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={addNewTraining} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}