import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PlacePageContainer from 'components/containers/PlacePageContainer'
import IconButton from 'components/buttons/IconButton'
import Placeholder from './placeMenu/Placeholder'

function PlaceMenu() {
  const { t } = useTranslation('place_menu_page')
  return (
    <PlacePageContainer
      title={t('place_menu_page:title')}
      footerActiveLeft
      headerLeftComponent={
        <IconButton>
          <i className="icon-Pencil" />
        </IconButton>
      }
      headerRightComponent={
        <IconButton component={Link} to="/place/share">
          <i className="icon-Share" />
        </IconButton>
      }
    >
      <Placeholder />
    </PlacePageContainer>
  )
}

export default PlaceMenu
