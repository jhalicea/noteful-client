import React from 'react'
import './CircleButton.css'
import PropTypes from 'prop-types'

export default function NavCircleButton(props) {
  const { tag, className, children, ...otherprops } = props

  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherprops
    },
    props.children
  )
}

NavCircleButton.defaultProps ={
  tag: function () {},
  className: '',
  children: '',
  otherprops: {}
}

NavCircleButton.propTypes = {
  tag: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func]),
  className: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
  otherprops: PropTypes.object.isRequired
};
