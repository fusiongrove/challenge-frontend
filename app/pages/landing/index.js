import React from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: []
    };

    this.handleEditUser = this.handleEditUser.bind(this);
  }

  getUsersList() {
    const { usersList } = this.state;

  }

  handleEditUser() {
  }

  render() {
    const { isOnEditUser, usersList } = this.state;

    const usersMap = usersList.map((user, key) => {
      <div className="user-block">
        <div className="avatar-wrapper">
          <img src="" className="img-responsive"/>
        </div>
        <div className="content-wrapper">

        </div>
      </div>
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="heading">ReactJS Challenge -fusiongrove</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <section className="dashboard">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="title">Users List</h3>
                  <button className="btn btn-info" onClick={this.handleEditUser}>Add User</button>
                </div>
                <div className="panel-body">
                  Panel content
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

