import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/common/header';
import Footer from './components/common/footer';
import { history } from './store';

export default class Layout extends Component {
    constructor(props) {
        super(props);

        this.listenRouteChange = this.listenRouteChange.bind(this);
    }

    componentDidMount() {
        this.listenRouteChange();
    }
    
    listenRouteChange() {
        history.listen(e => {
           this.refs.contentsWindow.scrollTo(0, 0);
        });
    }

    render() {
        return (
          <div>
            <Header />
            <div ref="contentsWindow" className="container">
                {this.props.children}
            </div>
            <Footer />
          </div>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.element.isRequired
};
