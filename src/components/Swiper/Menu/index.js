import React from 'react';

import classnames from 'classnames';

import './index.css';

const Menu = ({ className, value, options, onChange }) => (
  <div className={`${className}-menu__list`}>
    {
      options.map((option, key) => {
        const active = value && (option.value === value.value);
        return (
          <div
            key={key}
            className={
              classnames(
                `${className}-menu__item`,
                { 'is-active': active }
              )
            }
            onClick={() => active ? {} : onChange(option)}
          >
            {option.label}
          </div>
        );
      })
    }
  </div>
);

export default Menu;
