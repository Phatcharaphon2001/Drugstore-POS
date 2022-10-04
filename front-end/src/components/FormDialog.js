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
import tasks from "../pages/Sales";
import CRUDTable,
{
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  let count = tasks.length;
  

  const service = {
    fetchItems: (payload) => {
      let result = Array.from(tasks);
      return Promise.resolve(result);
    },
    create: (task) => {
      count += 1;
      tasks.push({
        ...task,
        id: count,
      });
      return Promise.resolve(task);
    }
  }

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
    <DialogTitle id="form-dialog-title">Add a new Product</DialogTitle>
    <DialogContent 
            validate={(values) => {
              const errors = {};
              if (!values.title) {
                errors.title = 'Please, provide task\'s title';
              }
    
              if (!values.description) {
                errors.description = 'Please, provide task\'s description';
              }
    
              return errors;
            }}>
      <MuiGrid container spacing={10}>
        
        <MuiGrid item xs={10}>
          <FormGroup  caption="Tasks"
          fetchItems={payload => service.fetchItems(payload)}>
            <TextField
               name="id"
               label="Id"
               hideInCreateForm
               readOnly
       
            />
            <TextField
              name="title"
              label="Title"
              placeholder="Title"
       
            />
            <TextField
              name="description"
              label="Description"
            />
            <TextField
              margin="normal"
              name="sell"
              label="Sell"
            />
          </FormGroup>
        </MuiGrid>
      </MuiGrid>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancelChanges} color="secondary">
        Cancel
      </Button>
      <Button onSubmit={task => service.create(task)} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
    </div>
  );
}
