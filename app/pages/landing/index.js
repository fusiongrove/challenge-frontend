import React from 'react';

import ConfirmationModal from "../../components/ConfirmationModal";

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      isConfirmationRequired: false,
      confirmationModalData: {
        type: '',
        message: '',
        callbackData: {}
      }
    };

    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.confirmationCallback = this.confirmationCallback.bind(this);
  }

  componentDidMount() {
    const _usersList = helpers.storageHelper.getFromStorage('users-list');
    if (_usersList) {
      this.setState({ usersList: _usersList });
    }
  }

  handleEditUser(slug) {
    const redirectUrl = (slug) ? `/user/${slug}` : '/user';
    window.location.href = redirectUrl;
  }

  handleDeleteUser(slug) {
    const usersList = this.state.usersList;
    const userIndex = usersList.indexOfProperty('slug', slug);

    this.setState({
      isConfirmationRequired: true,
      confirmationModalData: {
        type: 'warning',
        message: `Are you sure to delete ${usersList[userIndex].first_name}'s profile?`,
        callbackData: { slug: slug }
      }
    });
  }

  confirmationCallback(status, data) {
    if (status == 'yes') {
      const usersList = this.state.usersList;
      const userIndex = usersList.indexOfProperty('slug', data.slug);

      usersList.splice(userIndex, 1);
      helpers.storageHelper.addToStorage('users-list', usersList);
      this.setState({ usersList: usersList });
    }

    this.setState({
      isConfirmationRequired: false,
      confirmationModalData: {
        type: '',
        message: '',
        callbackData: {}
      }
    });
  }

  render() {
    const { usersList, isConfirmationRequired, confirmationModalData } = this.state;

    const usersMap = usersList.map((user, key) => {
      return (
        <div className="user-block" key={key}>
          <div className="avatar-wrapper">
            <img src={user.avatar} className="img-responsive avatar"/>
          </div>
          <div className="content-wrapper">
            <div className="data-row">
              <label className="tag-name">Name</label>
              <label className="tag-value">{ user.first_name } { user.last_name }</label>
            </div>
            <div className="data-row">
              <label className="tag-name">Email</label>
              <label className="tag-value">{ user.email }</label>
            </div>
            <div className="data-row">
              <label className="tag-name">Address</label>
              <label className="tag-value">{ user.address }, { user.country }</label>
            </div>
            <div className="data-row">
              <label className="tag-name">Contact Number</label>
              <label className="tag-value">+{ user.calling_code } { user.contact_number }</label>
            </div>
          </div>
          <div className="actions-wrapper">
            <button className="btn btn-update" onClick={() => { this.handleEditUser(user.slug) }}>Update</button>
            <button className="btn btn-delete" onClick={() => { this.handleDeleteUser(user.slug) }}>Delete</button>
          </div>
        </div>
      );
    });

    return (
      <div className="container landing-page">
        <div className="row">
          <div className="col-sm-12">
            <section className="dashboard">
              <div className="users-list-wrapper">
                <div className="inner-header">
                  <h3 className="title">ReactJS Challenge -fusiongrove</h3>
                </div>
                <div className="content-wrapper">
                  <div className="row">
                    <div className="col-sm-12">
                      <button className="btn btn-add-user pull-right" onClick={() => { this.handleEditUser() }}>Create User</button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      {
                        (!usersList || usersList.length == 0) ?
                          <div className="no-users-wrapper">
                            <p className="no-users">No users found to display.</p>
                          </div> : <div className="users-list"> { usersMap }</div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {
          (isConfirmationRequired) ?
            <ConfirmationModal
              type={ confirmationModalData.type }
              message={ confirmationModalData.message }
              callbackData={ confirmationModalData.callbackData }
              confirmationCallback={this.confirmationCallback}
            /> : null
        }

      </div>
    );
  }
}

