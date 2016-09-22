import React, {PropTypes} from 'react'
import './03-styling.css'

export default Box

function Box(props) {
  return (
    <div className={`Box Box--${props.size}`} style={props.style}>
      {props.children}
    </div>
  )
}

Box.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
}

export const example = () => (
  <div>
    <Box
      size="small"
      style={{backgroundColor: 'lightblue'}}
    >
      I'm in a small box!
    </Box>
    <Box
      size="medium"
      style={{backgroundColor: 'lightgreen'}}
    >
      I'm in a medium box!
    </Box>
    <Box
      size="large"
      style={{backgroundColor: 'orange'}}
    >
      I'm in a large box!
    </Box>
  </div>
)
