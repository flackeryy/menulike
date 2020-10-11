import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { px } from 'utils/styles'

const useStyles = makeStyles({
  header: {
    height: 64,
    background: '#fff',
    padding: '0 5px'
  },
  headerTitle: {
    paddingBottom: 14,
    fontWeight: 500,
    fontSize: 17,
    lineHeight: px(20)
  }
})

function Header({ rightComponent, leftComponent, title }) {
  const classes = useStyles()
  return (
    <Grid container className={classes.header} alignItems="flex-end">
      <Grid item xs container justify="flex-start">
        {leftComponent}
      </Grid>
      <Grid item xs container justify="center">
        <Typography className={classes.headerTitle} align="center">
          {title}
        </Typography>
      </Grid>
      <Grid item xs container justify="flex-end">
        {rightComponent}
      </Grid>
    </Grid>
  )
}

Header.propTypes = {
  rightComponent: PropTypes.node,
  leftComponent: PropTypes.node,
  title: PropTypes.string
}

export default Header
