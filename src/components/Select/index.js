import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';

const Select = ({ options, value, onChange }) => (
  <ReactSelect
    options={options}
    value={value}
    onChange={onChange}
  />
);

export default Select;