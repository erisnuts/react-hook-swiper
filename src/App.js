import React, { Component} from 'react';
import { hot } from 'react-hot-loader';

import Swiper from './Swiper';

class App extends Component{
  render(){
    return(
      <div className='App'>
        <h1> Hello, World! </h1>
        <Swiper>
          <div>hfp</div>
          <div>fvbf</div>
          <div>vdf</div>
        </Swiper>
      </div>
    );
  }
}

export default hot(module)(App);
