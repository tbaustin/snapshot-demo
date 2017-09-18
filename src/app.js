import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { Home } from './components/layout';
import store from './stores';

class App extends Component {
  render() {
    return (
      <Provider store={store.configureStore()}>
        <Home />
      </Provider>
    );
  }
}

render(<App />, document.querySelector('#root'));
