import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import { important, px } from 'utils/styles'

const useStyles = makeStyles({
  progressRoot: {
    width: important(px(20)),
    height: important(px(20)),
    color: ({ dark }) => (dark ? '#000' : '#fff')
  }
})

function CircularProgressWrapper({ isLoading, children, dark }) {
  const classes = useStyles({ dark })
  return (
    <Grid container justify="center" alignItems="center">
      {isLoading ? (
        <CircularProgress className={classes.progressRoot} />
      ) : (
        children
      )}
    </Grid>
  )
}

CircularProgressWrapper.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  dark: PropTypes.bool
}

CircularProgressWrapper.defaultProps = {
  dark: false
}

export default CircularProgressWrapper
