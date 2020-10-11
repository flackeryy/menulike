import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    margin: '0 auto'
  }
})

function Form({ onSubmit, children }) {
  const classes = useStyles()
  return (
    <form onSubmit={onSubmit} className={classes.root}>
      {children}
    </form>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.node
}

Form.defaultProps = {
  onSubmit: (f) => f
}

export default Form
