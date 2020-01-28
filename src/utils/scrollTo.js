import raf from 'raf'

function easeOutQuad(t, b, c, d) {
  const ts = (t /= d) * t
  const tc = ts * t
  return b + c * (-1 * ts * ts + 4 * tc + -6 * ts + 4 * t)
}

export default function scrollTo(to, duration, element = window) {
  if (typeof to === 'number') {
    to = { y: to }
  }

  to = { x: 0, y: 0, ...to }

  return new Promise(resolve => {
    const startX =
      element !== window && element.scrollbars
        ? element.scrollbars.getScrollLeft()
        : element === window
        ? window.pageXOffset
        : element.scrollLeft
    const startY =
      element !== window && element.scrollbars
        ? element.scrollbars.getScrollTop()
        : element === window
        ? window.pageYOffset
        : element.scrollTop

    const changeX = to.x - startX
    const changeY = to.y - startY

    const endTime = new Date().getTime() + duration

    raf(function animateScroll() {
      const currentTime = new Date().getTime()
      const progress = Math.min(duration, duration - (endTime - currentTime))
      const valueX = easeOutQuad(progress, startX, changeX, duration)
      const valueY = easeOutQuad(progress, startY, changeY, duration)

      if (element === window) {
        element.scrollTo(valueX, valueY)
      } else if (element.scrollbars) {
        element.scrollbars.scrollLeft(valueX)
        element.scrollbars.scrollTop(valueY)
      } else {
        element.scrollLeft = valueX
        element.scrollTop = valueY
      }

      if (currentTime < endTime) {
        raf(animateScroll)
      } else {
        raf(resolve)
      }
    })
  })
}