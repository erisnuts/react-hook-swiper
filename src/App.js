import React, { Component} from 'react';
import { hot } from 'react-hot-loader';

import ScrollableSelect from './components/ScrollableSelect';

const options = [
  { value: 1, label: '01 октября - 31 октября' },
  { value: 2, label: '01 ноября - 29 декабря' },
  { value: 3, label: '08 января - 30 апреля' },
  { value: 4, label: '01 мая - 31 мая' },
  { value: 5, label: '01 июня - 30 сентября' },
  { value: 6, label: '01 октября - 31 октября' },
  { value: 7, label: '01 ноября - 29 декабря' },
];

const App = () => (
  <div className='App'>
    <ScrollableSelect options={options} />
  </div>
);

export default hot(module)(App);
