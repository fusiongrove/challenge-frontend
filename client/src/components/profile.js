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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogUser from './dialogUser';
import {
  getUsers,
  addUser,
  editUser,
  deleteUser,
  searchUser,
  uploadPic
} from "../actions/profile";

const ProfileService = 'http://localhost:3030';

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
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 50,
    height: 50,
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

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const errorLog = {};

function validateForm(data) {
  if(data.fname === "") {
    console.log("*first name cannot be empty");
    errorLog.fnameError = true;
    return false;
  }

  if(data.lname === "") {
    console.log("*last name cannot be empty");
    errorLog.lnameError = true;
    return false;
  }

  if(data.address === "") {
    console.log("*address cannot be empty");
    errorLog.addressError = true;
    return false;
  }

  if(data.contact === "") {
    console.log("*contact no cannot be empty");
    errorLog.connectError = true;
    return false;
  }
  else if(isNaN(data.contact)||data.contact.indexOf(" ")!==-1) {
    console.log("*enter numeric value");
    errorLog.connectError = true;
    return false;
  }

  if(data.dob === "") {
    console.log("*date of birth cannot be empty");
    errorLog.dobError = true;
    return false;
  }

  if(data.email === "") {
    console.log("*email cannot be empty");
    errorLog.emailError = true;
    return false;
  }
  else if (!validateEmail(data.email)) {
    console.log("*email is not valid");
    errorLog.emailError = true;
    return false;
  }

  else {
    return true;
  }
};

class Profile extends React.Component {

  constructor() {
    super();
    this.state = {
      open: false,
      id: "",
      fname: "",
      lname:"",
      dob:"",
      address:"",
      ccode: "+94",
      contact:"",
      email:"",
      image: "",
      thumbImage:"",
      type: "",
      errorStatus: {},
      openDeleteAlert: false,
      openEditAlert: false,
      deleteId: ""
    };
  }

  componentDidMount() {
    this.props.GetUsers();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onDrop = files => {
    let file = files[0];
    this.setState({
      files: file,
      thumbImage: files[0].preview,
      filename:file.name
    });
    this.props.uploadPic({file:file});
  };

  handleClickOpen = (type, data) => {
    if(type === 'add'){
      this.setState({
        type: "Add New ",
        id: "",
        fname: "",
        lname:"",
        dob:"",
        address:"",
        ccode: "+94",
        contact:"",
        email:"",
        image: "",
        thumbImage:"",
        open: true
      });
    } else {
      this.setState({
        type: "Update ",
        id: data._id,
        fname: data.firstname,
        lname: data.lastname,
        dob: data.dob,
        address: data.address,
        ccode: data.ccode,
        contact: data.contact,
        email: data.email,
        image: data.image,
        thumbImage: this.state.thumbImage,
        open: true,
      });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    if(this.state.type === "Add New ") {

      const data = {
        fname: this.state.fname,
        lname: this.state.lname,
        address: this.state.address,
        contact: this.state.contact,
        dob: this.state.dob,
        email: this.state.email
      };

      if(validateForm(data)){
        this.setState({ open: false });
        this.props.AddUser({
          fname: this.state.fname,
          lname: this.state.lname,
          address: this.state.address,
          ccode: this.state.ccode,
          contact: this.state.contact,
          dob: this.state.dob,
          email: this.state.email,
          image: this.state.filename
        });
      } else {
        this.setState({errorStatus: errorLog});
      }

    } else if (this.state.type === "Update ") {
        this.setState({
          open: false,
          openEditAlert: true
        });
    }
  };

  handleClickOpenDeleteAlert = id => {
    this.setState({ openDeleteAlert: true });
    this.setState({deleteId: id});
  };

  handleCloseDeleteAlert = () => {
    this.setState({ openDeleteAlert: false });
  };

  handleClickDelete = id => {
    this.props.DeleteUser({id: id});
    this.setState({ openDeleteAlert: false });
  };

  handleCloseEditAlert = () => {
    this.setState({ openEditAlert: false });
  };

  handleClickEdit = id => {
    this.props.DeleteUser({id: id});
    this.setState({ openEditAlert: false });
    this.props.EditUser({
      id: this.state.id,
      firstname: this.state.fname,
      lastname: this.state.lname,
      address: this.state.address,
      ccode: this.state.ccode,
      contact: this.state.contact,
      dob: this.state.dob,
      email: this.state.email,
      image: this.state.filename
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={6} sm={4}></Grid>
        <Grid item xs={6} sm={2} >
          <Button className={classes.button} variant="raised" size="small" color="primary" onClick={() => this.handleClickOpen('add', null)}>
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
                      <Avatar
                        src={`${ProfileService}/media/` + n.image}
                        className={classNames(classes.avatar, classes.bigAvatar)}
                      />
                    </CustomTableCell>
                    <CustomTableCell>{n.firstname + ' ' + n.lastname}</CustomTableCell>
                    <CustomTableCell>{n.address}</CustomTableCell>
                    <CustomTableCell>{n.ccode + n.contact}</CustomTableCell>
                    <CustomTableCell>{n.dob}</CustomTableCell>
                    <CustomTableCell>{n.email}</CustomTableCell>
                    <CustomTableCell>
                      <Button aria-label="edit" className={classes.button} size="small" onClick={() => this.handleClickOpen('edit', n)}>
                        <EditIcon />
                      </Button>
                      <Button aria-label="delete" className={classes.button} size="small" onClick={() => this.handleClickOpenDeleteAlert(n._id)}>
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
        <DialogTitle id="form-dialog-title">{this.state.type} User</DialogTitle>
        <DialogContent>
          <DialogUser
            handleChange={this.handleChange}
            onDrop={this.onDrop}
            thumbImage={this.state.thumbImage}
            id={this.state.id}
            fname={this.state.fname}
            lname={this.state.lname}
            dob={this.state.dob}
            address={this.state.address}
            ccode={this.state.ccode}
            contact={this.state.contact}
            email={this.state.email}
            image={this.state.image}
            errorStatus={this.state.errorStatus}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="secondary" variant="raised">
            Cancel
          </Button>
          <Button onClick={this.handleSave} color="primary" variant="raised">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={this.state.openDeleteAlert}
        onClose={this.handleCloseDeleteAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete User"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseDeleteAlert} color="primary">
            No
          </Button>
          <Button onClick={() => this.handleClickDelete(this.state.deleteId)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={this.state.openEditAlert}
        onClose={this.handleCloseEditAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Update User"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to edit this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseEditAlert} color="primary">
            No
          </Button>
          <Button onClick={() => this.handleClickEdit()} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
  }
}

let mapStateToProps = (state, props) => {
  return {
    users: state.profile.users,
    newUserDetails: state.profile.newUserDetails
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
    uploadPic:data=>{
      dispatch(uploadPic(data));
    }
  };
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

let mycomponent =  withStyles(styles)(Profile);
export default connect(mapStateToProps,mapDispatchToProps)(mycomponent);
