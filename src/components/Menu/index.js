import React from 'react';

import classnames from 'classnames';

import './index.css';

const Menu = ({ value, options, onChange }) => (
  <div className="swiper-menu__list">
    {
      options.map((option, key) => (
        <div
          key={key}
          className={
            classnames(
              'swiper-menu__item',
              { 'is-active': value && (option.value === value.value) }
            )
          }
          onClick={() => onChange(option)}
        >
          {option.label}
        </div>
      ))
    }
  </div>
);

export default Menu;
