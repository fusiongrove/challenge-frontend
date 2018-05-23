import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Save from '@material-ui/icons/Save';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  getUsers,
  addUser,
  editUser,
  deleteUser,
  searchUser
} from "../actions/profile";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class Profile extends React.Component {

  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    this.props.GetUsers();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={6} sm={4}></Grid>
        <Grid item xs={6} sm={2} >
          <Button className={classes.button} variant="raised" size="small" color="primary" onClick={this.handleClickOpen}>
            <Save className={classNames(classes.leftIcon, classes.iconSmall)} />
            Add User
          </Button>
        </Grid>
        <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell></CustomTableCell>
                <CustomTableCell>Name</CustomTableCell>
                <CustomTableCell>Address</CustomTableCell>
                <CustomTableCell>Contact No</CustomTableCell>
                <CustomTableCell>Date of Birth</CustomTableCell>
                <CustomTableCell>Email</CustomTableCell>
                <CustomTableCell></CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.users.map(n => {
                return (
                  <TableRow className={classes.row} key={n._id}>
                    <CustomTableCell>
                    <Avatar aria-label="user" className={classes.button} src={'http://localhost:3030/media/' + n.firstname + n.lastname + '.png'}>
                    </Avatar>
                    </CustomTableCell>
                    <CustomTableCell>{n.firstname + ' ' + n.lastname}</CustomTableCell>
                    <CustomTableCell>{n.address}</CustomTableCell>
                    <CustomTableCell>{n.contact}</CustomTableCell>
                    <CustomTableCell>{n.dob}</CustomTableCell>
                    <CustomTableCell>{n.email}</CustomTableCell>
                    <CustomTableCell>
                      <Button aria-label="edit" className={classes.button} size="small">
                        <EditIcon />
                      </Button>
                      <Button aria-label="delete" className={classes.button} size="small">
                        <DeleteIcon />
                      </Button>
                    </CustomTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        </Grid>
      </Grid>
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Last Name"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Address"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Contact No"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="dob"
            label="Date of Birth"
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
  }
}

let mapStateToProps = (state, props) => {
  return {
    users: state.profile.users
  };
};

let mapDispatchToProps = dispatch => {
  return {
    GetUsers: () => {
      dispatch(getUsers());
    },
    AddUser: data => {
      dispatch(addUser(data));
    },
    EditUser: data => {
      dispatch(editUser(data));
    },
    DeleteUser: data => {
      dispatch(deleteUser(data));
    },
    SearchUser: data => {
      dispatch(searchUser(data));
    },
  };
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

let mycomponent =  withStyles(styles)(Profile);
export default connect(mapStateToProps,mapDispatchToProps)(mycomponent);
