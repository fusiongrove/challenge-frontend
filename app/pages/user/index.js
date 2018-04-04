import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'array-index-of-property';
import 'react-datepicker/src/stylesheets/datepicker.scss';

import ImageCropper from '../../components/ImageCropper';
import defaultAvatar from '../../assets/images/default_avatar.jpeg';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        first_name: '',
        last_name: '',
        address: '',
        region: '0',
        country: '0',
        calling_code: '0',
        contact_number: '',
        email: '',
        dob: null,
        avatar: defaultAvatar,
      },
      countries: [],
      calling_codes: [],
      imagePreviewUrl: null,
      isOnCropping: false,
      error: {
        isVisible: false,
        message: ''
      }
    };

    this.slug = props.params.slug;
    if (this.slug) {
      const usersList = helpers.storageHelper.getFromStorage('users-list');
      this.storageUser = usersList.filter((userIndex) => {
        return userIndex.slug == this.slug;
      });
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleImageCrop = this.handleImageCrop.bind(this);
  }

  componentWillMount() {
    if (this.slug && this.storageUser[0]) {
      helpers.httpHelper.get(`https://restcountries.eu/rest/v2/region/${this.storageUser[0].region}`)
        .then((response) => {
          const selectedCountry = response.filter((element) => {
            return element.name == this.storageUser[0].country;
          });

          const _calling_codes = selectedCountry[0].callingCodes;
          this.setState({countries: response, calling_codes: _calling_codes});
        });
    }
  }

  componentDidMount() {
    if (this.slug) {
      const usersList = helpers.storageHelper.getFromStorage('users-list');
      const storageUser = usersList.filter((userIndex) => {
        return userIndex.slug == this.slug;
      });

      if (storageUser.length <= 0) {
        window.location.href = "/";
      }

      storageUser[0].dob = moment(storageUser[0].dob);
      this.setState({user: storageUser[0]});
    }
  }

  handleChange(event) {
    const _user = this.state.user;
    const _error = this.state.error;
    _user[event.target.name] = event.target.value;

    if (_error.isVisible) {
      _error.isVisible = false;
      _error.message = '';

      this.setState({error: _error});
    }

    this.setState({user: _user});

    if (event.target.name == 'region') {
      helpers.httpHelper.get(`https://restcountries.eu/rest/v2/region/${event.target.value}`)
        .then((response) => {
          this.setState({countries: response, user: _user});
        });
    }

    if (event.target.name == 'country') {
      const selectedCountry = this.state.countries.filter((element) => {
        return element.name == event.target.value;
      });

      const _calling_codes = selectedCountry[0].callingCodes;
      this.setState({calling_codes: _calling_codes});
    }

  }

  handleDateChange(date) {
    const _user = this.state.user;
    const _error = this.state.error;

    if (_error.isVisible) {
      _error.isVisible = false;
      _error.message = '';

      this.setState({error: _error});
    }

    _user.dob = date;
    this.setState({user: _user});
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        isOnCropping: true,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  handleImageCrop(url) {
    const _user = this.state.user;
    _user.avatar = url;

    helpers.uploadHelper.upload(url)
      .then((response) => {
        _user.avatar = response.secure_url;
        this.setState({
          user: _user,
          isOnCropping: false
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    const slug = this.slug;
    let usersList = helpers.storageHelper.getFromStorage('users-list');
    usersList = (usersList) ? usersList : [];

    const user = this.state.user;
    if (!slug) {
      user.slug = helpers.utilsHelper.generateSlug(20);
    }

    const storageUser = usersList.filter((userIndex) => {
      if (slug) {
        return userIndex.slug == user.slug;
      }
      return userIndex.email == user.email;
    });

    const isValidNumber = (val) => {
      if ((val.length >= 9 && val.length < 15 )&& !isNaN(val)) {
        return true;
      } else {
        return false
      }
    };


    if (!slug && storageUser && storageUser.length > 0) {
      this.setState({
        error: {
          isVisible: true,
          message: 'This email is already exist in the storage'
        }
      });

      return;
    }

    if (user.avatar == defaultAvatar) {
      this.setState({
        error: {
          isVisible: true,
          message: 'Please upload your photo to proceed'
        }
      });

      return;
    }

    if (user.region == '0') {
      this.setState({
        error: {
          isVisible: true,
          message: 'Please choose your region to proceed'
        }
      });

      return;
    }

    if (!user.dob || user.dob == '') {
      this.setState({
        error: {
          isVisible: true,
          message: 'Please select your date of birth to proceed'
        }
      });

      return;
    }

    if (user.country == '0') {
      this.setState({
        error: {
          isVisible: true,
          message: 'Please choose your country to proceed'
        }
      });
    }

    if (user.calling_code == '0') {
      this.setState({
        error: {
          isVisible: true,
          message: 'Please choose your calling code to proceed'
        }
      });

      return;
    }

    if (!isValidNumber(user.contact_number)) {
      this.setState({
        error: {
          isVisible: true,
          message: 'Please enter a valid contact number'
        }
      });

      return;
    }

    if (slug) {
      const userIndex = usersList.indexOfProperty('slug', this.slug);
      usersList[userIndex] = user;
    } else {
      usersList.push(user);
    }

    helpers.storageHelper.addToStorage('users-list', usersList);
    window.location.href = "/";

  }

  render() {
    const {user, countries, calling_codes, imagePreviewUrl, isOnCropping, error} = this.state;

    const countriesMap = countries.map((country, key) => {
      return <option value={country.name} key={key}>{country.name}</option>
    });

    const callingCodesMap = calling_codes.map((cc, key) => {
      return <option value={cc} key={key}>+ {cc}</option>
    });


    return (
      <div className="container user-page">
        <div className="row">
          <div className="col-md-6 col-wrapper">
            <h3 className="form-title">{ (this.slug) ? 'What to update your profile' : 'Create your profile' }</h3>
            <div className="edit-user-wrapper">
              <div className="row">
                <div className="col-sm-12 upload-wrapper">
                  <div className="custom-file-upload">
                    <img src={user.avatar}
                         className="img-responsive img-circle avatar"/>
                    <label className="btn btn-choose">
                      Choose Image
                      <input type="file" onChange={this.handleImageChange}/>
                    </label>
                    {
                      (isOnCropping && imagePreviewUrl) ?
                        <ImageCropper handleCrop={this.handleImageCrop} previewImage={imagePreviewUrl}/> : null
                    }
                  </div>
                </div>
              </div>
              <form className="edit-user-form" onSubmit={this.handleSubmit}>
                <div className="row form-row">
                  <div className="col-sm-6">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" name="first_name" placeholder="First Name"
                           onChange={this.handleChange} value={user.first_name} required={true}/>
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="last_name" placeholder="Last Name"
                           onChange={this.handleChange} value={user.last_name} required={true}/>
                  </div>
                </div>
                <div className="row form-row">
                  <div className="col-sm-7">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" placeholder="Email"
                           onChange={this.handleChange} value={user.email} disabled={(this.slug)} required={true}/>
                  </div>
                  <div className="col-sm-5">
                    <label className="form-label">Date of Birth</label>
                    <DatePicker selected={user.dob} placeholderText="MM/DD/YYYY" className="form-control" showYearDropdown
                                maxDate={moment().subtract(1, "date")} onChange={this.handleDateChange} onChangeRaw={(e) => {e.preventDefault()}}/>
                  </div>
                </div>
                <div className="row form-row">
                  <div className="col-sm-12">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" placeholder="Address"
                           onChange={this.handleChange} value={user.address} required={true}/>
                  </div>
                </div>
                <div className="row form-row">
                  <div className="col-sm-5">
                    <label className="form-label">Region</label>
                    <select name="region" className="form-control" onChange={this.handleChange} value={user.region}>
                      <option value="0">Choose Region</option>
                      <option value="africa">Africa</option>
                      <option value="americas">America</option>
                      <option value="asia">Asia</option>
                      <option value="europe">Europe</option>
                      <option value="oceania">Oceania</option>
                    </select>
                  </div>
                  <div className="col-sm-7">
                    <label className="form-label">Country</label>
                    <select name="country" className="form-control" onChange={this.handleChange} value={user.country}>
                      <option value="0">Choose Country</option>
                      {countriesMap}
                    </select>
                  </div>
                </div>
                <div className="row form-row">
                  <div className="col-sm-12">
                    <label className="form-label">Contact Number</label>
                    <div className="input-group">
                      <div className="input-group-btn">
                        <select name="calling_code" className="form-control" onChange={this.handleChange}
                                value={user.calling_code}>
                          <option value="0">Calling Code</option>
                          {callingCodesMap}
                        </select>
                      </div>
                      <input type="text" className="form-control" name="contact_number" placeholder="Contact Number"
                             onChange={this.handleChange} value={user.contact_number} required={true}/>
                    </div>
                  </div>
                </div>
                {
                  (error.isVisible) ?
                    <div className="row form-row">
                      <div className="col-sm-12">
                        <p className="error">{error.message}</p>
                      </div>
                    </div> : null
                }
                <div className="row">
                  <div className="col-sm-12 actions-wrapper">
                    <button type="button" className="btn btn-back" onClick={() => {
                      window.location.href = "/";
                    }}>Back
                    </button>
                    <button type="submit"
                            className="btn btn-submit">{(this.props.params.slug) ? 'Update' : 'Save'}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}