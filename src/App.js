import React, { Component} from 'react';
import { hot } from 'react-hot-loader';

import Swiper from './components/Swiper';
import Menu from './components/Menu';

const App = () => (
  <div className='App'>
    <div className='caterer-menu'>
      <Swiper>
        <Menu />
      </Swiper>
    </div>
  </div>
);

export default hot(module)(App);
