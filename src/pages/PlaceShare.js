import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { useTranslation } from 'react-i18next'
import makeStyles from '@material-ui/core/styles/makeStyles'

import PlacePageContainer from 'components/containers/PlacePageContainer'
import BackButton from 'components/buttons/BackButton'
import Buttons from './placeShare/Buttons'
import QR from './placeShare/QR'
import { placeDataSelector } from 'modules/selectors/place'

const useStyles = makeStyles(({ shape }) => ({
  container: {
    padding: '25px 50px 35px 50px',
    ...shape.container
  }
}))

const getPlaceName = createSelector(placeDataSelector, ({ name }) => ({ name }))

function PlaceShare() {
  const { t } = useTranslation(['place_share_page', 'alerts'])
  const classes = useStyles()
  const { name } = useSelector(getPlaceName)

  return (
    <PlacePageContainer
      title={t('place_share_page:heading', { name })}
      headerLeftComponent={<BackButton relative to="/places/menu" />}
      footerActiveRight
    >
      <div className={classes.container}>
        <QR />
        <Buttons />
      </div>
    </PlacePageContainer>
  )
}
export default PlaceShare
