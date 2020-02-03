import React, { useState, useEffect } from 'react';

import './index.css';

const Select = ({ options, value, onChange }) => (
  <select
    options={options}
    value={value}
    onChange={onChange}
  />
);

export default Select;