import React from 'react'
import PropTypes from 'prop-types'
import Div100vh from 'react-div-100vh'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import { createSelector } from 'reselect'
import { geolocationSelector } from 'modules/selectors/app'
import { vw } from 'utils/styles'
import { useSelector } from 'react-redux'
import { isFalsy } from '../../utils/common'
import { placeByIdSelector } from '../../modules/selectors/places'

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  root: {
    position: 'fixed',
    zIndex: 1,
    width: vw(100),
    background: palette.background.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 200,
    fontWeight: 500,
    [breakpoints.only('xs')]: {
      fontSize: vw(30)
    }
  }
}))

const getGeolocation = createSelector(
  geolocationSelector,
  ({ isFetching }) => ({ isGeolocationFetching: isFetching })
)

const getPlaceById = createSelector(placeByIdSelector, ({ isFetching }) => ({
  isPlaceByIdFetching: isFetching
}))

function LoadingOverlay({ independent }) {
  const classes = useStyles()
  const { isGeolocationFetching } = useSelector(getGeolocation)
  const { isPlaceByIdFetching } = useSelector(getPlaceById)

  if (isFalsy(independent, isGeolocationFetching, isPlaceByIdFetching)) {
    return null
  }

  return (
    <Div100vh className={classes.root}>
      <Typography className={classes.text}>
        <i className="icon-ServingDish" />
      </Typography>
    </Div100vh>
  )
}

LoadingOverlay.propTypes = {
  independent: PropTypes.bool
}

LoadingOverlay.defaultProps = {
  independent: false
}

export default LoadingOverlay
