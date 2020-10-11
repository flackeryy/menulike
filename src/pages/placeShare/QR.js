import React from 'react'
import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { placeDataSelector } from 'modules/selectors/place'

const useStyles = makeStyles(() => ({
  buttonContainerQR: {
    borderRadius: 3,
    marginBottom: 5,
    padding: 10,
    background: '#000',
    maxWidth: 250,
    maxHeight: 250,
    display: 'block'
  },
  img: {
    width: '100%'
  },
  linkContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 18
  },
  linkTab: {
    fontSize: 12,
    lineHeight: '24px',
    marginBottom: 0,
    marginLeft: 5,
    color: '#000',
    textTransform: 'none'
  },
  linkDownloadText: {
    fontSize: 12,
    lineHeight: '24px',
    marginBottom: 15,
    marginLeft: 5,
    color: '#787878',
    cursor: 'pointer'
  }
}))

const getPlaceData = createSelector(
  placeDataSelector,
  ({ public_url, qr_code_url }) => ({
    publicUrl: public_url,
    QrCodeUrl: qr_code_url
  })
)

function QR() {
  const { t } = useTranslation(['place_share_page', 'buttons'])
  const classes = useStyles()
  const { publicUrl, QrCodeUrl } = useSelector(getPlaceData)

  return (
    <Grid container direction="column" alignItems="center">
      <Typography className={classes.linkContainer}>
        <i className="icon-OpenLink" />
        <Link target="_blank" href={publicUrl} className={classes.linkTab}>
          {t('buttons:open_menu_new_tab')}
        </Link>
      </Typography>

      <Link href={QrCodeUrl} className={classes.buttonContainerQR} download>
        <img className={classes.img} src={QrCodeUrl} alt="place_qr" />
      </Link>

      <Link href={QrCodeUrl} download>
        <Typography className={classes.linkDownloadText}>
          {t('place_share_page:download')}
        </Typography>
      </Link>
    </Grid>
  )
}

export default QR
