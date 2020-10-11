import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import IconButton from 'components/buttons/IconButton'

const useStyles = makeStyles({
  footer: {
    height: 49,
    background: '#fff'
  },
  addButton: {
    width: 48,
    height: 48,
    background: '#000',
    color: '#fff',
    position: 'relative',
    top: -10,
    '&:hover': {
      background: '#000'
    }
  },
  addButtonIcon: {
    fontSize: 16
  }
})

function Footer({ activeLeft, activeRight }) {
  const classes = useStyles()
  return (
    <Grid container className={classes.footer} alignItems="center">
      <Grid item xs container justify="center">
        <IconButton component={Link} to="/place/menu">
          {activeLeft ? (
            <i className="icon-ClocheFill" />
          ) : (
            <i className="icon-Cloche" />
          )}
        </IconButton>
      </Grid>
      <Grid item xs container justify="center">
        <IconButton className={classes.addButton}>
          <i className={classNames('icon-Plus', classes.addButtonIcon)} />
        </IconButton>
      </Grid>
      <Grid item xs container justify="center">
        <IconButton component={Link} to="/place/edit">
          {activeRight ? (
            <i className="icon-StoreFill" />
          ) : (
            <i className="icon-Store" />
          )}
        </IconButton>
      </Grid>
    </Grid>
  )
}

Footer.propTypes = {
  activeLeft: PropTypes.bool,
  activeRight: PropTypes.bool
}

export default memo(Footer)
