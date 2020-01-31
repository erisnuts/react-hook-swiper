import React, { useState, useEffect } from 'react';

import Select from '../Select';
import Swiper from '../Swiper';
import Menu from '../Menu';

import './index.css';

const TABLET_BREAKPOINT = 768;
const getIsMobile = () =>
  window
    ? (window.innerWidth < TABLET_BREAKPOINT)
    : false;

const ScrollableSelect = ({ options }) => {
  const [value, setValue] = useState(options[0]);
  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    const handleStatusChange = () =>
      setIsMobile(getIsMobile());

    window.addEventListener('resize', handleStatusChange);
    return () => {
      window.removeEventListener('resize', handleStatusChange);
    };
  });

  return (
    <div className='swiper-container'>
      {
        isMobile
          ? <Select
              value={value}
              options={options}
              onChange={setValue}
            />
          : <Swiper
              value={value}
              options={options}
              onChange={setValue}
              withoutDisabledButtons={true}
            >
              <Menu
                value={value}
                options={options}
                onChange={setValue}
              />
            </Swiper>
      }
    </div>
  )
}

export default ScrollableSelect;
