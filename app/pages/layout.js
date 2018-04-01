import React from 'react';
import PropTypes from 'prop-types';
import '../assets/scss/index.scss';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

