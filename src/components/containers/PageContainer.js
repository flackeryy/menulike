import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(({ palette }) => ({
  root: {
    backgroundColor: palette.background.primary,
    flex: 1,
    overflow: 'auto'
  }
}))

function PageContainer({ children }) {
  const classes = useStyles()
  return (
    <Grid container className={classes.root} direction="column">
      {children}
    </Grid>
  )
}

PageContainer.propTypes = {
  children: PropTypes.node
}

export default PageContainer
