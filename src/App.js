import React, { Component} from 'react';
import { hot } from 'react-hot-loader';

import Swiper from './components/Swiper';

import './App.css';

const options = [
  { value: 0, label: '01 октября - 31 октября' },
  { value: 1, label: '01 ноября - 29 декабря' },
  { value: 2, label: '08 января - 30 апреля' },
  { value: 3, label: '01 мая - 31 мая' },
  { value: 4, label: '01 июня - 30 сентября' }
];

const App = () => (
  <div className='App'>
    <Swiper
      options={options}
      withoutDisabledButtons
    />
  </div>
);

export default hot(module)(App);
