import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormGroup from '@mui/material/FormGroup';
import MuiGrid from '@mui/material/Grid';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onCancelChanges = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        +New Item
      </Button>
      <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Employee Details</DialogTitle>
    <DialogContent>
      <MuiGrid container spacing={3}>
        <MuiGrid item xs={6}>
          <FormGroup>
            <TextField
              margin="normal"
              name="productName"
              label="Produc tName"
       
            />
            <TextField
              margin="normal"
              name="catagory"
              label="Catagory"
       
            />
            <TextField
              margin="normal"
              name="cost"
              label="Cost"
            />
            <TextField
              margin="normal"
              name="sell"
              label="Sell"
            />
          </FormGroup>
        </MuiGrid>
        <MuiGrid item xs={6}>
          <FormGroup>
            <TextField
              margin="normal"
              name="lastName"
              label="Last Name"
           
            />

            <TextField
              margin="normal"
              name="phone"
              label="Phone"
        
            />
          </FormGroup>
        </MuiGrid>
      </MuiGrid>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancelChanges} color="secondary">
        Cancel
      </Button>
      <Button onClick={onCancelChanges} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
    </div>
  );
}
