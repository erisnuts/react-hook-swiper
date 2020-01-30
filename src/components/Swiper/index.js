import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import scrollTo from '../../utils/scrollTo'
import getScrollbarWidth from '../../utils/getScrollbarWidth'

import './index.css'

const Swiper = (props) => {
  const {
    children,
    className,
    classNameButton,
    classNameButtonLeft,
    classNameButtonRight,
    classNameContent,
    withoutDisabledButtons
  } = props;

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

    const newScrollLeft = scrollLeft + direction * clientWidth * 0.5;
    scrollTo({ x: newScrollLeft }, 500, ref.current);

    setClicked(true);
  }

  const _handleMouseLeave = () => {
    setTimeout(() => {
      setClicked(false);
    }, 200)
  }

  useEffect(() => {
    _handleScroll();
  });

  return (
    <div
      className={classnames(className, 'horizontal-scroll', {
        'is-left-hidden': !onLeft,
        'is-right-hidden': !onRight
      })}
      onMouseLeave={_handleMouseLeave}>
      <Button
        className={classnames(classNameButton, classNameButtonLeft, 'horizontal-scroll__left', {
          'is-button-disabled': !withoutDisabledButtons && clicked && onLeft
        })}
        onClick={() => _handleSlide(-1)}
      />
      <Content
        ref={ref}
        className={classNameContent}
        children={children}
        onScroll={_handleScroll}
      />
      <Button
        className={classnames(classNameButton, classNameButtonRight, 'horizontal-scroll__right', {
          'is-button-disabled': !withoutDisabledButtons && clicked && onRight
        })}
        onClick={() => _handleSlide(1)}
      />
    </div>
  );
}

const Content = React.forwardRef(({ className, children, onScroll }, ref) => {
  const scrollbarWidth = getScrollbarWidth();

  return (
    <div
      ref={ref}
      className={classnames(className, 'horizontal-scroll__content')}
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