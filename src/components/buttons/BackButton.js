import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'
import classNames from 'classnames'

import IconButton from './IconButton'

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 7,
    left: 15,
    fontSize: 33,
    width: 48,
    height: 48
  },
  rootRelative: {
    position: 'relative',
    top: 'auto',
    left: 'auto'
  }
})

function BackButton({ to, relative }) {
  const classes = useStyles()
  return (
    <IconButton
      component={Link}
      to={to}
      className={classNames(classes.root, {
        [classes.rootRelative]: relative
      })}
    >
      <i className="icon-ArrowLeft" />
    </IconButton>
  )
}

BackButton.propTypes = {
  to: PropTypes.string.isRequired,
  relative: PropTypes.bool
}

BackButton.defaultProps = {
  relative: false
}

export default BackButton
