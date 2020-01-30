import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import scrollTo from '../../utils/scrollTo'
import getScrollbarWidth from '../../utils/getScrollbarWidth'

import './index.css'

export default class Swiper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onLeft: true,
      onRight: true,
      clicked: false
    }

    this._renderLeftRightButton = this._renderLeftRightButton.bind(this);
    this._handleScroll = this._handleScroll.bind(this);
    this._renderContent = this._renderContent.bind(this);
    this._handleScroll = this._handleScroll.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this._handleSlide = this._handleSlide.bind(this);
  }

  componentDidMount() {
    this._handleScroll()
  }

  _renderLeftRightButton (direction) {
    const {
      classNameButton,
      classNameButtonRight,
      classNameButtonLeft,
      withoutDisabledButtons,
      showIcon = true
    } = this.props
    const classNameDirection = direction === 'left' ? classNameButtonLeft : classNameButtonRight
    const classNameDirectionDefault = direction === 'left' ? 'horizontal-scroll__left' : 'horizontal-scroll__right'
    const onLeftRight = direction === 'left' ? this.state.onLeft : this.state.onRight
    const onClick = () => (direction === 'left' ? this._handleSlide(-1) : this._handleSlide(1))

    return (
      <div
        className={classnames(classNameButton, classNameDirection, classNameDirectionDefault, {
          'is-button-disabled': !withoutDisabledButtons && this.state.clicked && onLeftRight
        })}
        onClick={onClick} />
    )
  }

  _renderContent () {
    const scrollbarWidth = getScrollbarWidth()

    return (
      <div
        ref="horizontalScroll"
        className={classnames(this.props.classNameContent, 'horizontal-scroll__content')}
        style={scrollbarWidth === 0 ? { marginBottom: -40, paddingBottom: 40 } : { marginBottom: -scrollbarWidth }}
        onScroll={this._handleScroll}>
        {this.props.children}
      </div>
    )
  }

  _handleScroll () {
    const { scrollLeft, scrollWidth, clientWidth } = this.refs.horizontalScroll

    if (scrollLeft <= 0 && !this.state.onLeft) {
      this.setState({ onLeft: true })
    }
    if (scrollLeft > 0 && this.state.onLeft) {
      this.setState({ onLeft: false })
    }

    if (scrollLeft >= scrollWidth - clientWidth - 1 && !this.state.onRight) {
      this.setState({ onRight: true })
    }
    if (scrollLeft < scrollWidth - clientWidth - 1 && this.state.onRight) {
      this.setState({ onRight: false })
    }
  }

  _handleMouseLeave () {
    setTimeout(() => {
      this.setState({ clicked: false })
    }, 200)
  }

  _handleSlide (direction) {
    const { scrollLeft, clientWidth } = this.refs.horizontalScroll

    const newScrollLeft = scrollLeft + direction * clientWidth * 0.5
    scrollTo({ x: newScrollLeft }, 500, this.refs.horizontalScroll)

    this.setState({ clicked: true })
  }

  render() {
    return (
      <div
        className={classnames(this.props.className, 'horizontal-scroll', {
          'is-left-hidden': !this.state.onLeft,
          'is-right-hidden': !this.state.onRight
        })}
        onMouseLeave={this._handleMouseLeave}>
        {this._renderLeftRightButton('left')}
        {this._renderContent()}
        {this._renderLeftRightButton('right')}
      </div>
    )
  }
}