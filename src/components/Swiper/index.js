import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Select from '../Select';
import Menu from '../Menu';

import scrollTo from '../../utils/scrollTo'
import getScrollbarWidth from '../../utils/getScrollbarWidth'

import './index.css'

const TABLET_BREAKPOINT = 768;
const getIsMobile = () =>
  window
    ? (window.innerWidth < TABLET_BREAKPOINT)
    : false;

const Swiper = (props) => {
  const {
    options,
    className,
    classNameButton,
    classNameButtonLeft,
    classNameButtonRight,
    classNameContent,
    withoutDisabledButtons
  } = props;

  const [value, setValue] = useState(options[0]);
  const [isMobile, setIsMobile] = useState(getIsMobile());
  const [onLeft, setOnLeft] = useState(true);
  const [onRight, setOnRight] = useState(true);
  const [clicked, setClicked] = useState(false);

  const ref = React.createRef();

  const _handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;

    if (scrollLeft <= 0 && !onLeft) {
      setOnLeft(true);
    }
    if (scrollLeft > 0 && onLeft) {
      setOnLeft(false);
    }

    if (scrollLeft >= scrollWidth - clientWidth - 1 && !onRight) {
      setOnRight(true);
    }
    if (scrollLeft < scrollWidth - clientWidth - 1 && onRight) {
      setOnRight(false);
    }
  }

  const _handleSlide = (direction) => {
    const { scrollLeft, clientWidth } = ref.current;

    const newScrollLeft = isMobile
      ? scrollLeft + direction * clientWidth
      : scrollLeft + direction * clientWidth * (1/options.length);
    scrollTo({ x: newScrollLeft }, 500, ref.current);

    setClicked(true);
  }

  const _handleChange = (direction) => {
    const index = options.indexOf(value) + direction;

    if(index < 0) {
      setValue(options[options.length-1]);
      _handleSlide(options.length-1);
      return;
    }

    if(0 <= index && index < options.length) {
      setValue(options[index]);
      _handleSlide(direction);
      return;
    }

    if(index >= options.length) {
      setValue(options[0]);
      _handleSlide(-options.length-1);
      return;
    }
  }

  const _handleMouseLeave = () => {
    setTimeout(() => {
      setClicked(false);
    }, 200)
  }

  useEffect(() => {
    window.addEventListener('resize', _handleScroll);
    _handleScroll();

    const handleStatusChange = () =>
      setIsMobile(getIsMobile());

    window.addEventListener('resize', handleStatusChange);
    return () => {
      window.removeEventListener('resize', handleStatusChange);
      window.removeEventListener('resize', _handleScroll);
    };
  });

  return (
    <div className='swiper-container'>
      <Dropdown
        value={value}
        options={options}
        onChange={setValue}
      />
      <div
        className={classnames(className, 'swiper', {
          'is-left-hidden': !onLeft,
          'is-right-hidden': !onRight
        })}
        onMouseLeave={_handleMouseLeave}>
        <Button
          className={classnames(classNameButton, classNameButtonLeft, 'swiper__left', {
            'is-button-disabled': !withoutDisabledButtons && clicked && onLeft
          })}
          onClick={() => _handleChange(-1)}
        />
        <Content
          ref={ref}
          className={classNameContent}
          onScroll={_handleScroll}
        >
          <Menu
            className='swiper'
            value={value}
            options={options}
            onChange={setValue}
          />
        </Content>
        <Button
          className={classnames(classNameButton, classNameButtonRight, 'swiper__right', {
            'is-button-disabled': !withoutDisabledButtons && clicked && onRight
          })}
          onClick={() => _handleChange(1)}
        />
      </div>
    </div>
  );
}

const Dropdown = ({ value, options, onChange }) => {
  return (
    <div className='dropdown'>
      <Menu
        className='dropdown'
        value={value}
        options={options.filter(option => option.value !== value.value)}
        onChange={onChange}
      />
    </div>
  );
}

const Content = React.forwardRef(({ className, children, onScroll }, ref) => {
  const scrollbarWidth = getScrollbarWidth();

  return (
    <div
      ref={ref}
      className={classnames(className, 'swiper__content')}
      style={scrollbarWidth === 0 ? { marginBottom: -40, paddingBottom: 40 } : { marginBottom: -scrollbarWidth }}
      onScroll={onScroll}>
      {children}
    </div>
  );
})

const Button = ({ className, onClick }) => (
  <div
    className={className}
    onClick={onClick}
  />
);


export default Swiper;
