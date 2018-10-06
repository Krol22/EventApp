import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { store } from './store';
import { EventPage } from './Page/EventPage';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <EventPage></EventPage>
      </Provider>
    );
  }
}

export default App;
