import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dropzone from "react-dropzone";
import Typography from '@material-ui/core/Typography';
import CCode from './countryCode';

const styles = theme => ({
  root: {
    flexGrow: 1,
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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  margin: {
    marginTop: 21
  },
  image: {
    width: 200,
    height: 170
  }
});

class DialogUser extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={5}>
              <Dropzone
                style={classes.image}
                onDrop={this.props.onDrop}
                multiple={false}
                accept="image/*"
              >
                <img
                  style={classes.image}
                  src={this.props.thumbImage}
                />
                <Typography component="p">
                  Try dropping some files here, or click to select files to
                  upload.
                </Typography>
              </Dropzone>
            </Grid>
            <Grid item xs={7}>
              <TextField
                required
                autoFocus
                margin="dense"
                id="fname"
                label="First Name"
                type="text"
                fullWidth
                error={this.props.errorStatus.fnameError}
                onChange={this.props.handleChange('fname')}
                value={this.props.fname}
              />
              <TextField
                required
                margin="dense"
                id="lname"
                label="Last Name"
                type="text"
                fullWidth
                onChange={this.props.handleChange('lname')}
                error={this.props.errorStatus.lnameError}
                value={this.props.lname}
              />
              <TextField
                required
                margin="dense"
                id="dob"
                label="Date of Birth"
                fullWidth
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={this.props.errorStatus.dobError}
                onChange={this.props.handleChange('dob')}
                value={this.props.dob}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ marginTop: 30 }}
                required
                margin="dense"
                id="address"
                label="Address"
                type="text"
                fullWidth
                error={this.props.errorStatus.addressError}
                onChange={this.props.handleChange('address')}
                value={this.props.address}
              />
              <Grid container spacing={24}>
                <Grid item xs={5}>
                  <TextField
                    id="country_code"
                    select
                    value={this.props.ccode}
                    onChange={this.props.handleChange('ccode')}
                    margin="normal"
                    className={classes.margin}
                    fullWidth
                  >
                    {CCode.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    required
                    margin="dense"
                    id="contactNo"
                    label="Contact No"
                    type="text"
                    error={this.props.errorStatus.connectError}
                    onChange={this.props.handleChange('contact')}
                    fullWidth
                    value={this.props.contact}
                  />
                </Grid>
              </Grid>
              <TextField
                required
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
                error={this.props.errorStatus.emailError}
                onChange={this.props.handleChange('email')}
                value={this.props.email}
              />
            </Grid>
          </Grid>
    </div>
    );
  }
}

DialogUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DialogUser);
