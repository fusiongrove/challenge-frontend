import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import countryCodes from './../../../constants/country_codes';
import {
    addUser,
    addUserSuccess,
    addUserFailed,
    editUser
} from './../actions';
import {
    makeSelectAddUserSuccess,
    makeSelectAddUserFailed,
    makeSelectEditUserSuccess,
    makeSelectEditUserFailed,
} from './../selectors';

export class NewUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                first_name: '',
                last_name: '',
                email: '',
                country_code: '',
                phone: '',
                address: '',
                dob: ''
            },
            showErrorMessage: false,
            errorMessage: '',
        };

        this.onClose = this.onClose.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addFormData = this.addFormData.bind(this);
    }

    componentDidMount() {
        const { userToEdit: { first_name, last_name, email, country_code, phone, address, dob, _id }} = this.props;
        const formData = {
            _id,
            first_name,
            last_name,
            email,
            country_code,
            phone,
            address,
            dob: moment(dob).format('YYYY-MM-DD')
        };
        this.setState({ formData });
    }

    componentWillReceiveProps(np) {
        if (np.userAdded || np.userEdited) {
            this.props.onRequestClose();
        }
    }

    onClose() {
        this.props.onRequestClose();
    }

    addFormData(e, type) {
        const { formData } = this.state;

        formData[type] = e.target.value;
        this.setState({ formData });
    }

    setErrorMessage(showErrorMessage, errorMessage) {
        this.setState({ showErrorMessage, errorMessage });
    }

    validateForm(form) {
        const { first_name, last_name, email } = form;

        if (!first_name) {
            this.setErrorMessage(true, 'Please enter First Name');
            return false;
        }
        if (!last_name) {
            this.setErrorMessage(true, 'Please enter Last Name');
            return false;
        }
        if (!email) {
            this.setErrorMessage(true, 'Please enter Email');
            return false;
        }
        this.setErrorMessage(false, '');
        return true;
    }

    onSubmit(e) {
        e.preventDefault();
        const { formData } = this.state;
        const { action } = this.props;

        if (this.validateForm(formData)) {
            if (action === 'add') {
                this.props.addUser(formData);
            } else {console.log('formData', formData)
                this.props.editUser(formData);
            }
        }
    }

    render() {
        // country codes
        const countryCodeList = countryCodes.map(country => {
            const { code } = country;
            return (
                <option value={code} key={code}>{code}</option>
            );
        });

        const { showErrorMessage, errorMessage, formData } = this.state;
        const { action } = this.props;
        const { first_name, last_name, email, country_code, phone, address, dob } = formData;
        return (
            <div className="modal-form-wrapper add-new-user" role="document">
                <div className="header-wrapper">
                    <h4 className="title" id="exampleModalLabel">{ action } User</h4>
                </div>
                <div className="body-wrapper">
                    <form onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="data-key" htmlFor="">First Name</label>
                                    <input type="text" className="data-input form-control" value={ first_name }
                                        onChange={ e => { this.addFormData(e, 'first_name') }} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="data-key" htmlFor="">Last Name</label>
                                    <input type="text" className="data-input form-control" value={ last_name } 
                                        onChange={ e => { this.addFormData(e, 'last_name') }} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="data-key" htmlFor="">Email</label>
                                    <input type="email" className="data-input form-control" value={ email }
                                        onChange={ e => { this.addFormData(e, 'email') }} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="data-key" htmlFor="">Address</label>
                                    <input type="text" className="data-input form-control" value={ address } 
                                        onChange={ e => { this.addFormData(e, 'address') }} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label className="data-key" htmlFor="">Code</label>
                                    <select className="data-input form-control" onChange={ e => { this.addFormData(e, 'country_code') }} value={ country_code } >
                                        <option value="">--</option>
                                        {
                                            countryCodeList
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className="form-group">
                                    <label className="data-key" htmlFor="">Phone</label>
                                    <input type="number" className="data-input form-control" value={ phone }
                                        onChange={ e => { this.addFormData(e, 'phone') }} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="data-key" htmlFor="">DOB</label>
                                    <input type="date" className="data-input form-control" value={ dob }
                                        onChange={ e => { this.addFormData(e, 'dob') }} />
                                </div>
                            </div>
                            {
                                showErrorMessage &&
                                <p className="info-message danger">{errorMessage}</p>
                            }
                        </div>
                        <div className="actions-wrapper">
                            <div className="row">
                                <div className="col-sm-6">
                                    <button type="button" className="btn btn-danger" 
                                        data-dismiss="modal" onClick={this.onClose} >
                                        Cancel
                                    </button>
                                </div>
                                <div className="col-sm-6">
                                    <button type="submit" className="btn btn-success">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

NewUser.propTypes = {
    addUser: PropTypes.func,
    userAdded: PropTypes.bool,
    addUserError: PropTypes.string,
    editUser: PropTypes.func,
    userEdited: PropTypes.bool,
    editUserError: PropTypes.string,
};

NewUser.defaultProps = {
    userAdded: false,
    addUserError: null,
    userEdited: false,
    editUserError: null,
};

const mapStateToProps = createStructuredSelector({
    userAdded: makeSelectAddUserSuccess(),
    addUserError: makeSelectAddUserFailed(),
    userEdited: makeSelectEditUserSuccess(),
    editUserError: makeSelectEditUserFailed(),
});

const mapDispatchToProps = (dispatch) => ({
    addUser: user => {
        dispatch(addUser(user));
    },
    editUser: user => {
        dispatch(editUser(user));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
