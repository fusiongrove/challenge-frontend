import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
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
    marginTop: 20
  }
});

class AddUser extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={5}>
              <Dropzone
                style={{ width: 200, height: 170 }}
                onDrop={this.props.onDrop}
                multiple={false}
                accept="image/*"
              >
                <img
                  style={{ width: 200, height: 170 }}
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
                error={false}
                onChange={this.props.handleChange('fname')}
              />
              <TextField
                required
                margin="dense"
                id="lname"
                label="Last Name"
                type="text"
                fullWidth
                onChange={this.props.handleChange('lname')}
                error={false}
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
                error={false}
                onChange={this.props.handleChange('dob')}
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
                error={false}
                onChange={this.props.handleChange('address')}
              />
              <Grid container spacing={24}>
                <Grid item xs={4}>
                  <TextField
                    id="country_code"
                    select
                    value={this.props.ccode}
                    onChange={this.props.handleChange('ccode')}
                    margin="normal"
                    className={classes.margin}
                  >
                    {CCode.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    margin="dense"
                    id="contactNo"
                    label="Contact No"
                    type="text"
                    pattern="^[0-9]*$"
                    error={false}
                    onChange={this.props.handleChange('contact')}
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
                error={false}
                onChange={this.props.handleChange('email')}
              />
            </Grid>
          </Grid>
    </div>
    );
  }
}

AddUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddUser);
