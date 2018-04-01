import React from 'react';

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
        calling_codes: '0',
        contact_number: '',
        email: '',
        avatar: defaultAvatar,
      },
      countries: [],
      calling_codes: [],
      imagePreviewUrl: null,
      isOnCropping: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleImageCrop = this.handleImageCrop.bind(this);
  }

  componentDidMount() {
    
  }

  handleChange(event) {
    const _user = this.state.user;
    _user[event.target.name] = event.target.value;

    if (event.target.name == 'region') {
      helpers.httpHelper.get(`https://restcountries.eu/rest/v2/region/${event.target.value}`)
        .then((response) => {
          _user.country = "0";
          this.setState({ countries: response, user: _user });
        });
    }

    if (event.target.name == 'country') {
      const selectedCountry = this.state.countries.filter((element) => {
        return element.name == event.target.value;
      });

      const _calling_codes = selectedCountry[0].callingCodes;
      console.log(_calling_codes);
      this.setState({ calling_codes: _calling_codes});
    }

    this.setState({ user: _user });
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

    this.setState({
      user: _user,
      isOnCropping: false
    });
  }

  render() {
    const { user, countries, calling_codes, imagePreviewUrl, isOnCropping } = this.state;

    const countriesMap = countries.map((country, key) => {
      return <option value={country.name} key={key}>{country.name}</option>
    });

    const callingCodesMap = calling_codes.map((cc, key) => {
      return <option value={cc} key={key}>+ {cc}</option>
    });


    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="edit-user-wrapper">
              <div className="row">
                <div className="col-sm-12">
                  <label className="custom-file-upload">
                    <input type="file" onChange={this.handleImageChange}/>
                    <img src={user.avatar}
                         className="img-responsive img-circle avatar"/>
                    {
                      (isOnCropping && imagePreviewUrl) ?
                        <ImageCropper handleCrop={this.handleImageCrop} previewImage={imagePreviewUrl}/> : null
                    }
                  </label>
                </div>
              </div>
              <form className="edit-user-form">
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
                  <div className="col-sm-12">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" placeholder="Address"
                           onChange={this.handleChange} value={user.address} required={true}/>
                  </div>
                </div>
                <div className="row form-row">
                  <div className="col-sm-6">
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
                  <div className="col-sm-6">
                    <label className="form-label">Country</label>
                    <select name="country" className="form-control" onChange={this.handleChange} value={user.country}>
                      <option value="0">Choose Country</option>
                      { countriesMap }
                    </select>
                  </div>
                </div>
                <div className="row form-row">
                  <div className="col-sm-12">
                    <label className="form-label">Contact Number</label>
                    <div className="input-group">
                      <div className="input-group-btn">
                        <select name="calling_code" className="form-control" value={user.calling_code}>
                          <option value="0">Calling Code</option>
                          { callingCodesMap }
                        </select>
                      </div>
                      <input type="text" className="form-control" name="contact_number" placeholder="Contact Number"
                             onChange={this.handleChange} value={user.contact_number} required={true}/>
                    </div>
                  </div>
                </div>
                <div className="row form-row">
                  <div className="col-sm-12">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" placeholder="Email"
                           onChange={this.handleChange} value={user.email} required={true}/>
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