import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReactModal from 'react-modal';
import moment from 'moment';
import {
    getUsers,
    getUsersInProgress,
    getUsersSuccess,
    getUsersFailed,
    deleteUser,
} from './../actions';
import {
    makeSelectGetAllUsers,
    makeSelectGetAllUsersFailed,
    makeSelectAddUserSuccess,
    makeSelectEditUserSuccess,
    makeSelectDeleteUserSuccess,
    makeSelectDeleteUserFailed,
} from './../selectors';
import NewUser from './../add_user';
import ImageUploader from 'react-images-upload';

export class ListUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddUserPopup: false,
            showImagePopup: false,
            userAction: 'add',
            userToEdit: {}
        };

        this.onAddNewUser = this.onAddNewUser.bind(this);
        this.hideAddUserPopup = this.hideAddUserPopup.bind(this);
        this.onImageUpload = this.onImageUpload.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount() {
        this.props.getUsers();
    }

    componentWillReceiveProps(np) {
        if (np.userAdded || np.userEdited) {
            this.setState({ showAddUserPopup: false });
            this.props.getUsers();
        }
        if (np.userDeleted) {
            this.props.getUsers();
        }
    }

    onAddNewUser() {
        this.setState({ showAddUserPopup: true, userAction: 'add' });
    }

    hideAddUserPopup() {
        this.setState({ showAddUserPopup: false });
    }

    // delete user
    onDelete(userId) {
        const confirm = window.confirm('Are you sure?');

        if (confirm) {
            this.props.deleteUser(userId);
        }
    }

    // edit user
    onEdit(user) {
        this.setState({ 
            showAddUserPopup: true,
            userAction: 'edit',
            userToEdit: user
        });
    }

    onImageUpload() {
        this.setState({ showImagePopup: true });
    }

    onDrop(picture) {
        console.log('heloo', picture)
    }

    render() {
        const { showAddUserPopup, userAction, userToEdit, showImagePopup } = this.state;
        const { listOfUsers }  = this.props;

        // make user list
        const usersList = listOfUsers.map(user => {
            const { first_name, last_name, email, country_code, phone, address, dob} = user;
            return (
                <tr key={user._id}>
                    <td><img width="50" src="http://via.placeholder.com/50x50" onClick={ this.onImageUpload } /></td>
                    <td>{ first_name }</td>
                    <td>{ last_name }</td>
                    <td>{ email }</td>
                    <td>{ country_code }{ phone }</td>
                    <td>{ moment(dob).format('DD/MM/YYYY') }</td>
                    <td>
                        <button onClick={ this.onEdit.bind(this, user) }>Edit</button> | 
                        <button onClick={ this.onDelete.bind(this, user._id) }>Delete</button>
                    </td>
                </tr>
            );
        });

        return (
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="my-4">Users</h1>
                    <button className="button btn-add-new-user" onClick={ this.onAddNewUser }>+Add</button>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>DOB</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                               usersList
                            }
                        </tbody>
                    </table>
                </div>
                <ReactModal isOpen={ showAddUserPopup }>
                    <NewUser 
                        onRequestClose={ this.hideAddUserPopup }
                        action={ userAction }
                        userToEdit={ userToEdit }
                    />
                </ReactModal>

                <ReactModal isOpen={ showImagePopup }>            
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    />
                </ReactModal>
            </div>
        )
    }
}

ListUsers.propTypes = {
    getUsers: PropTypes.func,
    listOfUsers: PropTypes.array,
    listUsersError: PropTypes.string,
    userAdded: PropTypes.bool,
    userEdited: PropTypes.bool,
    deleteUser: PropTypes.func,
    userDeleted: PropTypes.bool,
    deleteUserError: PropTypes.string
};

ListUsers.defaultProps = {
    listOfUsers: [],
    listUsersError: null,
    userAdded: false,
    userEdited: false,
    deleteUserError: null,
};

const mapStateToProps = createStructuredSelector({
    listOfUsers: makeSelectGetAllUsers(),
    userAdded: makeSelectAddUserSuccess(),
    userEdited: makeSelectEditUserSuccess(),
    userDeleted: makeSelectDeleteUserSuccess(),
    deleteUserError: makeSelectDeleteUserFailed(),
});

const mapDispatchToProps = (dispatch) => ({
    getUsers: () => {
        dispatch(getUsers());
    },
    deleteUser: id => {
        dispatch(deleteUser(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);
