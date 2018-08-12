import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReactModal from 'react-modal';
import store from './store';
import routes from './routes';
import './assets/styles/main.scss';

ReactModal.setAppElement('#the_game_container');

render(
    <Provider store={store}>{routes}</Provider>,
    document.getElementById('the_game_container')
);
