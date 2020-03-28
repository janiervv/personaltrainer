import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';



export default function Editcustomer(props){

    const [open, setOpen] = React.useState(false);
    const [customer, addCustomer] = React.useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: ''
    });

    const handleClickOpen = () => {
      addCustomer({
        firstname: props.customers.firstname, 
        lastname: props.customers.lastname, 
        streetaddress: props.customers.streetaddress, 
        postcode: props.customers.postcode, 
        city: props.customers.city, 
        email: props.customers.email
      })
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange= (event) => {
        addCustomer({...customer, [event.target.name]:event.target.value })
    }

    const updateCustomer = () => {
      console.log(props.customers)
      props.updateCustomer(customer, props.customers.links[0].href);
      handleClose();
    }

    return(
        <div>
        <Button variant="contained" size="small" color="primary" onClick={handleClickOpen}>
          Edit
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit customer</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="firstname"
              value={customer.firstname}
              label="First name"
              onChange={e => handleInputChange(e)}
              fullWidth
            />
            <TextField
              margin="dense"
              name="lastname"
              value={customer.lastname}
              label="Last name"
              onChange={e => handleInputChange(e)}
              fullWidth
            />
            <TextField
              margin="dense"
              name="streetaddress"
              value={customer.streetaddress}
              label="Street Address"
              onChange={e => handleInputChange(e)}
              fullWidth
            />
            <TextField
              margin="dense"
              name="postcode"
              value={customer.postcode}
              label="Postcode"
              onChange={e => handleInputChange(e)}
              fullWidth
            />
            <TextField
              margin="dense"
              name="city"
              value={customer.city}
              label="City"
              onChange={e => handleInputChange(e)}
              fullWidth
            />
            <TextField
              margin="dense"
              name="email"
              value={customer.email}
              label="Email"
              onChange={e => handleInputChange(e)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={updateCustomer} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}