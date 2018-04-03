import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

export default class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type,
      message: this.props.message,
      callbackData: this.props.callbackData
    };

    this.handleCallback = this.handleCallback.bind(this);
  }

  handleCallback(status) {
    this.props.confirmationCallback(status, this.state.callbackData);
  }

  render() {
    const { type, message } = this.state;

    return (
      <div>
        <ModalContainer>
          <ModalDialog className={`app-alert ${type}`}>
            <div className="content">
              <h2 className="alert-heading">
                {
                  (type == 'success') ?
                    'Good Job ! You done it...!' :
                    (type == 'info') ?
                      'For Your Infomation...' :
                      (type == 'warning') ?
                        'Please Consider...' :
                        (type == 'danger') ?
                          'Oops...!' : 'Alert...,'
                }
              </h2>
              <p className="alert-message">{message}</p>
              <div className="alert-footer">
                <button className="btn btn-yes" onClick={() => { this.handleCallback('yes'); }}>Yes</button>
                <button className="btn btn-no" onClick={() => { this.handleCallback('no'); }}>No</button>
              </div>
            </div>
          </ModalDialog>
        </ModalContainer>
      </div>
    );
  }
}
